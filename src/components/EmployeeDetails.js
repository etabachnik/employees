import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getPersonFromLocalStorageById, getEmployeesFromLocalStorageByManagerId} from './utils';
import styled from 'styled-components';
import TaskPopup from './TaskPopup';
import ReportPopup from './ReportPopup';
import {ReportTypes} from './constants';


const Wrapper = styled.div`
    border: 2px solid black;
    margin: auto;
    width: 800px;
    padding: 20px;
    margin-top: 40px;
 `
 const EmployeeDiv = styled.div`
    display:flex;
 `

 const PictureDiv = styled.div`
    width: 100px;
    height: 100px;
 `

 const DetailsDiv = styled.div`

 `
 const NameContainer = styled.div`
    margin-left: 50px;
    font-size: 20px;
    font-weight: 600;
    width: 200px;
    margin-bottom:30px;
 `
 const Line = styled.div`
    height: 2px;
    background-color: lightgrey;
    margin-left: 50px;
    margin-bottom: 30px;
 `;
  
 const Button=styled.button`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    width: 100px;
    background-color: blue;
    color:black;
    height: 40px;
`

 const TasksContainer=styled.div`
    border: 2px solid black;
    height: 200px;
    overflow-y: auto;
    margin-bottom: 30px;
 `
 const RecordDiv=styled.div`
    display:flex;
    margin-top: 10px;
    padding: 20px;
 `
 const TextContainer = styled(NameContainer)`
    width:400px;
    font-size: 18px;
 `
 
 const DateContainer = styled(NameContainer)`
    width:100px;
    font-size: 18px;
 `
 const EmployeeNameContainer = styled(NameContainer)`
    font-size: 18px;
`
const ButtonAssign= styled(Button)`
    font-size: 18px;
    width: 120px;
    height: 30px;
`;
 

const EmployeeDetails = () => {
    const[currentPerson, setCurrentPerson]= useState();
    const[currentManager, setCurrentManager]= useState();
    const[employees, setEmployees]= useState([]);
    const[showTaskDialog, setShowTaskDialog]= useState();
    const[showReportDialog, setShowReportDialog]= useState();
    const[taskEmployeerId, setTaskEmployeerId]= useState();
    const [imageSrc, setImageSrc] = useState('');

    const {id} = useParams();
    const navigate = useNavigate();
   
    useEffect(()=>{
        try
        {
            const res= getPersonFromLocalStorageById(id);
            setCurrentPerson(res);
            if(res.managerId===null){
                const emp= getEmployeesFromLocalStorageByManagerId(res.id);
                setEmployees(emp);
            }
            else{
                const data= getPersonFromLocalStorageById(res.managerId);
                setCurrentManager(data);
            }
        }
        catch(error){
            navigate('/');
        }
     },[id])

    

     useEffect(() => {
       import(`../assets/${currentPerson?.picture}`)
         .then((image) => {
           setImageSrc(image.default);
         })
         .catch((error) => {
           // Handle any import errors
           console.error(error);
         });
     }, [currentPerson?.picture]);

     const openTaskDialog=(id)=>{
        setTaskEmployeerId(id)
        setShowTaskDialog(true);
     }

     const closeDialog=()=>{
        setShowTaskDialog(false);
        setShowReportDialog(false);
     }

     const openReportDialog=(id)=>{
        setShowReportDialog(true);
     }

  
     

     const convertDate = (date) =>{
        const dateObj = new Date(date);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
     }

     const getEmployeeName = (id)=>{
        const res= getPersonFromLocalStorageById(id);
        return `${res?.firstName}  ${res?.lastName}`
     }

    return (
     <Wrapper>
       <EmployeeDiv>
      
        <PictureDiv>
            <img src={imageSrc} alt='' width='100px' height='100px'></img>
        </PictureDiv>
        <DetailsDiv>
         <RecordDiv><NameContainer>Name: </NameContainer> <NameContainer>{`${currentPerson?.firstName}  ${currentPerson?.lastName}`}</NameContainer></RecordDiv>
         <RecordDiv><NameContainer>Position: </NameContainer><NameContainer>{currentPerson?.position}</NameContainer></RecordDiv>
         <Line></Line>
         {currentPerson?.position==='Employee' && 
         ( <RecordDiv>
            <NameContainer>Manager</NameContainer>
            <NameContainer>{`${currentManager?.firstName}  ${currentManager?.lastName}`}</NameContainer>
            <Button onClick={(e)=>openReportDialog(currentPerson.id)}>Report</Button>
         </RecordDiv>)}
        </DetailsDiv>
       </EmployeeDiv>
       
       {currentPerson?.position==='Employee' &&<DetailsDiv>
       <NameContainer>My Tasks</NameContainer>
        <TasksContainer>
            {
                currentPerson?.tasks.map((task, index)=>{
                    return(
                        <RecordDiv key={index}>
                        <textarea cols="70" readOnly>{task.text}</textarea>
                        <DateContainer>{convertDate(task.date)}</DateContainer>
                        </RecordDiv>
                    )
                })
            }
        </TasksContainer>
       </DetailsDiv>}
       {currentPerson?.position==='Manager' && 
        <>
        <DetailsDiv>
        <NameContainer>My Subordinates</NameContainer>
        <TasksContainer>
            {
                employees?.map((item, index)=>{
                    return(
                        <RecordDiv key={index}>
                        <EmployeeNameContainer>{`${item?.firstName}  ${item?.lastName}`}</EmployeeNameContainer>
                        <EmployeeNameContainer>{item.position}</EmployeeNameContainer>
                        <ButtonAssign onClick={(e)=>openTaskDialog(item.id)}>Assign Task</ButtonAssign>
                        </RecordDiv>
                    )
                })
            }
        </TasksContainer>
       </DetailsDiv>
       <DetailsDiv>
        <NameContainer>My Reports</NameContainer>
        <TasksContainer>
            {
                currentPerson?.reports.map((item, index)=>{
                    return(
                        <RecordDiv key={index}>
                        <EmployeeNameContainer>{getEmployeeName(item.from)}</EmployeeNameContainer>
                        <textarea cols="50" readOnly>{item.text}</textarea>
                        <EmployeeNameContainer>{ReportTypes[item.type]}</EmployeeNameContainer>
                        <EmployeeNameContainer>{convertDate(item.date)}</EmployeeNameContainer>
                        </RecordDiv>
                    )
                })
            }
        </TasksContainer>
       </DetailsDiv>
       </>
       }
       {showTaskDialog && <TaskPopup closeDialog={closeDialog} employeerId={taskEmployeerId}></TaskPopup>}
       {showReportDialog && <ReportPopup closeDialog={closeDialog} employeerId={currentPerson.id} currentManager={currentManager}></ReportPopup>}
    </Wrapper>)
    }
    
    export default EmployeeDetails;
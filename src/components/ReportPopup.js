
import { useEffect, useState } from 'react';
import {getPersonFromLocalStorageById, setReportToManger} from './utils';
import styled from 'styled-components';
import {ReportTypes} from './constants';


const DialogContainer =styled.div`
  position: absolute;
  left: 300px;
  top: 150px;
  width: 600px;
  height: 330px;
  background-color: white;
  box-shadow: rgba(112, 110, 110, 0.93) 4px 9px 5px 0px;
  border: 1px solid rgb(161, 150, 150);
  display: flex;
  flex-direction: column;
  padding: 30px;
}
   `
const FieldWrapper=styled.div`
  display: flex;
  padding-bottom: 30px;
`;

const NameContainer=styled.div`
  width: 150px;
  font-size: 20px;
  font-weight: 500;
`;

const ButtonsWrapper=styled.div`
  display: flex;
  margin: auto;
  margin-right: 10px;
  height: 25%;
  width: 45%;
  justify-content: space-around;
`;

const Button=styled.button`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 100px;
  color:black;
  height: 40px;
  background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
  color: ${(props) => (props.disabled ? 'lightgray' : 'black')};
  `
 
const ReportPopup = ({closeDialog, employeerId, currentManager}) => {
  const [selectedReport, setSelectedReport] = useState(0);
  const [text, setText] = useState();
  const [currentEmployee, setCurrentEmployee]= useState();

  useEffect(()=>{
    const res= getPersonFromLocalStorageById(employeerId);
    setCurrentEmployee(res);
    
 },[])

  const handleCancel = () => {
    closeDialog();
  };

  const handleSave = () => {
     const reportObject={from: employeerId, text: text, type: selectedReport, date: new Date()};
     setReportToManger(currentManager.id,reportObject);
     closeDialog();
  };

  const isDisabled = selectedReport===0 || !text;

  return (
    <DialogContainer>
     <FieldWrapper>
     <NameContainer>Employee: </NameContainer>
     <NameContainer>{`${currentEmployee?.firstName}  ${currentEmployee?.lastName}`}</NameContainer>
     </FieldWrapper>
     <FieldWrapper>
     <NameContainer>To Manager: </NameContainer>
     <NameContainer>{`${currentManager?.firstName}  ${currentManager?.lastName}`}</NameContainer>
     </FieldWrapper>
      <FieldWrapper>
        <NameContainer>Report Text</NameContainer>
        <NameContainer><textarea  rows="4" cols="50" onChange={(e)=>setText(e.target.value)}></textarea></NameContainer>
      </FieldWrapper>
      <FieldWrapper>
      <NameContainer>Report Type</NameContainer>
       <NameContainer>
        <select value={selectedReport} onChange={(e)=> setSelectedReport(e.target.value)}>
          <option value="">Select report type</option>
          {
            Object.keys(ReportTypes).map((key, index)=>
              <option value={key} key={index}>{ReportTypes[key]}</option>
            )
          }
        </select> 
       </NameContainer>
     </FieldWrapper>
     <ButtonsWrapper>
        <Button disabled={isDisabled} onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
     </ButtonsWrapper>
    </DialogContainer>
  );
};

export default ReportPopup;
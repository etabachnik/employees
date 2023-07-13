import { useEffect, useState } from 'react';
import {getPersonFromLocalStorageById, setTaskToEmployee} from './utils';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DialogContainer =styled.div`
    position: absolute;
    left: 300px;
    top: 150px;
    width: 500px;
    height: 250px;
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
    width: 100px;
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
    background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
    color: ${(props) => (props.disabled ? 'lightgray' : 'black')};
    color:black;
    height: 40px;
`
 
const TaskPopup = ({closeDialog, employeerId}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [task, setTask] = useState();
  const[currentEmployee, setCurrentEmployee]= useState();

  const isDisabled = !task || task==='';

  useEffect(()=>{
    const res= getPersonFromLocalStorageById(employeerId);
    setCurrentEmployee(res);
 },[])

  const handleCancel = () => {
    closeDialog();
  };

  const handleSave = () => {
    const taskObject={text: task, date: startDate};
    setTaskToEmployee(employeerId,taskObject);
    closeDialog();
  };

  return (
    <DialogContainer>
     <FieldWrapper>
     <NameContainer>Employee: </NameContainer>
     <NameContainer>{`${currentEmployee?.firstName}  ${currentEmployee?.lastName}`}</NameContainer>
     </FieldWrapper>
      <FieldWrapper>
        <NameContainer>Task</NameContainer>
        <NameContainer><textarea  rows="4" cols="50" onChange={(e)=>setTask(e.target.value)}></textarea></NameContainer>
      </FieldWrapper>
      <FieldWrapper>
      <NameContainer>Due Date</NameContainer>
       <NameContainer> <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></NameContainer>
     </FieldWrapper>
     <ButtonsWrapper>
        <Button disabled={isDisabled} onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
     </ButtonsWrapper>
    </DialogContainer>
  );
};

export default TaskPopup;
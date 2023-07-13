
import { useEffect, useState } from 'react';
import {getPersonsFromLocalStorage} from './utils';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    border: 2px solid black;
    margin: auto;
    width: 800px;
    padding: 20px;
    margin-top: 40px;
`
const WrappedDetail = styled.div`
    display: flex;
    width: 600px;
    margin-bottom: 30px;
`



const TextBoxTitle =styled.div`
    margin: auto;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
`
const TextBoxName =styled(TextBoxTitle)`
    text-align: left;
    margin-left: 50px;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
`
const Button=styled.button`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    width: 100px;
    background-color: blue;
    color:black;
`

const EmployeeList = () => {
const[persons, setPersons]= useState([]);
    useEffect(()=>{
       const res= getPersonsFromLocalStorage();
       setPersons(res);
    },[])
  

return (
 <Wrapper>
  <TextBoxTitle>Employee List</TextBoxTitle>
  {
    persons.map((person,index)=>{
        return (
            <WrappedDetail key= {index}>
             <TextBoxName>{`${person.firstName} ${person.lastName}`}</TextBoxName>
             <TextBoxName>{person.position}</TextBoxName>
             <Link to={`/employee/${person.id}`}>
                <Button>View</Button>
            </Link>
            </WrappedDetail>
        )
    })
  }

</Wrapper>)
}

export default EmployeeList;
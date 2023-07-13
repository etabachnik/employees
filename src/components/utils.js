
import { persons } from "./constants"

export const addPersonsToLocalStorage = () => {
    const res= localStorage.getItem("persons");
    if(!res || res==='null'){
        const data = JSON.stringify(persons)
        localStorage.setItem("persons", data);
    }

}

export const getPersonsFromLocalStorage=()=>{
    const persons= localStorage.getItem("persons");
    const res = JSON.parse(persons)
    return res;
}

export const getPersonFromLocalStorageById=(id)=>{
    const persons= localStorage.getItem("persons");
    const res = JSON.parse(persons)
    const person = res.find(el=>el.id===Number(id));
    return person;
}

export const getEmployeesFromLocalStorageByManagerId=(id)=>{
    const persons= localStorage.getItem("persons");
    const res = JSON.parse(persons)
    const data = res.filter(el=>el.managerId===Number(id));
    return data;
}

export const setTaskToEmployee = (employeerId,taskObject)=>{
    const persons= localStorage.getItem("persons");
    const res = JSON.parse(persons)
    const person = res.find(el=>el.id===Number(employeerId));
    person.tasks.push(taskObject);
    const data = JSON.stringify(res)
    localStorage.setItem("persons", data);
}

export const setReportToManger = (employeerId,reportObject)=> {
    const persons= localStorage.getItem("persons");
    const res = JSON.parse(persons)
    const person = res.find(el=>el.id===Number(employeerId));
    person.reports.push(reportObject);
    const data = JSON.stringify(res)
    localStorage.setItem("persons", data);
}

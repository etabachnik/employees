
import { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {addPersonsToLocalStorage} from './components/utils';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';



function App() {

  useEffect(()=>{
    addPersonsToLocalStorage();
  },[])


  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="*" element={<EmployeeList />} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import Department from '../pages/Department';
import Leave from '../pages/Leave';
import Employee from '../pages/Employee';
import Ticket from '../pages/Ticket';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Login></Login>}></Route>
                    <Route path='/Department' element={<Department></Department>}></Route>
                    <Route path='/Leave' element={<Leave></Leave>}></Route>
                    <Route path='/Employee' element={<Employee></Employee>}></Route>
                    <Route path='/Ticket' element={<Ticket></Ticket>}></Route>
                    <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
};

export default AppRoutes;
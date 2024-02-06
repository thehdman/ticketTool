import React, { useEffect, useState } from 'react';
import '../assets/dashboard.css'
import { getEmpDashData, getDeptHeadDashData, getAdminEmpDashData, getSuperAdminDashData } from "../services/Api"

const Dashboard = () => {

    const isLoggedIn = localStorage.getItem('loginObj');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;

    let [dashData, setDashData] = useState([]);

    useEffect(() => {
        if (EmpRole === 'Employee') {
            getAllEmpDashData();
        }
        else if (EmpRole === 'Department Head') {
            getAllDeptHeadDashData();
        }
        else if (EmpRole === 'Admin Department Employee') {
            getAllAdminEmpDashData();
        }
        else {
            getAllSuperAdminDashData();
        }
    }, []);

    const getAllEmpDashData = () => {
        getEmpDashData(id).then((data) => {
            setDashData(data.data)
        })
    }

    const getAllDeptHeadDashData = () => {
        getDeptHeadDashData(id).then((data) => {
            setDashData(data.data)
        })
    }

    const getAllAdminEmpDashData = () => {
        getAdminEmpDashData(id).then((data) => {
            setDashData(data.data)
        })
    }

    const getAllSuperAdminDashData = () => {
        getSuperAdminDashData().then((data) => {
            setDashData(data.data)
        })
    }

    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-12'>
                    <strong className='fs-3 text-primary'>{userInfo.role}</strong>
                    <br></br>
                        <strong className='fs-3'>Welcome To Dashboard</strong>
                    </div>
                    <div className='col-12 mt-4'>
                        <div className="row">
                            <div className="boxes col-12">
                                {
                                    EmpRole === 'Employee' &&  <div className='row'>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card totalTickets-card p-3 border-0">
                                            <div className='row d-flex'>
                                                <div className='col-6'>
                                                    <h5 className="fw-normal text-white">Total Tickets</h5>
                                                    <h2 className="text-white">{dashData.totalTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-server fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card un-Assigned-card p-3 border-0">
                                            <div className='d-flex row'>
                                                <div className='col-6'>
                                                    <h5 className="fw-normal text-white">Un-Assigned</h5>
                                                    <h2 className="text-white">{dashData.totalUnAssignedTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-line-chart fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card assigned-card p-3 border-0">
                                            <div className='d-flex row'>
                                                <div className='col-6'>
                                                    <h5 className="text-white fw-normal">Assigned</h5>
                                                    <h2 className="text-white">{dashData.totalAssignedTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-envelope fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card in-Progress-card p-3  border-0">
                                            <div className='d-flex row'>
                                                <div className='col-6'>
                                                    <h5 className="text-white fw-normal">In-Progress</h5>
                                                    <h2 className="text-white">{dashData.totalInProgressTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-globe fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card closed-card p-3 border-0">
                                            <div className='row d-flex'>
                                                <div className='col-6'>
                                                    <h5 className="text-white fw-normal">Closed</h5>
                                                    <h2 className="text-white">{dashData.totalClosedTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-times fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                                {
                                    EmpRole === 'Department Head' && <div className="row">
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card totalEmp-card p-3 border-0">
                                                <div className='row d-flex'>
                                                    <div className='col-10'>
                                                        <h5 className="fw-normal text-white">Total Employees</h5>
                                                        <h2 className="text-white">{dashData.totalEmployees}</h2>
                                                    </div>
                                                    <div className='col-2 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-user fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card totalTickets-card p-3 border-0">
                                                <div className='row d-flex'>
                                                    <div className='col-6'>
                                                        <h5 className="fw-normal text-white">Total Tickets</h5>
                                                        <h2 className="text-white">{dashData.totalTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-server fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card un-Assigned-card p-3 border-0">
                                                <div className='d-flex row'>
                                                    <div className='col-6'>
                                                        <h5 className="fw-normal text-white">Un-Assigned</h5>
                                                        <h2 className="text-white">{dashData.totalUnAssignedTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-line-chart fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card assigned-card p-3 border-0">
                                                <div className='d-flex row'>
                                                    <div className='col-6'>
                                                        <h5 className="text-white fw-normal">Assigned</h5>
                                                        <h2 className="text-white">{dashData.totalAssignedTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-envelope fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card in-Progress-card p-3  border-0">
                                                <div className='d-flex row'>
                                                    <div className='col-6'>
                                                        <h5 className="text-white fw-normal">In-Progress</h5>
                                                        <h2 className="text-white">{dashData.totalInProgressTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-globe fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card closed-card p-3 border-0">
                                                <div className='row d-flex'>
                                                    <div className='col-6'>
                                                        <h5 className="text-white fw-normal">Closed</h5>
                                                        <h2 className="text-white">{dashData.totalClosedTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-times fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    EmpRole === 'Admin Department Employee' && <div className="row">
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card totalTickets-card p-3 border-0">
                                                <div className='row d-flex'>
                                                    <div className='col-6'>
                                                        <h5 className="fw-normal text-white">Total Tickets</h5>
                                                        <h2 className="text-white">{dashData.totalTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-server fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card assigned-card p-3 border-0">
                                                <div className='d-flex row'>
                                                    <div className='col-6'>
                                                        <h5 className="text-white fw-normal">Assigned</h5>
                                                        <h2 className="text-white">{dashData.totalAssignedTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-envelope fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card in-Progress-card p-3  border-0">
                                                <div className='d-flex row'>
                                                    <div className='col-6'>
                                                        <h5 className="text-white fw-normal">In-Progress</h5>
                                                        <h2 className="text-white">{dashData.totalInProgressTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-globe fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 mb-3">
                                            <div className="card closed-card p-3 border-0">
                                                <div className='row d-flex'>
                                                    <div className='col-6'>
                                                        <h5 className="text-white fw-normal">Closed</h5>
                                                        <h2 className="text-white">{dashData.totalClosedTickets}</h2>
                                                    </div>
                                                    <div className='col-6 justify-content-end d-flex align-items-center'>
                                                        <i class="fa fa-times fs-1 text-white"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    EmpRole === 'Super Admin' &&  <div className='row'>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card totalEmp-card p-3 border-0">
                                            <div className='row d-flex'>
                                                <div className='col-10'>
                                                    <h5 className="fw-normal text-white">Total Employees</h5>
                                                    <h2 className="text-white">{dashData.totalEmployees}</h2>
                                                </div>
                                                <div className='col-2 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-user fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card totalDept-card p-3 border-0">
                                            <div className='row d-flex'>
                                                <div className='col-10'>
                                                    <h5 className="fw-normal text-white">Total Departments</h5>
                                                    <h2 className="text-white">{dashData.totalDepartments}</h2>
                                                </div>
                                                <div className='col-2 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-id-card fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card totalTickets-card p-3 border-0">
                                            <div className='row d-flex'>
                                                <div className='col-6'>
                                                    <h5 className="fw-normal text-white">Total Tickets</h5>
                                                    <h2 className="text-white">{dashData.totalTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-server fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card un-Assigned-card p-3 border-0">
                                            <div className='d-flex row'>
                                                <div className='col-6'>
                                                    <h5 className="fw-normal text-white">Un-Assigned</h5>
                                                    <h2 className="text-white">{dashData.totalUnAssignedTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-line-chart fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card assigned-card p-3 border-0">
                                            <div className='d-flex row'>
                                                <div className='col-6'>
                                                    <h5 className="text-white fw-normal">Assigned</h5>
                                                    <h2 className="text-white">{dashData.totalAssignedTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-envelope fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card in-Progress-card p-3  border-0">
                                            <div className='d-flex row'>
                                                <div className='col-6'>
                                                    <h5 className="text-white fw-normal">In-Progress</h5>
                                                    <h2 className="text-white">{dashData.totalInProgressTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                    <i class="fa fa-globe fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <div className="card closed-card p-3 border-0">
                                            <div className='row d-flex'>
                                                <div className='col-6'>
                                                    <h5 className="text-white fw-normal">Closed</h5>
                                                    <h2 className="text-white">{dashData.totalClosedTickets}</h2>
                                                </div>
                                                <div className='col-6 justify-content-end d-flex align-items-center'>
                                                <i class="fa fa-times fs-1 text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
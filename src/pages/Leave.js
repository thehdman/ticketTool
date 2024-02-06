import React, { useEffect, useState } from 'react';
import { getLeaveData, addLeavesData, aproveLeave, rejectLeave, getLeaveByEmployee, getLeaveForApproval } from "../services/Api"

const Leave = () => {

    const isLoggedIn = localStorage.getItem('loginObj');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;
    const depId = userInfo.deptId;


    let [leaveData, setLeaveData] = useState([]);
    let [leaveObj, setLeaveObj] = useState({
        "leaveId": 0,
        "employeeId": id,
        "fromDate": new Date(),
        "toDate": new Date(),
        "noOfDays": 0,
        "leaveType": "",
        "details": "",
        "isApproved": null,
        "approvedDate": null
    });
    let [isFormSubmitted, setisFormSubmitted] = useState(false);
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        if (EmpRole === 'Employee') {
            getAllLeaveByEmployee();
        }
        else if (EmpRole === 'Department Head') {
            getAllLeaveForApproval();
        }
        else {
            getAllLeaveData();
        }
    }, []);

    const getAllLeaveData = () => {
        getLeaveData().then((data) => {
            setLeaveData(data.data);
            setIsLoader(false);
        })
    }

    const getLeaveObj = (event, key) => {
        setLeaveObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const addAllLeaveData = () => {
        addLeavesData(leaveObj).then((data) => {
            if (data.result) {
                alert('Leave Added Successfully');
                getAllLeaveByEmployee();
            }
            else {
                alert(data.message);
            }
        })
    }

    const getApproveLeave = (leaveId) => {
        aproveLeave(leaveId).then((data) => {
            if (data.result) {
                alert('Leave Approved');
            }
            else {
                alert(data.message);
            }
        })
    }

    const getRejectLeave = (leaveId) => {
        rejectLeave(leaveId).then((data) => {
            if (data.result) {
                alert('Leave Rejected');
            }
            else {
                alert(data.message);
            }
        })
    }

    const getAllLeaveByEmployee = () => {
        getLeaveByEmployee(id).then((data) => {
            setLeaveData(data.data);
            setIsLoader(false);
        })
    }

    const getAllLeaveForApproval = () => {
        getLeaveForApproval(id).then((data) => {
            setLeaveData(data.data);
            setIsLoader(false);
        })
    }

    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Leave List</strong>
                                    </div>
                                    <div className='col-6 text-end'>
                                        <button className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#myModal" >Add Data</button>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                {
                                    EmpRole === 'Employee' && <div className='row'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Emp Name</th>
                                                    <th>From Date</th>
                                                    <th>To Date</th>
                                                    <th>No Of Days</th>
                                                    <th>Details</th>
                                                    <th>Request</th>
                                                </tr>
                                            </thead>
                                            {
                                                isLoader && <tbody>
                                                    <tr>
                                                        <td colSpan={9} className='text-center'>
                                                            <div class="spinner-border text-muted"></div>
                                                            <div class="spinner-border text-primary"></div>
                                                            <div class="spinner-border text-success"></div>
                                                            <div class="spinner-border text-info"></div>
                                                            <div class="spinner-border text-warning"></div>
                                                            <div class="spinner-border text-danger"></div>
                                                            <div class="spinner-border text-secondary"></div>
                                                            <div class="spinner-border text-dark"></div>
                                                            <div class="spinner-border text-light"></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            }
                                            {
                                                !isLoader && <tbody>
                                                    {
                                                        leaveData.map((item, index) => {
                                                            return (<tr>
                                                                <td>{index + 1}</td>
                                                                <td>{item.employeeName}</td>
                                                                <td>{item.fromDate}</td>
                                                                <td>{item.toDate}</td>
                                                                <td>{item.noOfDays}</td>
                                                                <td>{item.details}</td>
                                                                <td><strong>{item.isApproved == true ? 'Approved' : (item.isApproved == false ? 'Reject' : 'Pending')}</strong></td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                }
                                {
                                    EmpRole === 'Department Head' && <div className='row'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Emp Name</th>
                                                    <th>From Date</th>
                                                    <th>To Date</th>
                                                    <th>No Of Days</th>
                                                    <th>Details</th>
                                                    <th>Request</th>
                                                    <th>Approve</th>
                                                    <th>Reject</th>
                                                </tr>
                                            </thead>
                                            {
                                                isLoader && <tbody>
                                                    <tr>
                                                        <td colSpan={9} className='text-center'>
                                                            <div class="spinner-border text-muted"></div>
                                                            <div class="spinner-border text-primary"></div>
                                                            <div class="spinner-border text-success"></div>
                                                            <div class="spinner-border text-info"></div>
                                                            <div class="spinner-border text-warning"></div>
                                                            <div class="spinner-border text-danger"></div>
                                                            <div class="spinner-border text-secondary"></div>
                                                            <div class="spinner-border text-dark"></div>
                                                            <div class="spinner-border text-light"></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            }
                                            {
                                                !isLoader && <tbody>
                                                    {
                                                        leaveData.map((item, index) => {
                                                            return (<tr>
                                                                <td>{index + 1}</td>
                                                                <td>{item.employeeName}</td>
                                                                <td>{item.fromDate}</td>
                                                                <td>{item.toDate}</td>
                                                                <td>{item.noOfDays}</td>
                                                                <td>{item.details}</td>
                                                                <td><strong>{item.isApproved == true ? 'Approved' : (item.isApproved == false ? 'Reject' : 'Pending')}</strong></td>
                                                                <td><button className='btn btn-warning btn-sm' onClick={() => { getApproveLeave(item.leaveId) }} disabled={item.isApproved !== null}>Approve</button></td>
                                                                <td><button className='btn btn-danger btn-sm' onClick={() => { getRejectLeave(item.leaveId) }} disabled={item.isApproved !== null}>Reject</button></td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                }
                                {
                                    EmpRole === 'Super Admin' && <div className='row'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Emp Name</th>
                                                    <th>From Date</th>
                                                    <th>To Date</th>
                                                    <th>Approved Date</th>
                                                    <th>No Of Days</th>
                                                    <th>Request</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            {
                                                isLoader && <tbody>
                                                    <tr>
                                                        <td colSpan={9} className='text-center'>
                                                            <div class="spinner-border text-muted"></div>
                                                            <div class="spinner-border text-primary"></div>
                                                            <div class="spinner-border text-success"></div>
                                                            <div class="spinner-border text-info"></div>
                                                            <div class="spinner-border text-warning"></div>
                                                            <div class="spinner-border text-danger"></div>
                                                            <div class="spinner-border text-secondary"></div>
                                                            <div class="spinner-border text-dark"></div>
                                                            <div class="spinner-border text-light"></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            }
                                            {
                                                !isLoader && <tbody>
                                                    {
                                                        leaveData.map((item, index) => {
                                                            return (<tr>
                                                                <td>{index + 1}</td>
                                                                <td>{item.employeeName}</td>
                                                                <td>{item.fromDate}</td>
                                                                <td>{item.toDate}</td>
                                                                <td>{item.approvedDate}</td>
                                                                <td>{item.noOfDays}</td>
                                                                <td><strong>{item.isApproved == true ? 'Approved' : 'Pending' || item.isApproved == false ? 'Reject' : 'Pending'}</strong></td>
                                                                <td>{item.details}</td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title text-danger">Leave Form</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>From Date</label>
                                            <input type='date' className='form-control' onChange={(event) => { getLeaveObj(event, 'fromDate') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && leaveObj.fromDate == '' && <span>From Date is required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>To Date</label>
                                            <input type='date' className='form-control' onChange={(event) => { getLeaveObj(event, 'toDate') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && leaveObj.toDate == '' && <span>To Date is required.</span>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>No Of Days</label>
                                            <input type='text' className='form-control' onChange={(event) => { getLeaveObj(event, 'noOfDays') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && leaveObj.noOfDays == '' && <span>No Of Days is required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Leave Type</label>
                                            <input type='text' className='form-control' onChange={(event) => { getLeaveObj(event, 'leaveType') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && leaveObj.leaveType == '' && <span>Leave Type is required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Details</label>
                                            <input type='text' className='form-control' onChange={(event) => { getLeaveObj(event, 'details') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && leaveObj.details == '' && <span>Details is required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' >Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-success btn-sm' onClick={addAllLeaveData}>Save Data</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leave;
import React, { useState, useEffect } from 'react';
import { showNewTicket, addTicketData, showDepData, getTicketById, getNewTickets, getAssignedTickets, GetEmployeesByDeptId, ticketRequest, startTickets, closeTicket } from "../services/Api"
import '../assets/circle.css'
import '../assets/steper.css'


const Department = () => {

    const isLoggedIn = localStorage.getItem('loginObj');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;
    const depId = userInfo.deptId;

    let [ticketData, setTicketData] = useState([]);
    let [ticketObj, setTicketObj] = useState({
        "employeeId": id,
        "severity": "",
        "deptId": 0,
        "state": "",
        "requestDetails": ""
    });

    let [ticketRequestObj, setTicketRequestObj] = useState({
        "ticketId": 0,
        "assignedTo": 0
    });

    let [depData, setDepData] = useState([]);
    let [empData, setEmpData] = useState([]);
    let [isFormSubmitted, setisFormSubmitted] = useState(false);
    let [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        if (EmpRole === 'Employee') {
            showTicketCreatedByEmpId();
        }
        else if (EmpRole === 'Department Head') {
            showNewTicketByEmpId();
            GetAllEmployeesByDeptId();
        }
        else if (EmpRole === 'Admin Department Employee') {
            showAssignedTicketByEmpId();
        }
        else {
            showAllTicketData();
        }
        showAllDepData();
    }, []);

    const showAllTicketData = () => {
        showNewTicket().then((data) => {
            setTicketData(data.data);
            setIsLoader(false);
        })
    }

    const showTicketCreatedByEmpId = () => {
        getTicketById(id).then((data) => {
            setTicketData(data.data);
        })
    }

    const showNewTicketByEmpId = () => {
        getNewTickets(id).then((data) => {
            setTicketData(data.data);
        })
    }

    const showAssignedTicketByEmpId = () => {
        getAssignedTickets(id).then((data) => {
            setTicketData(data.data);
        })
    }

    const GetAllEmployeesByDeptId = () => {
        GetEmployeesByDeptId(depId).then((data) => {
            setEmpData(data.data);
        })
    }

    const getTicketObj = (event, key) => {
        setTicketObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const showAllDepData = () => {
        showDepData(ticketObj).then((data) => {
            setDepData(data.data);
        });
    }

    // Function for Assign Ticket
    const getTicketRequest = (event, ticketId) => {
        debugger

        const ticketObj = {
            "ticketId": ticketId,
            "assignedTo": event.target.value
        }

        ticketRequest(ticketObj).then((data) => {
            if (data.result) {
                alert('Ticket Added Successfully');
                showNewTicketByEmpId();
            }
            else {
                alert(data.message);
            }
        })
    }

    const startNewTicket = (id) => {
        startTickets(id).then((data) => {
            if (data.result) {
                alert("Ticket Started");
                showNewTicketByEmpId();
            }
            else {
                alert(data.message);
            }
        })
    }

    const closeNewTicket = (id) => {
        closeTicket(id).then((data) => {
            if (data.result) {
                debugger;
                alert("Ticket Closed");
            }
            else {
                alert(data.message);
            }
        })
    }

    const addAllTicketData = () => {
        addTicketData(ticketObj).then((data) => {
            if (data.result) {
                alert('Ticket Added Successfully');
                if (EmpRole === 'Employee') {
                    showTicketCreatedByEmpId();
                }
                else if (EmpRole === 'Department Head') {
                    showNewTicketByEmpId();
                }
                else if (EmpRole === 'Admin Department Employee') {
                    showAssignedTicketByEmpId();
                }
                else {
                    showAllTicketData();
                }
            }
            else {
                alert(data.message);
            }
        })
    }


    const resetData = () => {
        setisFormSubmitted(false);
        setTicketObj({
            "employeeId": 0,
            "severity": "",
            "deptId": 0,
            "state": "",
            "requestDetails": ""
        })
    }

    const convertDate = (dateString) => {
        const parsedDate = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);

        // Split the formatted date and rearrange the parts
        const [month, day, year] = formattedDate.split(' ');
        return `${day} ${month} ${year}`;
    };

    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Ticket List</strong>
                                    </div>
                                    <div className='col-6 text-end'>
                                        <button className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#myModal" >Add Data</button>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>
                                {
                                    EmpRole === 'Employee' && <div className='row'>
                                        {
                                            ticketData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'>
                                                                <div className='row'>
                                                                    <div className='col-6'>
                                                                        <i class="fa fa-ticket me-2"></i>
                                                                        <strong>{item.ticketNo}</strong>
                                                                    </div>
                                                                    <div className='col-12'>
                                                                        <div class="md-stepper-horizontal orange">
                                                                            <div class="row">
                                                                                <div class="col md-step">
                                                                                    <div class="md-step-circle" style={{backgroundColor: item.state === 'Un-Assigned' ? 'orange' : 'gray'}}><span></span></div>
                                                                                    <div class="md-step-title" style={{color: item.state === 'Un-Assigned' ? 'orange' : 'gray'}}>Un-Assigned</div>
                                                                                    <div class="md-step-bar-right"></div>
                                                                                </div>
                                                                                <div class="col md-step active">
                                                                                    <div class="md-step-circle" style={{backgroundColor: item.state == 'Assigned' ? 'orange' : 'gray'}}><span></span></div>
                                                                                    <div class="md-step-title" style={{color: item.state === 'Assigned' ? 'orange' : 'gray'}}>Assigned</div>
                                                                                    <div class="md-step-bar-left"></div>
                                                                                    <div class="md-step-bar-right"></div>
                                                                                </div>
                                                                                <div class="col md-step">
                                                                                    <div class="md-step-circle" style={{backgroundColor: item.state == 'In-Progress' ? 'orange' : 'gray'}}><span></span></div>
                                                                                    <div class="md-step-title" style={{color: item.state === 'In-Progress' ? 'orange' : 'gray'}}>In-Progress</div>
                                                                                    <div class="md-step-bar-left"></div>
                                                                                    <div class="md-step-bar-right"></div>
                                                                                </div>
                                                                                <div class="col md-step">
                                                                                    <div class="md-step-circle" style={{backgroundColor: item.state == 'Closed' ? 'orange' : 'gray'}}><span></span></div>
                                                                                    <div class="md-step-title" style={{color: item.state === 'Closed' ? 'orange' : 'gray'}}>Closed</div>
                                                                                    <div class="md-step-bar-left"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Created Date</strong> - {convertDate(item.createdDate)}
                                                                        <br></br>
                                                                        <strong>Expected End Date</strong> - {convertDate(item.expectedEndDate)}
                                                                        <br></br>
                                                                        <strong>Dept Name</strong> - {item.deptName}
                                                                        <br></br>
                                                                        <strong>Contact No</strong> - {item.contactNo}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className='col-6 offset-6 text-end'>
                                                                        <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    EmpRole === 'Department Head' && <div className='row'>
                                        {
                                            ticketData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'>
                                                                <i class="fa fa-ticket me-2"></i>
                                                                <strong>{item.ticketNo}</strong>
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Employee Name</strong> - {item.employeeName}
                                                                        <br></br>
                                                                        <strong>Created Date</strong> - {convertDate(item.createdDate)}
                                                                        <br></br>
                                                                        <strong>Expected End Date</strong> - {convertDate(item.expectedEndDate)}
                                                                        <br></br>
                                                                        <strong>Severity</strong> - {item.severity}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className='col-6'>
                                                                        <select className='form-select' onChange={(event) => { getTicketRequest(event, item.ticketId) }}>
                                                                            <option value=''>Select Employee</option>
                                                                            {
                                                                                empData.map((item) => {
                                                                                    return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    EmpRole === 'Admin Department Employee' && <div className='row'>
                                        {
                                            ticketData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'>
                                                                <i class="fa fa-ticket me-2"></i>
                                                                <strong>{item.ticketNo}</strong>
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Employee Name</strong> - {item.employeeName}
                                                                        <br></br>
                                                                        <strong>Department</strong> - {item.deptName}
                                                                        <br></br>
                                                                        <strong>Created Date</strong> - {convertDate(item.createdDate)}
                                                                        <br></br>
                                                                        <strong>Expected End Date</strong> - {convertDate(item.expectedEndDate)}
                                                                        <br></br>
                                                                        <strong>Severity</strong> - {item.severity}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className='col-6 text-end'>
                                                                        {
                                                                            item.state == 'Assigned' && <button className='btn btn-warning btn-sm mx-1' onClick={() => startNewTicket(item.ticketId)}>Start Ticket</button>
                                                                        }
                                                                        {
                                                                            item.state == 'In-Progress' && <button className='btn btn-danger btn-sm mx-1' onClick={() => closeNewTicket(item.ticketId)}>Close Ticket</button>
                                                                        }

                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    EmpRole === 'Super Admin' && <div className='row'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Created By Employee</th>
                                                    <th>Assigned To Employee</th>
                                                    <th>Dept Name</th>
                                                    <th>Ticket No</th>
                                                    <th>State</th>
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
                                                        ticketData.map((item, index) => {
                                                            return (<tr>
                                                                <td>{index + 1}</td>
                                                                <td>{item.createdByEmployee}</td>
                                                                <td>{item.assignedToEmployee}</td>
                                                                <td>{item.deptName}</td>
                                                                <td>{item.ticketNo}</td>
                                                                <td>{item.state}</td>
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
                                    <h4 className="modal-title text-danger">Ticket Form</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <div className="modal-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Severity</label>
                                            <select className='form-select' value={ticketObj.severity} onChange={(event) => { getTicketObj(event, 'severity') }}>
                                                <option>Select Severity</option>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && ticketObj.severity == '' && <span>Department Name is required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Department</label>
                                            <select className='form-select' value={ticketObj.deptId} onChange={(event) => { getTicketObj(event, 'deptId') }}>
                                                <option>Select Department</option>
                                                {
                                                    depData.map((item) => {
                                                        return (<option value={item.deptId}>{item.deptName}</option>)
                                                    })
                                                }
                                            </select>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && ticketObj.deptId == '' && <span>Department Head Name is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-12'>
                                            <label>Request Details</label>
                                            <textarea className='form-control' rows="3" value={ticketObj.requestDetails} onChange={(event) => { getTicketObj(event, 'requestDetails') }} placeholder='Enter Request Details'></textarea>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && ticketObj.requestDetails == '' && <span>Details is required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' onClick={resetData}>Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-success btn-sm' onClick={addAllTicketData}>Save Data</button>
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

export default Department;
import React, { useState, useEffect } from 'react';
import { showEmpData, addEmpData, editEmpData, updateEmpData, deleteEmpData, showDepData, getRoleList } from "../services/Api"

const Department = () => {

    let [empData, setEmpData] = useState([]);
    let [empObj, setEmpObj] = useState({
        "employeeId": 0,
        "employeeName": "",
        "contactNo": "",
        "emailId": "",
        "deptId": 0,
        "password": "",
        "gender": "",
        "role": ""
    });
    let [depData, setDepData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [employeeRole, setEmployeeRole] = useState([]);
    let [isFormSubmitted, setisFormSubmitted] = useState(false);
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);

    useEffect(() => {
        showAllEmpData();
        showAllDepData();
        showAllRole();
    }, []);

    const showAllEmpData = () => {
        showEmpData().then((data) => {
            setEmpData(data.data);
        });
    }

    const showAllDepData = () => {
        showDepData().then((data) => {
            setDepData(data.data);
            setIsLoader(false);
        });
    }

    const getempObj = (event, key) => {
        setEmpObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }


    const addAllEmpData = () => {
        addEmpData(empObj).then((data) => {
            if (data.result) {
                alert('Employee Added Successfully');
                showAllEmpData();
            }
            else {
                alert(data.message);
            }
        })
    }

    const editAllEmpData = (id) => {
        debugger;
        setisShowForm(true);
        editEmpData(id).then((data) => {
            setEmpObj(data)
        })
    }

    const updateAllEmpData = () => {
        if (empObj.employeeId != '' && empObj.employeeName != '' && empObj.contactNo != '' && empObj.emailId != '' && empObj.deptId != '' && empObj.password != '' && empObj.gender != '' && empObj.role != '') {
            updateEmpData(empObj).then((data) => {
                debugger;
                if (data.result) {
                    debugger;
                    alert("Employee Update Successfully");
                    showAllEmpData();
                } else {
                    alert(data.message);
                }
            })      
        }
    }

    const deleteAllEmpData = (id) => {
        debugger;
        deleteEmpData(id).then((data) => {
            if (data.result) {
                alert('Department Data Deleted Successfully');
                showAllEmpData();
            }
            else {
                alert(data.message)
            }
        })
    }

    const showAllRole = () => {
        getRoleList().then((data) => {
            debugger;
            setEmployeeRole(data.data)
    
        })
    }

    const resetData = () => {
        setisFormSubmitted(false);
        setEmpObj({
            "employeeId": 0,
        "employeeName": "",
        "contactNo": "",
        "emailId": "",
        "deptId": 0,
        "password": "",
        "gender": "",
        "role": ""
        })
    }

    const showForm = () => {
        setisShowForm(true);
    }

    const showCard = () => {
        setisShowCard(true);
    }

    const closeForm = () => {
        setisShowForm(false);
    }

    const showTable = () => {
        setisShowCard(false);
    }

    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-12 mb-2 text-end'>
                        <button className='btn btn-danger mb-2' onClick={showForm}>Add Data</button>
                    </div>
                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Employee List</strong>
                                    </div>
                                    <div className='col-6 text-end '>
                                        {
                                            !isShowCard && <button className='btn btn-body p-0 outline' onClick={showCard}>
                                                <i class="fa fa-th fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }
                                        {
                                            isShowCard && <button className='btn btn-body p-0 outline' onClick={showTable}>
                                                <i class="fa fa-table fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                !isShowCard && <div class="card-body">
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Employee Name</th>
                                                <th>Dept Name</th>
                                                <th>Contact No</th>
                                                <th>Email Id</th>
                                                <th>Role</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
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
                                                    empData.map((item, index) => {
                                                        return (<tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.employeeName}</td>
                                                            <td>{item.deptName}</td>
                                                            <td>{item.contactNo}</td>
                                                            <td>{item.emailId}</td>
                                                            <td>{item.role}</td>
                                                            <td><button className='btn btn-success btn-sm' onClick={() => { editAllEmpData(item.employeeId) }}>Edit</button></td>
                                                            <td><button className='btn btn-danger btn-sm' onClick={() => { deleteAllEmpData(item.employeeId) }}>Delete</button></td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            }
                            {
                                isShowCard &&
                                <div className='card-body'>
                                    <div className='row'>
                                        {
                                            empData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'><strong>{item.employeeName}</strong></div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Dept Name</strong> - {item.deptName}
                                                                        <br></br>
                                                                        <strong>Contact No</strong> - {item.contactNo}
                                                                        <br></br>
                                                                        <strong>Email Id</strong> - {item.emailId}
                                                                        <br></br>
                                                                        <strong>Role</strong> - {item.role}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                        <button className='btn btn-danger btn-sm mx-1' onClick={editEmpData}>Edit</button>
                                                                    </div>
                                                                    <div className='col-2 text-end'>
                                                                        <button className='btn btn-primary btn-sm mx-1' onClick={() => { deleteAllEmpData(item.employeeId) }}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='col-4'>
                        {
                            isShowForm && <div class="card">
                                <div class="card-header bg-primary" >
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'>Add Employee</strong>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <button className='btn p-0 btn-body' onClick={closeForm}>
                                                <i className="fa fa-times fa-lg text-white"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Employee Name</label>
                                            <input type='text' className='form-control' value={empObj.employeeName} onChange={(event) => { getempObj(event, 'employeeName') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && empObj.employeeName == '' && <span>Employee Name is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Contact No</label>
                                            <input type='text' className='form-control' value={empObj.contactNo} onChange={(event) => { getempObj(event, 'contactNo') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && empObj.contactNo == '' && <span>Contact No is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Email</label>
                                            <input type='text' className='form-control' value={empObj.emailId} onChange={(event) => { getempObj(event, 'emailId') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && empObj.emailId == '' && <span>Email is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Department</label>
                                            <select className='form-select' value={empObj.deptId} onChange={(event) => { getempObj(event, 'deptId') }}>
                                                <option>Select Department</option>
                                                {
                                                    depData.map((item) => {
                                                        return (<option value={item.deptId}>{item.deptName}</option>)
                                                    })
                                                }
                                            </select>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && empObj.deptHeadEmpId == '' && <span>Department Head Name is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Password</label>
                                            <input type='password' className='form-control' value={empObj.password} onChange={(event) => { getempObj(event, 'password') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && empObj.password == '' && <span>Password is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Gender</label>
                                            <select className='form-select' value={empObj.gender} onChange={(event) => { getempObj(event, 'gender') }}>
                                                <option>Select Gender</option>
                                                <option value='male'>Male</option>
                                                <option value='female'>Female</option>
                                            </select>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && empObj.gender == '' && <span>Gender is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                    <div className='col-6'>
                                        <label>Role</label>
                                        <select className="form-select" aria-label="Default select example" value={empObj.role} onChange={(event) => getempObj(event, 'role')}>
                                            <option value=''>Select Role</option>
                                            {
                                                employeeRole.map((item) => {
                                                    return (<option key={item} value={item}>{item}</option>)
                                                })
                                            }
                                        </select>
                                        {
                                            isFormSubmitted && empObj.role == '' && <span className='text-danger'>Role Is Required </span>
                                        }
                                    </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' onClick={resetData}>Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            {
                                                empObj.employeeId == 0 && <button className='btn btn-success btn-sm' onClick={addAllEmpData}>Save Data</button>
                                            }
                                            {
                                                empObj.employeeId !== 0 && <button className='btn btn-warning btn-sm' onClick={updateAllEmpData}>Update Data</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Department;
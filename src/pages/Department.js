import React, { useState, useEffect } from 'react';
import { showDepData, addDepData, showEmpData, updateDepData, deleteDepData } from "../services/Api"

const Department = () => {

    let [depData, setDepData] = useState([]);
    let [depObj, setDepObj] = useState({
        "deptId": 0,
        "deptName": "",
        "deptHeadEmpId": 0,
        "createdDate": new Date()
    });
    let [empData, setEmpData] = useState([])
    let [isLoader, setIsLoader] = useState(true);
    let [isFormSubmitted, setisFormSubmitted] = useState(false);
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);

    useEffect(() => {
        showAllDepData();
        showAllEmpData();
    }, []);

    const showAllDepData = () => {
        showDepData().then((data) => {
            setDepData(data.data);
            setIsLoader(false);
        });
    }

    const getDepObj = (event, key) => {
        setDepObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }

    const showAllEmpData = () => {
        showEmpData().then((data) => {
            setEmpData(data.data);
        });
    }

    const addAllDepData = () => {
        addDepData(depObj).then((data) => {
            if (data.result) {
                alert('Department Added Successfully');
                showAllDepData();
            }
            else {
                alert(data.message);
            }
        })
    }

    const editDepData = (item) => {
        setisShowForm(true);
        setDepObj(prevObj => ({
            ...prevObj,
            deptId: item.deptId,
            deptName: item.deptName,
            deptHeadEmpId: item.deptHeadEmpId,
            createdDate: item.createdDate
        }))
    }

    const updateAllDepData = () => {
        if (depObj.deptName != '' && depObj.deptHead != '' && depObj.createdDate != '') {
            updateDepData(depObj).then((data) => {
                if (data.result) {
                    alert("Department Update Successfully");
                    showAllDepData();
                } else {
                    alert(data.message);
                }
            })      
        }
    }

    const deleteAllDepData = (id) => {
        debugger;
        deleteDepData(id).then((data) => {
            if (data.result) {
                alert('Department Data Deleted Successfully');
                showAllDepData();
            }
            else {
                alert(data.message)
            }
        })
    }

    const resetData = () => {
        setisFormSubmitted(false);
        setDepObj({
            "deptId": 0,
            "deptName": "",
            "deptHeadEmpId": '',
            "createdDate": ""
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
                                        <strong className='text-white'>Department List</strong>
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
                                                <th>Dept Name</th>
                                                <th>Dept Head Name</th>
                                                <th>Date</th>
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
                                                    depData.map((item, index) => {
                                                        return (<tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.deptName}</td>
                                                            <td>{item.deptHeadName}</td>
                                                            <td>{item.createdDate}</td>
                                                            <td><button className='btn btn-success btn-sm' onClick={() => { editDepData(item) }}>Edit</button></td>
                                                            <td><button className='btn btn-danger btn-sm' onClick={() => { deleteAllDepData(item.deptId) }}>Delete</button></td>
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
                                            depData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'><strong>{item.deptName}</strong></div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Dept Head Name</strong> - {item.deptHeadName}
                                                                        <br></br>
                                                                        <strong>Date</strong> - {item.createdDate}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                        <button className='btn btn-danger btn-sm mx-1' onClick={editDepData}>Edit</button>
                                                                    </div>
                                                                    <div className='col-2 text-end'>
                                                                        <button className='btn btn-primary btn-sm mx-1' onClick={() => { deleteAllDepData(item.deptId) }}>Delete</button>
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
                                            <strong className='text-white'>Add Department</strong>
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
                                            <label>Department Name</label>
                                            <input type='text' className='form-control' value={depObj.deptName} onChange={(event) => { getDepObj(event, 'deptName') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && depObj.deptName == '' && <span>Department Name is required.</span>
                                                }

                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Department Head</label>
                                            <select className='form-select' value={depObj.deptHeadEmpId} onChange={(event) => { getDepObj(event, 'deptHeadEmpId') }}>
                                                <option>Select Department Head</option>
                                                {
                                                    empData.map((item) => {
                                                        return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                    })
                                                }
                                            </select>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && depObj.deptHeadEmpId == '' && <span>Department Head Name is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Date</label>
                                            <input type='date' className='form-control' value={depObj.createdDate} onChange={(event) => { getDepObj(event, 'createdDate') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    isFormSubmitted && depObj.createdDate == '' && <span>Date is required.</span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' onClick={resetData}>Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            {
                                                depObj.deptId == 0 && <button className='btn btn-success btn-sm' onClick={addAllDepData}>Save Data</button>
                                            }
                                            {
                                                depObj.deptId !== 0 && <button className='btn btn-warning btn-sm' onClick={updateAllDepData}>Update Data</button>
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
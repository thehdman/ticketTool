import axios from 'axios';
import * as Constant from "./Constant"
const ApiUrl = process.env.REACT_APP_API_KEY;

const getLogin = async (obj) => {
    const result = await axios.post(ApiUrl + Constant.LOGIN, obj);
    return result.data
}

const showDepData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_DEPARTMENT);
    return result.data
}

const addDepData = async (depData) => {
    try {
        const result = await axios.post(ApiUrl + Constant.CREATE_DEPARTMENT, depData);
        return result.data
    }
    catch (error) {
        alert(error.message)
    }
}

const updateDepData = async (depObj) => {
    try {
        const result = await axios.put(ApiUrl + Constant.UPDATE_DEPARTMENT, depObj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const deleteDepData = async (id) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.delete(ApiUrl + Constant.DELETE_DEPARTMENT + id);
        return result.data
    }
}

const showEmpData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_EMPLOYEE);
    return result.data
}

const addEmpData = async (empObj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.CREATE_EMPLOYEE, empObj)     
        return result.data
    }
    catch (error) {
        alert(error.message)
    }
}

const editEmpData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.EDIT_EMPLOYEE + id);
    return result.data.data
}


const updateEmpData = async (empObj) => {
    try {
        const result = await axios.put(ApiUrl + Constant.UPDATE_EMPLOYEE, empObj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const getRoleList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_ROLE);
    return result.data
}

const deleteEmpData = async (id) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.delete(ApiUrl + Constant.DELETE_EMPLOYEE + id);
        return result.data
    }
}

const showNewTicket = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_TICKETS);
    return result.data
}

const addTicketData = async (ticketObj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.CREATE_TICKET, ticketObj)     
        return result.data
    }
    catch (error) {
        alert(error.message)
    }
}

const getTicketById = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_TICKETS_CREATED_BY_EMPID + id);
    return result.data
}

const getNewTickets = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_NEW_TICKETS + id);
    return result.data
}

const getAssignedTickets = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ASSIGNED_TICKET + id);
    return result.data
}

const GetEmployeesByDeptId = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_EMPLOYEE_BY_DEPTID + id);
    return result.data
}

const ticketRequest = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ASSIGN_REQUEST, obj)     
        return result.data
    }
    catch (error) {
        alert(error.message)
    }
}

const getEmpDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_EMPLOYEE_DASHBOARD + id);
    return result.data
}

const getDeptHeadDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_DEPTHEAD_DASHBOARD + id);
    return result.data
}

const getAdminEmpDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ADMINEMPLOYEE_DASHBOARD + id);
    return result.data
}

const getSuperAdminDashData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_SUPERADMIN_DASHBOARD);
    return result.data
}

const startTickets = async (id) => {
    const result = await axios.post(ApiUrl + Constant.START_TICKET + id);
    return result.data
}

const closeTicket = async (id) => {
    const result = await axios.post(ApiUrl + Constant.CLOSE_TICKET + id);
    return result.data 
}

const getLeaveData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_LEAVES);
    return result.data
}

const addLeavesData = async (obj) => {
    const result = await axios.post(ApiUrl + Constant.ADD_LEAVE, obj);
    return result.data 
}

const aproveLeave = async (id) => {
    const result = await axios.get(ApiUrl + Constant.APPROVE_LEAVE + id);
    return result.data
}

const rejectLeave = async (id) => {
    const result = await axios.get(ApiUrl + Constant.REJECT_LEAVES + id);
    return result.data
}

const getLeaveByEmployee = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_LEAVES_BY_EMPLOYEE + id);
    return result.data
}

const getLeaveForApproval = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_LEAVES_FOR_APPROVAL + id);
    return result.data
}

export { getLogin, showDepData, addDepData, updateDepData, deleteDepData, showEmpData, addEmpData, editEmpData, updateEmpData, deleteEmpData, getRoleList, showNewTicket, addTicketData, getTicketById, getNewTickets, getAssignedTickets, GetEmployeesByDeptId, ticketRequest, getEmpDashData, getDeptHeadDashData, getAdminEmpDashData, getSuperAdminDashData, startTickets, closeTicket, getLeaveData, addLeavesData, aproveLeave, rejectLeave, getLeaveByEmployee, getLeaveForApproval }

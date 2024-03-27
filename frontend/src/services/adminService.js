import axios from "axios";
import AuthService from "./auth.service";
import API_BASE_URL from "./auth.config";

const getAllTransactions = (pagenumber, pageSize, searchKey) => {
    return axios.get(
        API_BASE_URL + "/transaction/getAll",
        {
            headers: AuthService.authHeader(),
            params: {
                pageNumber: pagenumber,
                pageSize: pageSize,
                searchKey: searchKey
            }
        }
    )
}

const getAllUsers = (pagenumber, pageSize, searchKey) => {
    return axios.get(
        API_BASE_URL + "/user/getAll",
        {
            headers: AuthService.authHeader(),
            params: {
                pageNumber: pagenumber,
                pageSize: pageSize,
                searchKey: searchKey
            }
        }
    )
}

const disableOrEnableUser = (userId) => {
    return axios.delete(
        API_BASE_URL + "/user/disable",
        {
            headers: AuthService.authHeader(),
            params: {
                userId: userId
            }
        }
    )
}

const getAllcategories = () => {
    return axios.get(
        API_BASE_URL + '/category/getAll', 
        {
            headers: AuthService.authHeader()
        }
    )
}

const addNewcategory = (categoryName, transactionTypeId) => {
    return axios.post(
        API_BASE_URL + '/category/new', 
        {
            categoryName: categoryName,
            transactionTypeId: transactionTypeId
        },
        {
            headers: AuthService.authHeader()
        }
    )
}

const updatecategory = (categoryId, categoryName, transactionTypeId) => {
    return axios.put(
        API_BASE_URL + '/category/update', 
        {
            categoryName: categoryName,
            transactionTypeId: transactionTypeId
        },
        {
            headers: AuthService.authHeader(),
            params: {
                categoryId: categoryId
            }
        }
    )
}

const disableOrEnableCategory = (categoryId) => {
    return axios.delete(
        API_BASE_URL + "/category/delete",
        {
            headers: AuthService.authHeader(),
            params: {
                categoryId: categoryId
            }
        }
    )
}

const AdminService = {
    getAllTransactions,
    getAllUsers,
    disableOrEnableUser,
    getAllcategories,
    addNewcategory,
    updatecategory,
    disableOrEnableCategory,
}

export default AdminService;
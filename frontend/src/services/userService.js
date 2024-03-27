import axios from "axios";
import AuthService from "./auth.service";
import API_BASE_URL from "./auth.config";


const get_categories = () => {
    return axios.get(
        API_BASE_URL + '/category/getAll',
        {
            headers: AuthService.authHeader()
        }
    )
}

const add_transaction = (email, categoryId, descripiton, amount, date) => {
    return axios.post(
        API_BASE_URL + '/transaction/new', 
        {
            userEmail: email,
            categoryId: categoryId,
            description:descripiton,
            amount: amount,
            date: date 
        },
        {
            headers: AuthService.authHeader()
        }
    )
}

const get_transactions = (email, pageNumber, pageSize, searchKey, sortField, sortDirec, transactionType) => {
    return axios.get(
        API_BASE_URL + '/transaction/getByUser', 
        {
            headers: AuthService.authHeader(), 
            params: {
                email: email, pageNumber: pageNumber, pageSize: pageSize, searchKey: searchKey, sortField: sortField, sortDirec: sortDirec, transactionType: transactionType
            }
        }
    )
}

const get_single_transaction = (id) => {
    return axios.get(
        API_BASE_URL + '/transaction/getById', 
        {
            headers: AuthService.authHeader(), 
            params: {
                id: id
            }
        }
    )
}
const update_transaction = (transactionId, email, categoryId, descripiton, amount, date) => {
    return axios.put(API_BASE_URL + '/transaction/update', 
        {
            userEmail: email,
            categoryId: categoryId,
            description:descripiton,
            amount: amount,
            date: date 
        },
        {
            headers: AuthService.authHeader(),
            params: {
                transactionId: transactionId
            }
        }
    )
}

const delete_transaction = (id) => {
    return axios.delete(
        API_BASE_URL + '/transaction/delete', 
        {
            headers: AuthService.authHeader(), 
            params: {
                transactionId: id
            }
        }
    )
}

const settingsResetPassword = async (email, oldPassword, newpassword) => {
    return await axios.post(API_BASE_URL + '/user/settings/changePassword', {
        email: email, 
        currentPassword: oldPassword,
        newPassword: newpassword
    }, {
      headers: AuthService.authHeader(),
    })
}

const getTotalIncomeOrExpense = async (userId, transactionTypeId, month, year) => {
    return axios.get(
        API_BASE_URL + '/transaction/getTotalIncomeOrExpense', 
        {
            headers: AuthService.authHeader(), 
            params: {
                userId: userId,
                transactionTypeId: transactionTypeId,
                month: month,
                year: year
            }
        }
    )
}

const getTotalNoOfTransactions = async (userId, month, year) => {
    return axios.get(
        API_BASE_URL + '/transaction/getTotalNoOfTransactions', 
        {
            headers: AuthService.authHeader(), 
            params: {
                userId: userId,
                month: month,
                year: year
            }
        }
    )
}

const getTotalByCategory = async (email, categoryId, month, year) => {
    return await axios.get(
        API_BASE_URL + '/transaction/getTotalByCategory', 
        {
            headers: AuthService.authHeader(), 
            params: {
                email: email,
                categoryId: categoryId,
                month: month,
                year: year
            }
        }
    )
}

const getMonthlySummary = async (email) => {
    return await axios.get(
        API_BASE_URL + '/transaction/getMonthlySummaryByUser', 
        {
            headers: AuthService.authHeader(), 
            params: {
                email: email,
            }
        }
    )
}

const UserService = {
    get_categories,
    add_transaction ,
    get_transactions,
    get_single_transaction,
    update_transaction,
    delete_transaction,
    settingsResetPassword,
    getTotalIncomeOrExpense,
    getTotalNoOfTransactions,
    getTotalByCategory,
    getMonthlySummary
}
export default UserService;
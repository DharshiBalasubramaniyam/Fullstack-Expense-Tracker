import './index.css';
import './assets/styles/header.css'
import './assets/styles/register.css'
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './assets/styles/user.css'
import Loading from './components/utils/loading';
import AuthService from './services/auth.service'
import { ThemeContext, useTheme } from './contexts/ThemeContext.js';
import NewSavedTransaction from './pages/user/newSavedTransaction.js';
import SavedTransactions from './pages/user/savedTransactions.js';
import EditSavedTransaction from './pages/user/editSavedTransaction.js';

const Welcome = lazy(() => import('./pages/welcome.js'))
const Login = lazy(() => import('./pages/auth/login/login.js'))
const Register = lazy(() => import('./pages/auth/register/register.js'))
const UserRegistrationVerfication = lazy(() => import('./pages/auth/register/userRegistrationVerification.js'))
const RegistrationSuccess = lazy(() => import('./pages/auth/register/registrationSuccessfull.js'))
const Dashboard = lazy(() => import('./pages/user/dashboard.js'))
const Transactions = lazy(() => import("./pages/user/transactions.js"))
const NewTransaction = lazy(() => import("./pages/user/newTransaction.js"))
const EditTransaction = lazy(() => import("./pages/user/editTransaction.js"))
const ForgotPasswordEmailVerfication = lazy(() => import('./pages/auth/forgotpassword/forgotPasswordEmailVerification.js'))
const ForgotPasswordCodeVerification = lazy(() => import('./pages/auth/forgotpassword/forgotPasswordCodeVerification'))
const ForgotPasswordChangePassword = lazy(() => import('./pages/auth/forgotpassword/changePassword.js'))
const UnAuthorizedAccessPage = lazy(() => import('./pages/auth/unAuthorized.js'))
const AdminTransactionsManagement = lazy(() => import('./pages/admin/transactions.js'))
const AdminUsersManagement = lazy(() => import('./pages/admin/users.js'))
const AdminCategoriesManagement = lazy(() => import('./pages/admin/categories.js'))
const NotFoundPage = lazy(() => import('./pages/auth/notFound'))
const NewCategory = lazy(() => import('./pages/admin/newCategory.js'))
const EditCategory = lazy(() => import('./pages/admin/editCategory.js'))
const AdminProfile = lazy(() => import('./pages/admin/adminProfile.js'))
const UserProfile = lazy(() => import('./pages/user/userProfile.js'))
const UserStatistics = lazy(() => import('./pages/user/statistics.js'))

function App() {

    const [isDarkMode, toggleTheme] = useTheme()

    const ProtectedRoute = ({ isAllowed, redirectPath = '/unauthorized', children }) => {
        if (!isAllowed) {
            return <Navigate to={redirectPath} replace />;
        }

        return children ? children : <Outlet />
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                <RoutesWrapper isDarkMode={isDarkMode}>
                    <Routes>
                        <Route element={<ProtectedRoute isAllowed={!AuthService.getCurrentUser()} />}>
                            <Route path="/auth/userRegistrationVerfication/:email" element={<UserRegistrationVerfication />} />
                            <Route path="/auth/success-registration" element={<RegistrationSuccess />} />
                            <Route path='/auth/forgetpassword/verifyEmail' element={<ForgotPasswordEmailVerfication />} />
                            <Route path='/auth/forgotPassword/verifyAccount/:email' element={<ForgotPasswordCodeVerification />} />
                            <Route path='/auth/forgotPassword/resetPassword/:email' element={<ForgotPasswordChangePassword />} />
                        </Route>

                        <Route element={<ProtectedRoute isAllowed={AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_USER")} />}>
                            <Route path="/user/dashboard" element={<Dashboard />} />
                            <Route path="/user/newTransaction" element={<NewTransaction />} />
                            <Route path="/user/transactions" element={<Transactions />} />
                            <Route path="/user/newTransaction" element={<NewTransaction />} />
                            <Route path="/user/editTransaction/:transactionId" element={<EditTransaction />} />
                            <Route path="/user/savedTransactions" element={<SavedTransactions />} />
                            <Route path="/user/savedTransactions/new" element={<NewSavedTransaction />} />
                            <Route path="/user/editSavedTransaction/:transactionId" element={<EditSavedTransaction />} />
                            <Route path='/user/statistics' element={<UserStatistics />} />
                            <Route path='/user/settings' element={<UserProfile />} />
                        </Route>

                        <Route element={<ProtectedRoute isAllowed={AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN")} />}>
                            <Route path='/admin/transactions' element={<AdminTransactionsManagement />} />
                            <Route path='/admin/users' element={<AdminUsersManagement />} />
                            <Route path='/admin/categories' element={<AdminCategoriesManagement />} />
                            <Route path='/admin/newCategory' element={<NewCategory />} />
                            <Route path='/admin/editCategory/:categoryId' element={<EditCategory />} />
                            <Route path='/admin/settings' element={<AdminProfile />} />
                        </Route>

                        <Route path="/" element={<Welcome />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/unauthorized" element={<UnAuthorizedAccessPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </RoutesWrapper>
            </ThemeContext.Provider>
        </Suspense>

    );
}


function RoutesWrapper({ children, isDarkMode }) {
    return (
        <div className={isDarkMode ? "dark" : "light"}>
            {children}
        </div>
    )

}

function LoadingSpinner() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Loading />
        </div>
    )
}

export default App;

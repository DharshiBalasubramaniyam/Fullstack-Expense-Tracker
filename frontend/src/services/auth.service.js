import axios from "axios";
import API_BASE_URL from "./auth.config";

const register_req = async (username, email, password) => {
  return await axios.post(API_BASE_URL + '/auth/signup', {
      userName: username, 
      email: email, 
      password: password
  })
}

const login_req = async (email, password) => {
  const response = await axios.post(API_BASE_URL + '/auth/signin', {email, password})

  if (response.data.token) {
      console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload()
  }

  return response;
}

const verifyRegistrationVerificationCode = async (verificationCode) => {
  return await axios.get(API_BASE_URL + '/auth/signup/verify', {
      params: {
          code: verificationCode
      }
  })
}

const resendRegistrationVerificationCode = async(email) => {
  return await axios.get(API_BASE_URL + "/auth/signup/resend", {
      params: {
          email: email
      }
  })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const logout_req = () => {
  localStorage.removeItem("user");
}

const forgotPasswordVerifyEmail = async (email) => {
  return await axios.get(API_BASE_URL + "/auth/forgotPassword/verifyEmail", {
      params: {
          email: email
      }
  })
}

const forgotPasswordverifyCode = async (code) => {
  return await axios.get(API_BASE_URL + "/auth/forgotPassword/verifyCode", {
      params: {
          code: code
      }
  })
}

const resendResetPasswordVerificationCode = async(email) => {
  return await axios.get(API_BASE_URL + "/auth/forgotPassword/resendEmail", {
      params: {
          email: email
      }
  })
}

const resetPassword = async (email, password) => {
  return await axios.post(API_BASE_URL + '/auth/forgotPassword/resetPassword', {
      email: email, 
      currentPassword: "",
      newPassword: password
  })
}

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}

const AuthService = {
  register_req,
  login_req,
  verifyRegistrationVerificationCode,
  resendRegistrationVerificationCode,
  getCurrentUser,
  logout_req,
  forgotPasswordVerifyEmail,
  forgotPasswordverifyCode,
  resendResetPasswordVerificationCode,
  resetPassword,
  authHeader
}

export default AuthService;
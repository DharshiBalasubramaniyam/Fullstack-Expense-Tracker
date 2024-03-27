import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import AuthService from '../../../services/auth.service';

const UserRegistrationVerfication = () => {
    const navigate = useNavigate();
    
    const { email } = useParams(); 

    const {register, handleSubmit, formState} = useForm();

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true)        
        const response = await AuthService.verifyRegistrationVerificationCode(data.code).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "SUCCESS") {
                    console.log(response.data);
                    navigate('/auth/success-registration')
                    setResponseError("");
                }else {
                    setResponseError("Verification failed: Cannot resend email!")
                }
                
            },
            (error) => {
                if (error.response) {
                    const resMessage = error.response.data.response;
                    setResponseError(resMessage);
                    console.log(error);
                }else {
                    console.log(error);
                    setResponseError("Verification failed: Cannot resend email!")
                }
            }
          );
        setIsLoading(false);
    }

    const resendCode = async() =>{
        setIsSending(true)         
        const response = await AuthService.resendRegistrationVerificationCode(email).then(
            (response) => {
                console.log(response.data.message);
                setResponseError("");
            },
            (error) => {
                setResponseError("cannot send email again!");
            }
          );
          setIsSending(false)  
    }

  return (
    <div className='container'>
            <form className="auth-form"  onSubmit={handleSubmit(onSubmit)}>
                <h2>Verify your email</h2><br/>
                {
                    isSending ? 
                        <div className='msg'>Sending email to {email}...</div> 
                        : (response_error==="") 
                        ? <div className='msg'>The verification code has been sent to <span style={{fontWeight:600,  color:'green'}}>{email}</span>.</div>
                        : <></>
                }
                {
                    (response_error!=="") && <p>{response_error}</p>
                }
                
                <div className='input-box'>
                    <input 
                    placeholder='Enter verification code'
                        type='text'
                        {...register('code', {
                            required: "Code is required!",
                        })}
                    />
                    {formState.errors.code && <small>{formState.errors.code.message}</small>}
                </div>

                <div className='msg' style={{fontWeight: 600, fontStyle: 'italic'}}>Please not that the verification code will be expired with in 15 minutes!</div>
                <br/>

                <div className='input-box'>
                    <input type='submit' value={isLoading ? "Verifying" : 'Verify'}
                     className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>

                <br/>
                <div className='msg'>Having problems? <span style={{cursor: 'pointer'}} onClick={resendCode} className='inline-link'>{isLoading ? "Sending code" : 'Resend code'}</span></div>
            </form>
    </div>
  );
};

export default UserRegistrationVerfication;

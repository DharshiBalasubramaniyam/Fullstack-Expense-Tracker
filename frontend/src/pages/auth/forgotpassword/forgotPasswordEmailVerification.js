import React, { useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import AuthService from '../../../services/auth.service';
import Logo from '../../../components/utils/Logo';

const ForgotPasswordEmailVerfication = () => {
    const navigate = useNavigate()

    const {register, handleSubmit, formState} = useForm();

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async (data) => {
        setIsLoading(true)        
        await AuthService.forgotPasswordVerifyEmail(data.email).then(
            (response) => {
                console.log(response.data.message);
                if (response.data.status === 'SUCCESS') {
                    setResponseError("")
                    navigate(`/auth/forgotPassword/verifyAccount/${data.email}`);
                } else {
                    setResponseError('Verification failed: Something went wrong!');
                }
            },
            (error) => {
                if (error.response) {
                    const resMessage = error.response.data.response;
                    setResponseError(resMessage);
                    console.log(resMessage);
                }else {
                    console.log(error.message);
                    setResponseError("Verification failed: Something went wrong!")
                }
            }
          );
        setIsLoading(false);
        console.log(data);
    }

  return (
    <div className='container'>
            <form className="auth-form"  onSubmit={handleSubmit(onSubmit)}>
                <Logo/>
                <h3 style={{textAlign:'center'}}>Forgot password - verify your account</h3><br/>
                <div className='msg' style={{textAlign: 'center', fontWeight: 600}}>Enter the email address which registered with us.</div><br/>

                {
                    (response_error!=="") && <p>{response_error}</p>
                }
                
                <div className='input-box'>
                    <input 
                    placeholder='Email address'
                        type='text'
                        {...register('email', {
                            required: "Email is required!",
                            pattern: {value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message:"Invalid email address!"}
                        })}
                    />
                    {formState.errors.email && <small>{formState.errors.email.message}</small>}
                </div>

                <div className='input-box'>
                    <input type='submit' value={isLoading ? "Verifying" : 'Verify'}
                     className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>
                <br/>
                <div className='msg'> <Link to={'/auth/login'} className='inline-link'>Back to Login</Link></div>

            </form>
    </div>
  );
};

export default ForgotPasswordEmailVerfication;

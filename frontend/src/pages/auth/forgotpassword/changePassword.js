import {useRef, useState} from 'react';
import '../../../assets/styles/register.css';
import { useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import AuthService from '../../../services/auth.service';

function ForgotPasswordChangePassword() {
    const navigate = useNavigate();
    
    const { email } = useParams(); 

    const {register, handleSubmit, watch, formState} = useForm();
    const password = useRef({});
    password.current = watch('password', "");

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async (data) => {
        setIsLoading(true);     
        await AuthService.resetPassword(email, data.password).then(
            (response) => {
                console.log(response);
                if (response.data.status === "SUCCESS"){
                    setResponseError("");
                    navigate(`/auth/login`);
                }
                else {
                    setResponseError("Reset password failed: Something went wrong!")
                }
            },
            (error) => {
                if (error.response) {
                    const resMessage = error.response.data.response
                    setResponseError(resMessage);
                    console.log(error.response);
                }else {
                    setResponseError("Reset password failed: Something went wrong!")
                }
                
            }
          );
        setIsLoading(false);
    }

    return(
        <div className='container'>
            <form className="auth-form"  onSubmit={handleSubmit(onSubmit)}>
                <h2>Change password</h2>
                {
                    (response_error!=="") && <p>{response_error}</p>
                }
                
                <div className='input-box'>
                    <label>Password</label><br/>
                    <input 
                        type='password'
                        {
                            ...register('password', {
                                required: 'Password is required!',
                                minLength: {
                                    value:8,
                                    message: "Password must have atleast 8 characters"
                                }
                            })
                        }
                    />
                    {formState.errors.password && <small>{formState.errors.password.message}</small>}
                </div>
                
                <div className='input-box'>
                    <label>Confirm Password</label><br/>
                    <input 
                        type='password'
                        {
                            ...register('cpassword', {
                                required: 'Confirm password is required!',
                                minLength: {
                                    value:8,
                                    message: "Password must have atleast 8 characters"
                                },
                                validate: cpass => cpass === password.current || "Passwords do not match!"
                            })
                        }
                    />
                    {formState.errors.cpassword && <small>{formState.errors.cpassword.message}</small>}
                </div>
                
                <div className='input-box'>
                    <input type='submit' value={isLoading ? "Please wait" : 'Change password'}
                     className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordChangePassword;
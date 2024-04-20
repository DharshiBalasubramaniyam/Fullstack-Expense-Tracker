import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/utils/header";
import AdminService from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function NewCategory() {

    const { register, handleSubmit, formState } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setIsLoading(true)
        await AdminService.addNewcategory(data.cname, data.type).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    navigate('/admin/categories')
                }
            },
            (error) => {
                error.response ?
                    toast.error("Failed to add category: Try again later!")
                    :
                    toast.error("Failed to add category: Try again later!")
            }
        )
        setIsLoading(false)
    }

    return (
        <Container activeNavId={7}>
            <Header title="New Category" />
            <Toaster/>

            <form className="auth-form t-form" onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '25px' }}>

                <div className='input-box'>
                    <label>Category name</label><br />
                    <input
                        type='text'
                        {...register('cname', {
                            required: "Category name is required!",
                            maxLength: {
                                value: 30,
                                message: "Category name can have atmost 30 characters!"
                            }
                        })}
                    />
                    {formState.errors.cname && <small>{formState.errors.cname.message}</small>}
                </div>

                <div className='input-box'>
                    <label>Transaction type</label><br />
                    <div className='radio'>
                        <span>
                            <label>
                                <input
                                    type='radio'
                                    id={1}
                                    value={1}
                                    {...register('type', {
                                        required: "Transaction type is required!"
                                    })}
                                />
                                Expense
                            </label>
                        </span>
                        <span>
                            <label>
                                <input
                                    type='radio'
                                    id={2}
                                    value={2}
                                    {...register('type', {
                                        required: "Transaction type is required!"
                                    })}
                                />
                                Income
                            </label>
                        </span>
                    </div>
                    {formState.errors.type && <small>{formState.errors.type.message}</small>}
                </div>

                <div className='input-box'>
                    <input
                        type='submit'
                        value={isLoading ? "Saving..." : 'Save category'}
                        className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>
            </form>

        </Container>
    )
}

export default NewCategory;
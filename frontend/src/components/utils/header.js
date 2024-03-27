import { memo, useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const Header = memo(({title}) =>  {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setEmail(user.email)
            setUsername(user.username)
        }
    })

    return (
        <div className='top'>
            <div className="title"> 
                <h1>{title}</h1>
            </div>

            <div className='profile'>
                <i class='fa fa-user-circle-o' aria-hidden='true'></i>
                <div>
                    <p>{username}</p>
                    <p>{email}</p>
                </div>
            </div>
        </div>
    )
})

export default Header;
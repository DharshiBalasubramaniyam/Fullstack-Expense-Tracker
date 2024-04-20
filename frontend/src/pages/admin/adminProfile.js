import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import ProfileCard from "../../components/userProfile/userProfileCard";
import Header from '../../components/utils/header';
import ChangePassword from "../../components/userProfile/changePassword";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";

function AdminProfile() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setEmail(user.email)
            setUsername(user.username)
        }
    }, [])

    return (
        <Container activeNavId={8}>
            <Header title="Settings" />
            <Toaster/>
            <ProfileCard username={username} email={email} />
            <ChangePassword email={email}  />
        </Container>
    )
}

export default AdminProfile;
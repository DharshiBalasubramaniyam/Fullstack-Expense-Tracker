import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import ProfileCard from "../../components/userProfile/userProfileCard";
import Header from '../../components/utils/header';
import Message from '../../components/utils/message';
import ChangePassword from "../../components/userProfile/changePassword";
import Container from "../../components/utils/Container";

function UserProfile() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setEmail(user.email)
            setUsername(user.username)
        }
    }, [])

    return (
        <Container activeNavId={3}>
            <Header title="Settings" />
            <Message message={message} />
            <ProfileCard username={username} email={email} setMessage={setMessage} />
            <ChangePassword email={email} setMessage={setMessage} />
        </Container>
    )
}

export default UserProfile;
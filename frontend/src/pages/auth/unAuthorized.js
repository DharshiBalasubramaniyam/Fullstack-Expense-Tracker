import { useNavigate } from "react-router-dom";
import Logo from "../../components/utils/Logo";

function UnAuthorizedAccessPage() {

    const navigate = useNavigate()
    return (
        <main>
            <Logo/>
            <h1>401 - Unauthorized!</h1>
            <h3>Sorry, Looks like you have attempted to access a page for which you are not authorized! Try refreshing the page or click the button below to go back to the home page.</h3>
            <button
                onClick={() => navigate("/")}
            >Go to home</button>
        </main>
    )
}
export default UnAuthorizedAccessPage;
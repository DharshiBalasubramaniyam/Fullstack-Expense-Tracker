import { useNavigate } from "react-router-dom";
import Logo from "../../components/utils/Logo";

function NotFoundPage() {

    const navigate = useNavigate()
    return (
        <main>
            <Logo/>
            <h1>404 - Not Found!</h1>
            <h3>Sorry! the page your are looking for was either not found or does not exist. Try refreshing the page or click the button below to go back to the home page.</h3>
            <button
                onClick={() => navigate("/")}
            >Go to home</button>
        </main>
    )
}
export default NotFoundPage;
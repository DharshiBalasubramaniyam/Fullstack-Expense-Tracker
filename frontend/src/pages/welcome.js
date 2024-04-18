import { Link } from 'react-router-dom';
import '../assets/styles/welcome.css';
import Logo from '../components/utils/Logo';

function Welcome() {
    return (
        <section className="hero-section">
            <Logo/>
            <h2>Welcome to MyWallet!</h2>
            <h3>Meet financial freedom with MyWallet. The application designed to revolutionize how you manage your expences and empower your financial journey.</h3>

            <div>
                <Link to='/auth/login'><p><button>Log in</button></p></Link>
                <Link to='/auth/register'><button>Create Account</button></Link>
            </div>
        </section>
    )
}

export default Welcome;
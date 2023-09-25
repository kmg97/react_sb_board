import Signup from "../login/Signup";

function LoginPage(props) {
    return (
        <div>
            <Signup onSignup={props.onSignup}/>
        </div>
    );
}

export default LoginPage;
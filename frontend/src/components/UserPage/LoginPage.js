import Login from "../login/Login";

function LoginPage (props) {
    return (
        <div>
            <Login onLogin={props.onLogin}/>
        </div>
    );
}

export default LoginPage;
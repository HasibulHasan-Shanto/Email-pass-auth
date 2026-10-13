import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { Link } from "react-router";
import { useRef, useState } from "react";


const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const emailRef = useRef()
    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        console.log('Login done', email, password);
        setError('')
        setSuccess(false)
        event.target.reset()
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }

    const handleResetPass = () => {
        console.log('reset done');
        const email = emailRef.current.value
        sendPasswordResetEmail(auth, email)
        .then( ()=> {
            alert('Please check your email and reset your pass')
        })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input name="email" type="email"
                                ref={emailRef} className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input name="password" type="password" className="input" placeholder="Password" />
                                <div onClick={handleResetPass}><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                                <div className="flex gap-2">
                                    You don't have any account
                                    <Link to='/register'>
                                        <p className="text-blue-500 underline">
                                            Sign Up
                                        </p>
                                    </Link>
                                </div>
                                {
                                    error && <p className="font-bold text-red-500">{error}</p>
                                }
                                <p>
                                    {
                                        success && <p className="text-green-500">
                                            Account Login Successful
                                        </p>
                                    }
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
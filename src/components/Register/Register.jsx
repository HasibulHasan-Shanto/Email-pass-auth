import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";


const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/
    const handleRegister = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const terms = e.target.checkbox.checked
        console.log('register done', email, password, terms);
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email')
            return
        }
        else if (!passPattern.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $ etc.)')
            return
        }
        else if (!terms) {
            setError('Accept our terms and condition')
            return
        }
        setError('')
        setSuccess(false)
        e.target.reset()
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })

    }

    const handleShowPass = (e) => {
        e.preventDefault()
        setShowPass(!showPass)
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        className="input w-full pr-10"
                                        placeholder="Password"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleShowPass}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 ">
                                    <label className="label">
                                        <input
                                            name="checkbox"
                                            type="checkbox" className="checkbox" />
                                        Accept out term and condition
                                    </label>
                                </fieldset>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register Now</button>
                            </fieldset>
                            <div className="flex gap-2">
                                Already Have a Account 
                                <Link to='/login'>
                                    <p className="text-blue-500 underline">
                                        Sign In
                                    </p>
                                </Link>
                            </div>
                            <p className="text-red-500 font-bold">
                                {error}
                            </p>
                            <p>
                                {
                                    success && <p className="text-green-500">Account Create Successful</p>
                                }
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
import { LockClosedIcon } from "@heroicons/react/24/solid/index.js";
import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {

    const {setCurrentUser, setUserToken} = useStateContext();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState({__html: ''});

    const onSubmit = (e) => {
        e.preventDefault();

        setError({__html: ''});

        axiosClient.post('/signup', {
            name: fullName,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
            .then(({data}) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch(({response}) => {
                if(response.data.errors) {
                    const Errors = Object
                        .values(response.data.errors)
                        .reduce((accum, next) => [...accum, ...next], []);
                    console.log(Errors);
                    setError({__html: Errors.join('<br/>')})
                }
                console.error(response);
            });
    }

    return (
        <>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login with your account
                </h2>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '} Signup for free{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Start a 14 day free trial
                </Link>
            </p>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    {error.__html && (
                        <div
                            className="bg-red-500 rounded py-2 px-3 text-white"
                            dangerouslySetInnerHTML={error}></div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="full-name"
                                    name="name"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password Confirmation
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password-confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className="indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="
                                group relative
                                flex
                                w-full
                                justify-center
                                rounded-md
                                border border-transparent
                                bg-indigo-600
                                px-3 py-1.5
                                text-sm
                                font-medium
                                leading-6
                                text-white
                                shadow-sm
                                hover:bg-indigo-500
                                focus-visible:outline
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3" >
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-500" aria-hidden="true"/>
                                </span>
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
        </>
    )
}

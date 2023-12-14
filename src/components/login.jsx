import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useData} from "../context/responseContext.jsx";


export function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const {responseData, setResponseData} = useData();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backendproject-bdya.onrender.com/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.status === 200) {
                setLogin(true); // Setze den Login-Erfolgsstatus auf true
                setResponseData(data)
                localStorage.setItem('responseData', JSON.stringify(data))
                console.log(responseData)
            } else {
                setError(data.answer.message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [login, setLogin] = useState(false);
    const navigate = useNavigate()

    const [error, setError] = useState("")

    if (login) {
        navigate("/dashboard")
    }

    return (
        <>
            <div className="h-screen w-full bg-gray-900">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Logge
                            dich ein!</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email
                                    Addresse</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" required
                                           value={credentials.email} onChange={handleInputChange}
                                           className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-white">Passwort</label>

                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password"
                                           value={credentials.password} onChange={handleInputChange}
                                           required
                                           className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Einloggen
                                </button>
                            </div>
                            {error && (
                                <div className="">
                                    <p className="w-full text-center text-rose-900">{error}</p>
                                </div>
                            )}
                        </form>
                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="px-6 text-white bg-gray-900">Oder melde dich hiermit an</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <a href="#"
                                   className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path
                                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Twitter</span>
                                </a>

                                <a href="#"
                                   className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">GitHub</span>
                                </a>
                            </div>
                            <p className="mt-10 text-center text-sm text-gray-400">
                                Noch kein Konto vorhanden?
                                <Link to={"/register"}
                                   className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"> Melde dich
                                    hier an!</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
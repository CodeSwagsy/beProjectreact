import {useData} from "../context/responseContext.jsx";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export function Dashboard() {
    const [token, setToken] = useState()
    const navigate = useNavigate()
    const [login, setLogin] = useState(true);
    const [tokenError, setTokenError] = useState("")
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backendproject-bdya.onrender.com/user/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: responseData.answer.data.email,
                    firstName: firstName,
                    lastName: lastName
                }),
            });

            const data = await response.json();


        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backendproject-bdya.onrender.com/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: responseData.answer.data.email,
                }),
            });
            const data = await response.json();
            setResponseData({})
            setLogin(false);
            navigate("/login");

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = () => {
        setResponseData({})
        setLogin(false);
        navigate("/login");
    };

    const handleInputChange = (e) => {
        const {value} = e.target;
        setToken(value);
        console.log(responseData)
    };

    if (!login) {
        navigate("/login")
    }
    const {responseData, setResponseData} = useData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backendproject-bdya.onrender.com/user/all/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });

            const data = await response.json();
            if (response.status === 200) {
                setTokenError("")
                setUsers(data)
            } else {
                setTokenError(data.answer.message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const changeHandler = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        const storedResponseData = localStorage.getItem('responseData');
        if (storedResponseData) {
            setResponseData(JSON.parse(storedResponseData));
        }
    }, []);


    return (
        <>
            <div className="h-screen w-full bg-gray-900">
                <div className="flex justify-center items-center min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Willkommen {responseData && responseData.answer && responseData.answer.data && responseData.answer.data.firstName}
                        {' '}
                        {responseData && responseData.answer && responseData.answer.data && responseData.answer.data.lastName}
                    </h1>
                    <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white">
                        Du bist nun eingeloggt.
                    </h2>
                    <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white">
                        Dein letzter Login war am: {responseData && responseData.answer && responseData.answer.data && responseData.answer.data.lastLogin}
                    </h2>
                    <form onSubmit={handleFormSubmit}
                          className="bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 flex flex-col justify-center">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName"
                                           className="block text-sm font-medium leading-6 text-white">Vorname ändern:
                                    </label>
                                    <div className="mt-2">
                                        <input type="text" name="firstName" id="firstName" value={firstName} onChange={handleFirstNameChange}


                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName"
                                           className="block text-sm font-medium leading-6 text-white">Nachname ändern
                                    </label>
                                    <div className="mt-2">
                                        <input type="text" name="lastName" id="lastName" value={lastName} onChange={handleLastNameChange}


                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button value="submit" id="submit"
                                    className="w-full flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Änderung absenden
                            </button>
                        </div>
                    </form>
                    <div>
                        <button value="logout" id="logout" onClick={handleLogout}
                                className="mt-4 flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Ausloggen
                        </button>
                    </div>
                    <div>
                        <button value="deleteUser" id="deleteUser" onClick={handleDelete}
                                className="mt-4 flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Benutzer löschen
                        </button>
                    </div>
                    <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-white">Möchtest du
                        weitere Nutzer angezeigt bekommen?</h2>
                    <form onSubmit={handleSubmit} className="flex justify-center flex-col">
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-center text-white">Super geheimes
                                Token? (12345678)</label>
                            <div className="mt-2">
                                <input id="Token" name="Token" type="Token" autoComplete="Token"
                                       value={token} onChange={handleInputChange}
                                       className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <button value="getUsers" id="getUsers"
                                className="flex justify-center rounded-md mt-2 bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Weitere
                            Nutzer abfragen
                        </button>
                    </form>
                    {tokenError && (
                        <div className="">
                            <p className="w-full text-center text-rose-900">{tokenError}</p>
                        </div>
                    )}
                    {users.map((user, index) => {
                        return (
                            <div key={index}
                                 className="w-full lg:w-1/2 border-2 border-collapse text-white flex justify-center items-center gap-4 p-2 lg:p-4 lg:m-2">
                                <div className="w-full flex items-center">
                                    <p className="font-bold">Vorname:</p>
                                    <p className="ml-2">{user.firstName}</p>
                                </div>
                                <div className="w-full flex items-center">
                                    <p className="font-bold">Nachname:</p>
                                    <p className="ml-2">{user.lastName}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
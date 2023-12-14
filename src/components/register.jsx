import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

export function Register() {

    const [credentials, setCredentials] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const [passwordError, setPasswordError] = useState("")

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);


    const handlePasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    useEffect(() => {
        if (credentials.password && passwordCheck) {
            setPasswordsMatch(credentials.password === passwordCheck);
        } else {
            setPasswordsMatch(false);
        }
    }, [credentials.password, passwordCheck]);

    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleAbort = () => {
        navigate("/login")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordsMatch) {
            setPasswordError("Die beiden Passwörter stimmen nicht überein.");
        } else {
            setPasswordError("");
            try {
                const response = await fetch('https://backendproject-bdya.onrender.com/user/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();
                if (response.status === 200) {
                    navigate("/signedup")
                } else {
                    setError(data); // Fehlermeldung aus der Response setzen
                }
            } catch (error) {
                setError("Es ist ein Fehler aufgetreten: " + error.message);
            }
        }
    }

    return (
        <>
            <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Gib hier
                        deine
                        Nutzerdaten ein</h2>
                </div>
                <div className="container xl:w-1/2 2xl:w-1/4 mx-auto">
                    <form onSubmit={handleSubmit}
                          className="bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 flex flex-col justify-center">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName"
                                           className="block text-sm font-medium leading-6 text-white">Vorname
                                    </label>
                                    <div className="mt-2">
                                        <input type="text" name="firstName" id="firstName" value={credentials.firstName}
                                               onChange={handleInputChange}
                                               autoComplete="given-name"
                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName"
                                           className="block text-sm font-medium leading-6 text-white">Nachname
                                    </label>
                                    <div className="mt-2">
                                        <input type="text" name="lastName" id="lastName" value={credentials.lastName}
                                               onChange={handleInputChange}
                                               autoComplete="family-name"
                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-white">Email
                                        Adresse</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" autoComplete="email"
                                               value={credentials.email} onChange={handleInputChange}
                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-white">Passwort</label>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" autoComplete="password"
                                               value={credentials.password} onChange={handleInputChange}
                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Passwort wiederholen</label>
                                    <div className="mt-2">
                                        <input id="passwordcheck" name="passwordcheck" type="password"
                                               value={passwordCheck} onChange={handlePasswordCheckChange}
                                               autoComplete="password"
                                               className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                            </div>
                            {passwordError && (
                                <div className="">
                                    <p className="w-full text-center text-rose-900">{passwordError}</p>
                                </div>
                            )}
                            {error && error.errors && Array.isArray(error.errors) ? (
                                error.errors.map((errorMsg, index) => (
                                    <div key={index} className="">
                                        <p className="w-full text-center text-rose-900">{errorMsg.msg}</p>
                                    </div>
                                ))
                            ) : (
                                error && error.answer && (
                                    <div className="">
                                        <p className="w-full text-center text-rose-900">{error.answer.message}</p>
                                    </div>
                                )
                            )}
                        </div>
                        <div
                            className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                            <button type="button" className="text-sm font-semibold leading-6 text-white"
                                    onClick={handleAbort}>Abbrechen
                            </button>
                            <button type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrieren
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
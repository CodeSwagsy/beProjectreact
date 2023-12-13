
import {useNavigate} from "react-router-dom";

export function SignedUp() {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate("/login"); // Navigiert zurück zur Login-Seite
    };

    return (
        <>
            <div className="h-screen w-full bg-gray-900">
                <div className="flex justify-center items-center min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Du hast dich
                        erfolgreich registriert!
                    </h1>
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Jetzt einloggen?</h2>
                    <div>
                        <button value="logout" id="logout" onClick={handleLogout}
                                className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Einloggen
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
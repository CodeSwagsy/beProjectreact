import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Login} from "./components/login.jsx";
import {Register} from "./components/register.jsx";
import {Dashboard} from "./components/dashboard.jsx";
import {ResponseDataProvider} from "./context/responseContext.jsx";
import {SignedUp} from "./components/signedUp.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Login/>}/>
            <Route path="/home" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/start" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/signedup" element={<SignedUp/>}/>
            <Route path="/*" element="404 - Seite nicht vorhanden"/>
        </Route>,
    )
);


function App() {

    return (
        <>
            <ResponseDataProvider>
                <RouterProvider router={router}/>
            </ResponseDataProvider>
        </>
    )
}

export default App

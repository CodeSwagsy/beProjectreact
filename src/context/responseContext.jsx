import React, { createContext, useContext, useState } from 'react';

// Erstelle einen neuen Context
const ResponseDataContext = createContext();

// Definiere einen Context-Provider
export const ResponseDataProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);

    return (
        <ResponseDataContext.Provider value={{ responseData, setResponseData }}>
            {children}
        </ResponseDataContext.Provider>
    );
};

// Deklariere die useData-Funktion außerhalb des ResponseDataProvider
export function useData() {
    return useContext(ResponseDataContext);
}
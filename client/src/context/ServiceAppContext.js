import React, { useContext } from 'react';
import * as services from '../services/construction-service';

const ServiceAppContext = React.createContext();

export const useServiceContext = () => {
    return useContext(ServiceAppContext);
}

export const ServiceProvider = ({children}) => {
    return (
        <ServiceAppContext.Provider value={services}>
            {children}
        </ServiceAppContext.Provider>
    )
}
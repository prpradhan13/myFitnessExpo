import { useContext, createContext, useState, ReactNode } from 'react';
import { UserDataResponse } from '../types/types';
import { useUserQuery } from '../utils/userQuery';
import { useAuth } from '@clerk/clerk-expo';

const UserContext = createContext<UserDataResponse | {}>({});

interface UserProviderProps {
    children: ReactNode; // Explicitly define the type of `children`
}

export default function UserProvider({ children }: UserProviderProps){
    const { userId } = useAuth();
    const { data } = useUserQuery(userId!);

    // Ensure data is passed correctly, handling cases when it's undefined
    const userData = data || {};

    return (
        <UserContext.Provider value={{userData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserData = () => useContext(UserContext);
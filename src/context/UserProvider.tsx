import { useContext, createContext, useState, ReactNode } from 'react';
import { UserDataResponse } from '../types/types';
import { useUserQuery } from '../utils/userQuery';
import { useAuth } from '@clerk/clerk-expo';

const UserContext = createContext<UserDataResponse | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode; // Explicitly define the type of `children`
}

export default function UserProvider({ children }: UserProviderProps){
    const { userId } = useAuth();
    const { data } = useUserQuery(userId!);

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserData = () => useContext(UserContext);
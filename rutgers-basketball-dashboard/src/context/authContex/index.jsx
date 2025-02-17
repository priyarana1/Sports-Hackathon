import {auth} from '../../firebase/firebase';
import React, {useState, useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";


const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe;
    
    },[])
    async function initializeUser(user) {
        if (user) {
            setCurrentUser({...user});
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }
    const value = {
        currentUser,
        userLoggedIn,
        loading,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


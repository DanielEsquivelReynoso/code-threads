import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// actual value you want to access elsewhere in the application
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser };

  // The empty dependency array means that the useEffect only runs
  // once when the component mounts.
  useEffect(() => {
    // when a user signs in or out, that is a change in the authentication state
    // permanently open listener
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
// UserContext.tsx (or .js)
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "./config";
// 1. Define the shape of your context's data
type UserContextType = {
  firebaseUser: FirebaseUser | null;
};
// 2. Create the context with a default value
export const UserContext = createContext<UserContextType>({
  firebaseUser: null,
});
// 3. Provide the context to the rest of the app
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    // onAuthStateChanged sets up a listener that triggers whenever
    // the user signs in or out (or when the auth state changes).
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={{ firebaseUser }}>
      {children}
    </UserContext.Provider>
  );
};

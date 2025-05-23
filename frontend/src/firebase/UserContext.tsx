// UserContext.tsx (or .js)
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "./config";
import { fetchMongoData, MongoUser } from "./userAPI.ts";
// Define the shape of your context's data
type UserContextType = {
  firebaseUser: FirebaseUser | null;
  mongoUser: MongoUser | null;
};
// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  firebaseUser: null,
  mongoUser: null,
});
// Provide the context to the rest of the app
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
  useEffect(() => {
    // onAuthStateChanged sets up a listener that triggers whenever
    // the user signs in or out (or when the auth state changes).
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      console.log("Firebase user:", user);

      if (user) {
        try {
          const token = await user.getIdToken();
          const fetched = await fetchMongoData(token);

          if (fetched) {
            setMongoUser(fetched);
            console.log("Mongo user loaded:", fetched);
          } else {
            console.log("Mongo user not found");
            setMongoUser(null);
          }
        } catch (err) {
          console.error("Error fetching Mongo user:", err);
        }
      } else {
        setMongoUser(null);
      }
    });
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider value={{ firebaseUser, mongoUser }}>
      {children}
    </UserContext.Provider>
  );
};

import { User } from "firebase/auth";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../utils/firebase";

type AuthData = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<{ user: User | null }>>;
  authLoading: boolean;
};

const AuthUserContext = createContext<AuthData | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ user: User | null }>({ user: null });
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser({ user: userAuth });
      } else {
        setUser({ user: null });
      }
      setAuthLoading(false); 
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (authLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthUserContext.Provider value={{ user: user.user, setUser, authLoading }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthUserProvider");
  }
  return context;
};

export default AuthUserProvider;

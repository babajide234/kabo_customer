import { createContext, useState, useContext } from 'react';

const DEFAULT_STATE = {
  loggedIn: false,
  user: undefined,
  loading: false,
  error: undefined,
};

const UserContext = createContext(DEFAULT_STATE);
const SiteContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [ sidebar , setSidebar ] = useState(false);
    const [user, setUser] = useState(null);

    const val = {
      sidebar,
      setSidebar
    }
    
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <SiteContext.Provider value={val}>
          {children}
        </SiteContext.Provider>
      </UserContext.Provider>
    );
};
export const useSite = () => useContext(SiteContext);
const useAuth = () => useContext(UserContext);

export default useAuth;

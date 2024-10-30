import SendRequest from "@/utils/SendRequest";
import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      let userPayload = {};

      if (!token) {
        setUser({});
        // save current url
        localStorage.setItem("redirectUrl", window.location.pathname);

        // redirect to login page
        setLoading(false);
        window.location.href = "/login";
      } else {
        try {
          const res = await SendRequest("GET", "api/users/me");
          if (res.payload) {
            userPayload = res.payload;
            setLoading(false);
          } else {
            // save current url
            localStorage.setItem("redirectUrl", window.location.pathname);

            // redirect to/login page
            setLoading(false);
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("Error during fetching user data:", error);
          setLoading(false);
        }
      }
      setUser(userPayload);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ currentUser: user }}>
      {loading ? (
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

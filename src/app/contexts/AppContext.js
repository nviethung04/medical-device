import SendRequest from "@/utils/SendRequest";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") || "";
      let userPayload = {};

      if (!token) {
        setUser({});
        // save current url
        localStorage.setItem("redirectUrl", window.location.pathname);

        // redirect to login page
        window.location.href = "/login";
      } else {
        try {
          const res = await SendRequest("GET", "api/users/me");
          if (res.payload) {
            userPayload = res.payload.user;
          } else {
            // save current url
            localStorage.setItem("redirectUrl", window.location.pathname);

            // redirect to login page
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("Error during fetching user data:", error);
        }
      }
      setUser(userPayload);
    };

    fetchData();
  }, []);

  return <AppContext.Provider value={{ currentUser: user }}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}

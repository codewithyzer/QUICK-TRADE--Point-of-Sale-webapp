import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated, refresh_token } from "../endpoints/api";
import { login } from "../endpoints/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signupStatus, setSignupStatus] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      let res = await is_authenticated();
      console.log(res.authenticated);

      if (res.authenticated) {
        setUser(res.user);
        setAuthenticated(true);
      } else {
        throw new Error("Not authenticated");
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.code === "token_not_valid"
      ) {
        try {
          const refreshRes = await refresh_token();
          if (refreshRes.refreshed) {
            const retryRes = await is_authenticated();
            if (retryRes.authenticated) {
              setUser(retryRes.user);
              setAuthenticated(true);
              return;
            }
          }
        } catch (refreshError) {
          console.error("Refresh failed", refreshError);
        }
      }
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [window.location.pathname]);

  const login_user = async (username, password) => {
    const response = await login(username, password);
    if (response.success) {
      await checkAuth();
      setAuthenticated(true);
      navigate("/home");
    } else {
      navigate("/signin/status");
      // alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        login_user,
        setUser,
        setAuthenticated,
        signupStatus,
        setSignupStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

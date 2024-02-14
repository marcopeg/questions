import { createContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useEmitter, useResetCache } from "..";
import { jwtDecode, getURLParam } from "../../utils";
import { SIGNIN_WITH_CODE } from "./queries";

export const AuthContext = createContext();

export const withAuth = (Component) => (props) => {
  const emitter = useEmitter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [hasura, setHasura] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState(null);
  const resetCache = useResetCache();
  const [signinWithCode] = useMutation(SIGNIN_WITH_CODE);

  const applyToken = (_token) => {
    // Read the token:
    const _payload = jwtDecode(_token);
    const _hasura = _payload["https://hasura.io/jwt/claims"];
    const _roles = _hasura["x-hasura-allowed-roles"];
    const _user = _hasura["x-hasura-user-id"];

    if (!_user) {
      logout(new Error("You have an old token that is not valid anymore!"));
      return;
    }

    setHasura(_hasura);
    setRoles(_roles);
    setUser(_user);

    // Apply the role from localStorage with a default on the JWT contents:
    const _role = localStorage.getItem("babelify.auth.role");
    setRole(_roles.includes(_role) ? _role : _hasura["x-hasura-default-role"]);

    setToken(_token);
  };

  const login = async (token) => {
    try {
      setError(null);
      emitter.pub("loadable::show");
      localStorage.setItem("babelify.auth.token", token);
      localStorage.removeItem("babelify.auth.role");
      applyToken(token);
    } catch (err) {
      logout();
      setError(err);
    } finally {
      setTimeout(() => emitter.pub("loadable::hide"), 1000);
    }
  };

  const logout = (customError = null) => {
    resetCache();
    localStorage.removeItem("babelify.auth.token");
    localStorage.removeItem("babelify.auth.role");
    setToken(null);
    setHasura(null);
    setError(customError);
    setRole(null);
    setRoles(null);
  };

  const switchRole = (to) => {
    // Same role, ignore
    if (to === role) return;

    // Role not allowed, throws
    if (!roles.includes(to)) {
      throw new Error("role not allowed!");
    }

    // Make the switch
    emitter.pub("loadable::show");
    localStorage.setItem("babelify.auth.role", to);
    setRole(to);
  };

  // Login via MagicLink or LocalStorage
  useEffect(() => {
    // Login via InviteID
    try {
      const code = getURLParam("mlink");
      if (code) {
        signinWithCode({
          variables: {
            code
          },
          onCompleted: ({ action }) => {
            console.log({ action });
            if (action[0].name === "failed") {
              setError(new Error(action[0].data.errorMessage));
              return;
            }

            setError(null);
            login(action[0].data.jwt_token);

            // BUG: In production it doesn't show the
            //      page after login with magic link!
            //      This is a short-time fix but I still
            //      haven't found out the real problem.
            setTimeout(() => location.reload(true));
          },
          onError: (err) => {
            logout();
            setError(err);
          }
        });
        return;
      }
    } catch (err) {
      setError(err);
      console.log(`mlink: ${err.message}`);
      return;
    }

    // Restore login from LocalStorage
    try {
      // Fetch the token:
      const _token = localStorage.getItem("babelify.auth.token");
      if (!_token) return;

      // Implement the token:
      applyToken(_token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        token,
        hasura,
        error,
        setError,
        role,
        roles,
        user,
        login,
        logout,
        switchRole
      }}
    >
      <Component {...props} />
    </AuthContext.Provider>
  );
};

import { create } from "domain";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { appRoutes, ROLE } from "../routes/app";

const AuthProviderContext = () => {
  const [user, setUser] = useState<{ name: string; role: ROLE[] } >({ name: "", role: [] });
  const { pathname, push } = useRouter();

  const login = () => {
    fetch("https://f18c0fb5-5ec2-4035-92da-bed37398be71.mock.pstmn.io/login", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    const route = appRoutes.find((route) => route.path === pathname);

    if (!route?.roles.includes(ROLE.PUBLIC)) {
      if (!user.name) {
        push("/login");
      } else if (!route?.roles?.some((role) =>user.role.includes(role))) {
        push("/401");
      }
    }
  }, [user, pathname]);

  return {
    login,
    user
  };
};
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
function AuthProvider({ children }) {
  const auth = AuthProviderContext();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

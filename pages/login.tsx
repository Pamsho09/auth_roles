import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { login, user } = useAuth() as any;
  const { push } = useRouter();

  useEffect(() => {
    if (!!user.name) {
      push("/dashboard");
    }
  }, [user]);
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;

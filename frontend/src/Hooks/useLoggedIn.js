import { useEffect, useState } from "react";

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  console.log("Hello", loggedIn);

  return { loggedIn, setLoggedIn };
}

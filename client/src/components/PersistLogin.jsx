import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const thereIsAccessToken = auth?.accessToken;
    const signOut = async () => {
      await logout();
      navigate("/login");
    };
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (effectRan.current === true || import.meta.env.PROD) {
      if (persist) {
        // Persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !thereIsAccessToken ? verifyRefreshToken() : setIsLoading(false);
      }
    } else {
      if (!thereIsAccessToken) {
        signOut();
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  // First the elements in the DOM of this component are painted and if these elements include an outlet, all internal elements of the outlet will be painted. Subsequently, the useEffect of the main component that contains the outlet will be executed and then the following useEffect of the internal components of the outlet.
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;

// import { Outlet } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";
// import useAuth from "../hooks/useAuth";

// const PersistLogin = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   useEffect(() => {
//     if (effectRan.current === true || import.meta.env.PROD) {
//       const verifyRefreshToken = async () => {
//         try {
//           await refresh();
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       // persist added here AFTER tutorial video
//       // Avoids unwanted call to verifyRefreshToken
//       !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
//     }
//     return () => {
//       effectRan.current = true;
//     };
//   }, []);

//   useEffect(() => {

//       console.log(`isLoading: ${isLoading}`);
//       console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);

//   }, [isLoading]);

//   return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
// };

// export default PersistLogin;

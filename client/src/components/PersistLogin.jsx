import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || import.meta.env.PROD) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      // persist added here AFTER tutorial video
      // Avoids unwanted call to verifyRefreshToken
      !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

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

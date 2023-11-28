import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const Authroute = () => {
  const user = useLoaderData();
  console.log(user);
  console.log("Authroute: check user");
  return (
    <>
      {!user.user || !user ? (
        <Navigate to={"/"} />
      ) : (
        <Outlet context={user.user} />
      )}{" "}
    </>
  );
};

export default Authroute;

import { useOutletContext } from "react-router-dom";
import "./loginform-modules.css";
import { motion } from "framer-motion";
const Profile = () => {
  const user = useOutletContext();
  console.log(user);
  const handleLogout = () => {
    window.open("http://localhost:3000/logout", "_self");
    localStorage.clear();
  };

  return (
    <>
      <div className="title">
        <h1>Profile</h1>
      </div>
      <motion.div
        className="contact"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="form">
          <div className="form_area" style={{ height: "250px" }}>
            <form onSubmit={handleLogout}>
              <div className="align">
                <div className="profile_name">
                  <h1>Name:</h1>
                  <p>{user.username}</p>
                </div>

                <div className="profile_mail">
                  <h1>Email:</h1>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="form-button">
                <motion.button
                  className="btn"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Logout
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;

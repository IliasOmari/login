import { useState } from "react";
import "./loginform-modules.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const googleLogin = () => {
    localStorage.setItem("type", JSON.stringify("google"));
    window.open("https://loginapi-1lxz.onrender.com/auth/google");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://loginapi-1lxz.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == "Verifed") {
          console.log(data);
          localStorage.setItem("type", JSON.stringify("form"));
          localStorage.setItem("token", JSON.stringify(data.data.token));

          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            width: "450px",
            height: "100px",
          });

          window.location.href = "/profile";
          return;
        }

        return await Swal.fire({
          position: "top-end",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
          width: "450px",
          height: "100px",
        });
      });
  };
  return (
    <>
      <div className="title">
        <h1>Login</h1>
      </div>

      <div className="contact">
        <motion.div
          className="form"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="form_area" style={{ height: "500px" }}>
            <form onSubmit={handleLogin}>
              <div className="form_group">
                <label className="sub_title">Email</label>
                <input
                  type="text"
                  className="form_style"
                  name="email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form_group">
                <label className="sub_title">Password</label>
                <input
                  type="password"
                  className="form_style"
                  name="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-button">
                <motion.button
                  className="btn"
                  type="submit"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Log In
                </motion.button>
              </div>
              <p style={{ textAlign: "center" }}>Or</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.div
                  className="google-btn"
                  onClick={googleLogin}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src="https://blog.hubspot.com/hubfs/image8-2.jpg"
                  />
                  <p>Google</p>
                </motion.div>
              </div>
            </form>
            <div className="register">
              <p>
                You don{"'"}t have an account yet?
                <Link to={"/register"}>
                  <span>Register</span>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginForm;

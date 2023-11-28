import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  function handleRegister(e) {
    e.preventDefault();
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status == "bad request") {
          return await Swal.fire({
            position: "top-end",
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            width: "450px",
            height: "100px",
          });
        }

        if (data.data) {
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account successfuly created",
            showConfirmButton: false,
            timer: 2000,
            width: "450px",
            height: "100px",
          });
          window.location.href = "/";
        }
      });
  }
  return (
    <>
      <div className="title">
        <h1>Register</h1>
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
          <div className="form_area" style={{ height: "500px" }}>
            <form onSubmit={handleRegister}>
              <div className="form_group">
                <label className="sub_title">Full name</label>
                <input
                  type="text"
                  className="form_style"
                  name="username"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

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
                  Sign Up
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Register;

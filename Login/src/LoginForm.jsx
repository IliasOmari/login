import "./loginform-modules.css";

const LoginForm = () => {
  return (
    <>
      <div className="title">
        <h1>Login</h1>
      </div>

      <div className="contact">
        <div className="form">
          <div className="form_area">
            <form>
              <div className="form_group">
                <label className="sub_title">Email</label>
                <input
                  type="text"
                  className="form_style"
                  id="name"
                  name="user_name"
                  //   value={inputs.user_name}
                  //   onChange={(e) =>
                  //     setInputs((prev) => ({
                  //       ...prev,
                  //       [e.target.name]: e.target.value,
                  //     }))
                  //   }
                />
              </div>

              <div className="form_group">
                <label className="sub_title">Password</label>
                <input
                  type="email"
                  className="form_style"
                  id="email"
                  name="user_email"
                  //   value={inputs.user_email}
                  //   onChange={(e) =>
                  //     setInputs((prev) => ({
                  //       ...prev,
                  //       [e.target.name]: e.target.value,
                  //     }))
                  //   }
                />
              </div>
              <div className="form-button">
                <button
                  className="btn"
                  type="submit"
                  //   value="Send"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

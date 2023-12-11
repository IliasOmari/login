const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const googleRoute = require("./google");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const users = [];
require("./passport");
app.use(
  cors({
    origin: "https://loginsystem-51fq.onrender.com/",
    credentials: true,
  })
);

app.use(
  session({
    name: "session",
    secret: "ilias",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 100,
    },
  })
);

app.use(express.json());

app.use(passport.session());
app.use(passport.initialize());

app.use("/auth", googleRoute);

app.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      status: "bad request",
      message: "Missing username, mail, password",
    });
    return;
  }

  if (users.find((el) => el.email == req.body.email)) {
    res.status(400).send({
      status: "bad request",
      message: "User with these email already exists",
    });
    return;
  }

  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      id: uuidv4(),
    };

    users.push(user);
    //send back response when user is saved
    res.status(201).send({
      status: "Saved",
      message: "Your account has been successfully created",
      data: user,
    });
    return;
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      value: error,
    });
  }
});

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      status: "bad request",
      message: "Missing mail, password",
    });
    return;
  }
  try {
    const user = users.find((el) => el.email == req.body.email);
    if (!user) {
      res.status(400).send({
        status: "bad request",
        message: "No account with this email! Make sure you register first.",
      });
      return;
    }
    //If a user is found but the password is wrong, send back an appropiate error
    if (user.password !== req.body.password) {
      res.status(400).send({
        status: "bad request",
        message: "Incorrect password for this email",
      });
      return;
    }
    const token = jwt.sign({ user }, process.env.SECRET);
    res.status(200).send({
      status: "Verifed",
      message: "You are successfully logged in!",
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "An error has occured!",
      value: error,
    });
  }
});

app.get("/dataToken", passport.authenticate("jwt"), (req, res) => {
  console.log(req.user);
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: "NOT AUTHORIZED" });
  }
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173/");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

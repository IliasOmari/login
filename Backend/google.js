const router = require("express").Router();

const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/failed",
    successRedirect: "http://localhost:5173/profile",
  })
);
router.get("/google/failed", (req, res) => {
  res.send(401).json({
    message: "Oops problem",
  });
});

router.get("/google/success", (req, res) => {
  if (req.user) {
    const user = {
      username: req.user.displayName,
      email: req.user.emails[0].value,
    };
    return res.status(200).json({ user });
  } else {
    return res.status(401).json({ message: "NOT AUTHORIZED" });
  }
});

module.exports = router;

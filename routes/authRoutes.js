const router = require("express").Router();
const { registerController, loginController, changePasswordController, getUserDataController } = require("../controllers/authController");
const { protectedRoute } = require("../middleware/authMiddleware");


router.post("/register",registerController )

router.post("/login",loginController );

router.post("/change-password",changePasswordController );
router.get("/get-user",protectedRoute,getUserDataController ); 

module.exports = router;
const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");

router.post('/register',  
authControllers.controllers.Register
);

router.post('/login',  
authControllers.controllers.Login
);

module.exports = router;
const router = require('express').Router();
const { login, register, setAvatar } = require('../controllers/userController.js');

router.post("/register", register);
router.post("/login", login);
router.post('/set_avatar/:id', setAvatar);
router.get('/all-users/:id',)

module.exports = router;
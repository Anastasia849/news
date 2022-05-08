const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { findUserByLogin, createNewUser } = require('../db/query/user');
const { body } = require('express-validator');
const Role = require('../constants/roles');

const SALT = 5;

/* POST registration */
router.post('/', 
    [
        body('login').isLength({ min: 6 }),
        body('password').isLength({ min: 6 }),
        body('fullName').isString(),
    ],
    async function (req, res, next) {
        try {
            const { login, password } = req.body;

            const isBusyLogin = !!(await findUserByLogin(login));

            if (isBusyLogin) {
                return res.status(400).json({
                    messageStatus: 'USER_ALREADY_EXIST',
                });
            }

            const isModerator = password.includes(process.env.MODERATOR_SUBPASSWORD);

            const hashPassword = await bcrypt.hash(password, SALT);

            await createNewUser({
                login,
                password: hashPassword,
                role: isModerator ? Role.MODERATOR : Role.USER,
            });

            return res.json({ messageStatus: 'USER_CREATE' });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
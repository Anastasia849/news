const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware")


router.get('/', authMiddleware, async (req, res, next) => {
    const users = await User.find({}).exec();

    res.send(users);
});

router.post('/registration', [
    check("login", "Никнейм должен быть длиннее 4 и меньше 23 символов").isLength({ min: 4, max: 23 }),
    check("password", "Пароль должен быть длиннее 3 и меньше 12 символов").isLength({ min: 3, max: 12 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорректный запрос", errors })
        }
        const { login, password } = req.body;

        const potentialUser = await User.findOne({ login });

        if (potentialUser) {
            return res.status(400).json({ message: `Пользователь с ником ${login} уже существует` })
        }

        const hashPassword = await bcrypt.hash(password, 4)
        const user = new User({ login, password: hashPassword, role: 'User' });
        await user.save();
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_CODE)
        return res.json({ message: "Пользователь был успешно создан", token, user })

    }
    catch (e) {
        console.log(error);
        return res.status(500).json(e);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        const potentialUser = await User.findOne({ login });

        if (!potentialUser) {
            return res.status(404).json({ message: `Такой пользователь не существует` })
        }
        const isPassValid = bcrypt.compareSync(password, potentialUser.password);
        if (!isPassValid) {
            return res.status(400).json({ message: "Пароль введён неверно" })
        }

        const token = jwt.sign({ id: potentialUser.id, role: potentialUser.role }, process.env.SECRET_CODE)
        return res.json(
            {
                token,
                user: {
                    id: potentialUser.id,
                    login: potentialUser.login,
                    role: potentialUser.role
                }
            }
        )
    }
    catch (e) {
        console.log(error);
        return res.status(500).json(e);
    }
})

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })

        if (!user) {
            return res.status(404).json({ message: `Пользователь не найден` })
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_CODE)
        return res.json(
            {
                token,
                user: {
                    id: user.id,
                    login: user.login,
                    role: user.role
                }
            }
        )
    }
    catch (e) {
        console.log(error);
        return res.status(500).json(e);
    }
})

router.put('/:login/role', authMiddleware, async (req, res) => {
    try {
        const targetUser = await User.findOne({ login: req.params.login })
        if(!targetUser){
            return res.status(404).json({ message: `Пользователь не найден` })
        }
        targetUser.role = req.body.role
        targetUser.save()
        return res.json({ message: "Права успешно изменены" })

    } catch (error) {
        console.log(error);
        return res.status(500).json(e);
    }
})



module.exports = router;
const User = require('../../db/models/User');
const express = require('express');
const router = express.Router();
const NewsLog = require('../../db/models/NewsLog');
const authMiddleware = require("../../middlewares/auth.middleware")


router.get('/', authMiddleware, async (req, res, next) => {
    const logs = await NewsLog.find({}).exec();

    res.send(logs);
});

router.post('/:id/write', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const { category, source, url } = req.body

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: `Пользователя с таким id не существует` })
        }

        const newLog = new NewsLog({ userId: id, category, source, url })

        await newLog.save();

        return res.json({ message: "Новый лог успешно создан", log: newLog })
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})

router.get("/:id/log", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(400).json({ message: `Пользователя с таким id не существует` })
        }

        const log = await NewsLog.find({userId: id})

        return res.json(log)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);        
    }
}) 


module.exports = router;
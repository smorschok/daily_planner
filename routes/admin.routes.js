const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware")
const User = require("../models/User");
const router = Router();
const Note = require("../models/Note");

router.get("/", auth,admin, async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.get("/:id", auth,admin, async (req, res) => {
  
  try {
    const data = req.params.id
    const user = await User.findOne({_id:data}).populate('owner');
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/delete", auth,admin, async (req, res) => {
  try {
    const data = req.body;

    if (data.length === 0) {
      return res.status(400).json({ message: "Пользователи не выбраны" });
    }
    if (data.length === 1) {
    await User.deleteOne({ _id: { $in: data } });
  await Note.deleteMany({owner: { $in: data } })
      return res.status(200).json({ message: "Пользователь и его заметки удалены" });
    }

    await User.deleteMany({ _id: { $in: data } });
    await Note.deleteMany({owner: { $in: data } })    
    
    res.status(200).json({ message: "Пользователи и их заметки удалены" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/block", auth,admin, async (req, res) => {
  try {
    const data = req.body;

    if (data.length === 0) {
      return res.status(400).json({ message: "Пользователи не выбраны" });
    }
    if (data.length === 1) {
      await User.updateOne({ _id: { $in: data } }, { block: true });
      return res.status(200).json({ message: "Пользователь заблокирован" });
    }

    await User.updateMany({ _id: { $in: data } }, { block: true });
    res.status(200).json({ message: "Пользователи заблокированы" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/unlock", auth,admin, async (req, res) => {
  try {
    const data = req.body;

    if (data.length === 0) {
      return res.status(400).json({ message: "Пользователи не выбраны" });
    }
    if (data.length === 1) {
      await User.updateOne({ _id: { $in: data } }, { block: false });
      return res.status(200).json({ message: "Пользователь разблокирован" });
    }

    await User.updateMany({ _id: { $in: data } }, { block: false });
    res.status(200).json({ message: "Пользователи разблокированы" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/add_admin", auth,admin, async (req, res) => {
  try {
    const data = req.body;

    if (data.length === 0) {
      return res.status(400).json({ message: "Пользователи не выбраны" });
    }
    if (data.length === 1) {
      await User.updateOne({ _id: { $in: data } }, { admin: true });
      return res.status(200).json({ message: "Пользователю даны права админа" });
    }

    await User.updateMany({ _id: { $in: data } }, { admin: true });
    res.status(200).json({ message: "Пользователям даны права админа" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/remove_admin", auth,admin, async (req, res) => {
  try {
    const data = req.body;

    if (data.length === 0) {
      return res.status(400).json({ message: "Пользователи не выбраны" });
    }
    if (data.length === 1) {
      await User.updateOne({ _id: { $in: data } }, { admin: false });
      return res.status(200).json({ message: "У пользователя убраны права админа" });
    }

    await User.updateMany({ _id: { $in: data } }, { admin: false });
    res.status(200).json({ message: "У пользователей убраны права админа" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});


module.exports = router;

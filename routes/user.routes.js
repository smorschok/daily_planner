const { Router } = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const data = await Note.find({ owner: req.user.userId }).sort({
      year: 1,
      month: 1,
      day: 1,
      hour: 1,
    });
  
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
router.post("/show", auth, async (req, res) => {
  try {
    const data = req.body;
    const getIntervalDates = data.map((i) => {
      return {
        year: { $in: i.year },
        month: { $in: i.month },
        day: { $in: i.days },
      };
    });

    const date = await Note.find({
      $or: getIntervalDates,
      owner: req.user.userId,
    }).sort({ year: 1, month: 1, day: 1, hour: 1 });

    res.json(date);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/status", auth, async (req, res) => {
  const user = await User.updateOne(
    { _id: req.user.userId },
    { active: false }
  );
  res.status(200).json('OK')

});

module.exports = router;

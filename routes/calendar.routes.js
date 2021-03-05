const { Router } = require("express");
const Note = require("../models/Note");
const User = require("../models/User");

const router = Router();
const auth = require('../middleware/auth.middleware')
router.post("/",auth, async (req, res) => {
  try {
    const { year, month, day, hour, text } = req.body;

    const getNote = await Note.findOne({
      year: year,
      month: month,
      day: day,
      hour: hour,
      owner:req.user.userId
    });

    if (getNote) {
      await getNote.updateOne({ $set: { text: text } });
    } else {
      const result = new Note({
        year: year,
        month: month,
        day: day,
        hour: hour,
        text: text,
        owner:req.user.userId
      });
      await result.save();

         await User.findOneAndUpdate({_id:req.user.userId},{$push:{owner:result._id}})

    }
    


    res.status(200).json({ message: "Заметка добавлена" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/note",auth, async (req, res) => {
  try {
    const { getYear, getMonth } = req.body;
    const date = await Note.find({ year: getYear, month: getMonth,owner:req.user.userId }).sort({year:1,month:1,day:1,hour:1});

    res.json(date);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/delete",auth,async(req,res)=>{
  try {
    const{year,month,day,hour,text}=req.body
    const note = await Note.findOneAndDelete({year,month,day,hour,text})
    
    const user = await User.findByIdAndUpdate({_id:note.owner},{$pull:{owner:note._id}})
 
    res.status(200).json({message:'Заметка удалена'})
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });

  }
})
module.exports = router;

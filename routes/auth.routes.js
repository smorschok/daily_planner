const { Router } = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check,validationResult} = require('express-validator')
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
[
    check('email','Некорректный email').isEmail(),
    check('password','Минимальная длина пароля 6 символов').isLength({min:6})
],
  async (req, res) => {
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
             
                message:errors.array()[0].msg
            })
        }

        const{email,password} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message:'Такой пользователь существует'})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email,password:hashedPassword})
        await user.save()
        res.status(201).json({message: 'Вы зарегестрированы'})
    } catch (e) {

        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})

    }
  }
);

router.post(
    '/login',
    [check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите корректный пароль').exists()


],async(req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Некорректыне данные при входе в систему'
            })
        }

        const{email,password} = req.body
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Пользователь не найден'})


        }
        if(user.block){
            return res.status(400).json({message: 'Пользователь заблокирован'})

        }
       
        const isMatch = await bcrypt.compare(password,user.password)
          
        if(!isMatch){
           
            return res.status(400).json({message: 'Неверный пароль'})
        }
        await User.updateOne({email},{ lastLogin: new Date().toJSON(),active:true})
        const token = jwt.sign({userId:user.id},config.get('jwtSecret'))
        res.json({token,userId:user.id,admin:user.admin,user:user.email})
        
    } catch (e) {
        
    }
}
    )
module.exports = router
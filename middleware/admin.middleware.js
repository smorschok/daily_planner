const User = require('../models/User')
module.exports = async (req,res,next) =>{
    if(req.method === 'OPTIONS'){
        return next()
    }
        try {
            const admin = await User.findOne({_id:req.user.userId})
            if(admin.admin===false){
                return  res.status(403).json({message:'Нет доступа'})
              }
            next()
        } catch (e) {
            return  res.status(403).json({message:'Нет доступа'})
        }
    }

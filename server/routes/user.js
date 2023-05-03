const express=require('express');
const User = require('../models/User');
const generateAuthToken = require('../jwtTokenGenerator');
let router=express.Router();
let bcrypt
// signup karna
router.post('/register',async(req,res)=>{
    let user=req.body;
    let Email=User.findOne({email:user.email})
    if(Email){
        res.send('yeah pehale se prastut hai')
    }else{
        //new user ko create kro
        user.password=await bcrypt.hash(user.password, 10);//hash take 2 parameters one password and other salt rounds which is inversely proportional to the security
        let dbUser=new User({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            password:user.password,
        })
        await dbUser.save();
        res.send('new user ban geya');
    
    }
})

//login
router.post('/login',async(req,res)=>{
    let userFormData=req.body;
    let userDbData; //db se aya hua user ki information use karunga
    try{
        userDbData=User.findOne({
             where: {
                 email: userFormData.email
                    }
        })
    }
    catch(err){
        console.log("error",err);
    }
            if (!userDbData) {
            res.send('jao jao sign up karo');
            
            } else {
   let validatePass=bcrypt.compare(userFormData.password, userDbData.password)//compare takes 2 parameters password from input and saved password from user
   .catch((err)=>{
    res.send('err while performing pass match');
   })
   if (result == true) {
    let token=generateAuthToken(userDbData)
    console.log(token);
    res.send({
        data:{
            token:token,
            userDbData:userDbData
        },
        msg:'sab kuch sahi se ho geya'
    });
} else {
 res.send('Incorrect password');
//  res.redirect('/');
}

        }
     });
   



module.exports=router;
    
const User=require('../models/user');

module.exports = (router)=>{

router.post('/register',(req,res)=>{
    if(!req.body.email){
        res.json({success:false,message:'you must provide an e-mail'});
    }else{
if(!req.body.username){
    res.json({success:false,message:'you must provide a username'});
}else{
if(!req.body.password){
    res.json({success:false,message:'you must provide a password'});
}
else{
 let user= new User({
    email:req.body.email.toLowerCase(),
    username:req.body.username.toLowerCase(),
    password:req.body.password
 });
 user.save((err)=>{
    if(err){
        if(err.code === 11000){
res.json({success:false,message:'username or email already exists'});
        }else{
if(err.errors){
    if(err.errors.email){
        res.json({success:false,message:err.errors.email.message});
        }
        else{
            if(err.errors.username){
                res.json({success:false,message:err.errors.username.message});
                }
                else{
                    if (err.errors.password){
                res.json({success:false,message:err.errors.password.message});
                    }
                    else{
                        res.json({success:false,message:'could not save user.error: ',err});
                    }
                }
        }
}
        }
    }else{
        res.json({success:true,message:'user saved!'});
    }
 });
 
 
 
 
    // console.log(req.body);
    // res.send("hello world"); 

}
}
    
    }
    
    
    
    
});






    return router;
}



const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const bcrypt = require('bcrypt-nodejs');
const Schema =mongoose.Schema;


let emailLengthChecker =(email)=>{
if(!email){
    return false;
}else{
    if(email.length<5 || email.length>30){
        return false;
    }
    else{
        return true;
    }
}
};
let validEmailChecker=(email)=>{
if(!email){
    return false;
}else{
    const regExp=new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
}
};
const emailValidators=[{
     validator: emailLengthChecker,message:'email must be at least 5 characters but no more than 30 characters'
},{
    validator: validEmailChecker,message:'must be a valid email'
}]
//////////////////////////////////////////////////////////////////
let usernameLengthChecker = (username)=>{
    if(!username){
        return false;
    }
    else{
        if(username.length<3 || username.length>15){
            return false;
        }
        else{
            return true;
        }
    }
};

let validUsername=(username)=>{
if(!username){
    return false;
}else{
const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
return regExp.test(username);
}
};

const usernameValidators=[{
    validator:usernameLengthChecker,
    message:'username must be at least 3 characters but no more than 15'
},{
    validator:validUsername,
    message:'username must not have any special characters'
}]
////////////////////////////////////////////////////////////////////
let passwordLengthChecker=(password)=>{
    if(!password){
        return false;
    }
    else{
        if(password.length<8 ||password.length>35){
            return false;
        }
        else{
            return true;
        }
    }
};
let validPassword=(password)=>{
if(!password){
    return false;
}
else{
    const regExp= new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password);
}
};
const passwordValidators=[{
    validator:passwordLengthChecker,
    message:'password must be at least 8 characters but no more than 35'
},{
    validator:validPassword,
    message:'must have at least one uppercase, lowercase, special character, and number'
}];





const userSchema = new Schema({
email:{type:String,required:true,unique:true,lowercase:true,validate:emailValidators},
username:{type:String,required:true,unique:true,lowercase:true,validate:usernameValidators},
password:{type:String,required:true,validate:passwordValidators}
});

userSchema.pre('save',function (next){
if(!this.isModified('password'))
return next();

bcrypt.hash(this.password,null,null,(err,hash)=>{
    if(err) return next(err);
    this.password = hash;
    next();
});
});



userSchema.methods.comparePassword=(password)=>{
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User',userSchema);





// title: String,
// author: String,
// body: String,
// comments:[{body:String,date:Date}],
// date:{type:Date,default:Date.now},
// hidden: Boolean,
// meta:{
//     votes: Number,
//     favs: Number
// }
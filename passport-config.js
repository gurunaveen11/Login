const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt')

//const passport = require('passport');
//const passport = require('passport');

async function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser = async (email,password,done)=>{
        const user = getUserByEmail(email)
        console.log(user)
        if(user === null){
            return done(null,false,{message:'Invalid Credentials'})
        }

        try{
            if(await bcrypt.compare(password,user.password)){
                    return done(null,user);
            }else{
                return done(null,false,{message:'Invalid credentials'});
            }

        }catch(e){
            return done(null,false,{message:'Invalid credentials'});
        }
    }
    passport.use(new LocalStrategy({usernameField:'email' ,passwordField:'password'},authenticateUser));
    passport.serializeUser((user,done)=> done(null,user.id));
    passport.deserializeUser((id,done)=>{ 
        return done(null,getUserById(id))
    });
}


module.exports = initialize

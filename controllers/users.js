
let User=require('../models/listing/user.js');






module.exports.renderSignupForm=(req, res) => {
    res.render('users/signup.ejs')

}

module.exports.signupUser=async(req, res,next) => {
    
    try {    let { username, email, password } = req.body;

        let user = new User({
            username, email

        })
        let registerUser = await User.register(user, password);

        req.login(registerUser, (err) => {
        
            if(err) {
                return next(err)

            } 
            
                req.flash('success', 'welcome to new journey');
                res.redirect('/listing')
            

        })
    } catch (err) {
                        req.flash('success', err.message);


    }
}
module.exports.renderLoginForm=(req, res) => {
    res.render('users/login.ejs')

}

module.exports.loginUser=async (req, res) => {

    req.flash('success', 'continue your journey');
    let redirect = res.locals.redirect || '/listing'; 

res.redirect(redirect)

}

module.exports.logout=(req, res, next) => {
    
    req.logout((err) => {
        
        if (err) {
return next(err)

        } else {
                req.flash('success', 'you are succesfully logged out');

            res.redirect('/listing')

        }

    }
)

}
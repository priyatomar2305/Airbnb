
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const dbUrl = process.env.Atlas;

let express = require('express');
let app = express();       
let init = require('./init/init.js');       // cd C:\Program Files\MongoDB\Server\7.0\bin
let path = require('path');
const mongoose = require('mongoose');
let listing = require('./routes/listings.js')        //usernmae priya tomar  yEV8fCtG9uIIk3zw
let Review = require('./routes/review.js')
let signup=require('./routes/user.js')               //mongodb+srv://priyatomar:<password>@cluster0.x6ezoub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

var session = require('express-session');
const MongoStore = require('connect-mongo');
const ejsmate = require('ejs-mate');
var flash = require('connect-flash');
let passport = require('passport');
let localStrategy=require('passport-local')
let User=require('./models/listing/user.js')

let wrapAsync = require('./utils/error.js')
let expressError=require('./utils/expresserror.js')
app.use(express.static(path.join(__dirname,'/public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsmate);
var methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {  secret: process.env.SECRET,

        
    }

})
app.use(session({
    store,
  secret: process.env.SECRET,   
  resave: false,
    saveUninitialized: true,
    cookie: {
    expires: Date.now() + 7 * 24 * 60 *60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
httpOnly:true,
}

}))




    app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(() => { console.log('workin monngoose') })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl)
}

app.use((req, res, next) => {
    
    res.locals.success = req.flash('success');
    res.locals.deleted = req.flash('delete');
    res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;



    next();
})

app.use('/listing', listing);
app.use('/listing/:id/reviews', Review);
app.use('/', signup);


app.all('*', (req, res, next) => {
    
    next(new expressError(404, 'page not found'))
});
app.use((err, req, res, next) => {

    let { statusCode = 500, message = 'some errr' } = err;

    res.status(statusCode).render('listings/error.ejs',{message})
});


app.listen(3000, () => { console.log("3000 port working") });

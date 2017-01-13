var express = require('express')
 , app = express()
 , session = require('express-session')
 , bodyParser = require('body-parser')
 , methodOverride = require('method-override')
 , passport = require('passport')
 , passportConfig = require('./config/passport')
 , routes = require('./routes')
 , user = require('./routes/user')
 , home = require('./routes/home')
 , application = require('./routes/application')

SALT_WORK_FACTOR = 12;

app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.cookieParser())

app.use(passport.initialize())
app.use(passport.session())
app.use(app.router)

if ('development' === app.get('env')) {
	app.use(express.errorHandler())
}

//Define routes
app.get('/', routes.index)
app.get('/home', application.IsAuthenticated, home.homepage)
app.post('/authenticate', passport.authenticate('local',
	{
		successRedirect: '/home',
		failureRedirect: '/'
	}))

app.get('/logout', application.destroySession)
app.get('/signup', user.signUp)
app.post('/register', user.register)

app.use('/public', express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 3000)

var initdb = require("./config/dbinit.js")

var port = process.env.PORT || 3000
app.listen(port)
console.log("[Server] running at localhost: " + port)

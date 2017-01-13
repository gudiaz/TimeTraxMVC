//Initialize database
var db = require('../models');

db.sequelize.sync().complete(function(err){
	if (err) {
		throw err[0]
	} else {
		//add admin user for demo purposes
		console.log("Initializing database");

		db.User.find({where: {username: 'admin'}}).success(function (user){
			if (!user) {
				db.User.build({username: 'admin', password: 'admin'}).save();
			};
		});
	}
})

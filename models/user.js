var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
	    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		username: {type: DataTypes.STRING, unique: true, validate: {notNull: true, notEmpty: true}},
		password: {type: DataTypes.STRING, validate: {notNull: true, notEmpty: true}},
		role: {type: DataTypes.STRING, allowNull: true},
    	firstname: {type: DataTypes.STRING, allowNull: true},
    	lastname: {type: DataTypes.STRING, allowNull: true},
	    email: {type: DataTypes.STRING, allowNull: true, unique: true, validate: {isEmail: true}},
   		address: {type: DataTypes.STRING, allowNull: true},
    	city:{type: DataTypes.STRING, allowNull: true},
    	state: {type: DataTypes.STRING, allowNull: true},
    	zip: {type: DataTypes.STRING, allowNull: true},
   		phone: {type: DataTypes.STRING, allowNull: true}
	},
	{
	classMethods: {
		validPassword: function(password, passwd, done, user){
			bcrypt.compare(password, passwd, function(err, isMatch){
				if (err) console.log(err)
				if (isMatch) {
					return done(null, user)
				} else {
					return done(null, false)
				}
			})
		}
	}
	},
	{
		dialect: 'mysql'
	}
);

User.hook('beforeCreate', function(user, fn){
	var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		return salt
	});
	bcrypt.hash(user.password, salt, null, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		return fn(null, user)
	});
})
	
 return User	
}

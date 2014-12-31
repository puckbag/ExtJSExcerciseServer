"use strict";

module.exports = function(sequelize, DataTypes) {
	var Person = sequelize.define("Person", {
		name: DataTypes.STRING,
		nickname: DataTypes.STRING,
		birthdate: DataTypes.DATEONLY,
		startdate: DataTypes.DATEONLY,
		jobtitle: DataTypes.STRING,
		isEmployee: DataTypes.BOOLEAN
	}, {
		underscored: true
		// classMethods: {
		//   associate: function(models) {
		//     User.hasMany(models.Task)
		//   }
		// }
	});

	return Person;
};
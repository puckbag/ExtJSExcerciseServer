"use strict";

module.exports = {
	up: function(migration, DataTypes, done) {
		// add altering commands here, calling 'done' when finished
		migration.createTable(
			'People',
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				created_at: {
					type: DataTypes.DATE,
					default: null,
					allowNull: true
				},
				updated_at: {
					type: DataTypes.DATE,
					default: null,
					allowNull: true
				},
				name: {
					type: DataTypes.STRING,
					default: null,
					allowNull: true
				},
				nickname: {
					type: DataTypes.STRING,
					default: null,
					allowNull: true
				},
				birthdate: {
					type: DataTypes.DATEONLY,
					default: null,
					allowNull: true
				},
				startdate: {
					type: DataTypes.DATEONLY,
					default: null,
					allowNull: true
				},
				jobtitle: {
					type: DataTypes.STRING,
					default: null,
					allowNull: true
				},
				isEmployee: {
					type: DataTypes.BOOLEAN,
					default: null,
					allowNull: true
				}
			},
			{
			}
		);
		done();
	},

	down: function(migration, DataTypes, done) {
		// add reverting commands here, calling 'done' when finished
		migration.dropTable('People');
		done();
	}
};
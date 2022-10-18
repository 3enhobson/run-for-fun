const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //   hooks: {
    //     // set up beforeCreate lifecycle "hook" functionality
    //     beforeCreate: async (newUserData) => {
    //       newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //       return newUserData;
    //     },
    //     beforeUpdate: async (updatedUserData) => {
    //       updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //       return updatedUserData;
    //     }
    // },
  },
  {
    sequelize
  }

);

module.exports = User;
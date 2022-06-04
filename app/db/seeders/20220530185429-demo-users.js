"use strict";

const { hashedText } = require("../../config/bcryptHashWord");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullname: "admin",
          email: "admin@donate.id",
          password: await hashedText("admin"),
          phone: "+6282198554480",
          profile: "admin.jpg",
          gender: "male",
          status: "admin",
        },
        {
          fullname: "super admin",
          email: "superadmin@donate.id",
          password: await hashedText("superadmin"),
          phone: "+6282198554481",
          profile: "superadmin.jpg",
          gender: "male",
          status: "superAdmin",
        },
        {
          fullname: "agan jen",
          email: "aganjen@gmail.co.id",
          password: await hashedText("agan"),
          phone: "+6282198554482",
          profile: "agan.jpg",
          gender: "male",
          status: "user",
        },
        {
          fullname: "rina",
          email: "rina@yahoo.co.id",
          password: await hashedText("rina"),
          phone: "+6282198554483",
          profile: "rina.jpg",
          gender: "female",
          status: "user",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

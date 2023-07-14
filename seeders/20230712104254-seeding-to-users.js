'use strict';
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");
const data = JSON.parse(fs.readFileSync("./data/user.json", "utf-8")).map(el => {
  delete el.id
  el.createdAt = new Date()
  el.updatedAt = new Date()
  el.password = hashPassword(el.password)
  return el
})
console.log(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, )
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

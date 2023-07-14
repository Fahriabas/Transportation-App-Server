'use strict';
const fs = require("fs")
const data = JSON.parse(fs.readFileSync("./data/vehicle.json", "utf-8")).map(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
  return el
})
console.log(data, 'isi dari data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Vehicles", data, {})
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
    await queryInterface.bulkDelete("Vehicles", null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

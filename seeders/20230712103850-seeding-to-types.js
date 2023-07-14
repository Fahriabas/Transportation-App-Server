'use strict';

const fs = require("fs")
const data = JSON.parse(fs.readFileSync("./data/type.json", "utf-8")).map(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
  return el
})
console.log(data, 'isi dari data nih');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Types", data, {})
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Types", null)
  }
};

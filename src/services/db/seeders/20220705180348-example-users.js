const { faker } = require('@faker-js/faker')
const tableName = 'Users'

const moods = [
  'good',
  'nice',
  'fine',
]

const getRandomArrayEl = arr => arr[Math.floor(Math.random() * arr.length)]

const fakeUser = (new Array(5000000))
  .fill(null)
  .map((_, i) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    mood: getRandomArrayEl(moods),
    age: faker.datatype.number({ min: 7, max: 70 }),
    createdAt: new Date(),
  }))

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(tableName, fakeUser, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};

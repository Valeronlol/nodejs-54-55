const tableName = 'Users'
const columnName = 'age'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columnName, { type: Sequelize.DataTypes.INTEGER })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName)
  },
}

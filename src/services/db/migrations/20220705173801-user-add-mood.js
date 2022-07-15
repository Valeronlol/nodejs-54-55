const tableName = 'Users'
const columnName = 'mood'

const moods = [
  'good',
  'nice',
  'fine',
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.DataTypes.STRING,
      }, { transaction })

      await queryInterface.bulkUpdate(tableName, {
        [columnName]: moods[Math.floor(Math.random() * moods.length)]
      },
        {},
        { transaction },
      )

      await queryInterface.changeColumn(tableName, columnName, {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }, { transaction })
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(tableName, columnName)
  },
}

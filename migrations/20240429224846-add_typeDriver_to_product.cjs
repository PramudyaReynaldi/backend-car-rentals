"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("product", "typeDriver_1", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Lepas Kunci",
        });
        await queryInterface.addColumn("product", "typeDriver_2", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Dengan Supir",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("product", "typeDriver_1");
        await queryInterface.removeColumn("product", "typeDriver_2");
    },
};

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Zonings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        force: true
      },
      name: {
        type: Sequelize.STRING
      },
      purpose: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.FLOAT
      },
      width: {
        type: Sequelize.FLOAT
      },
      length: {
        type: Sequelize.FLOAT
      },
      address: {
        type: Sequelize.STRING
      },
      geometry: {
        type: Sequelize.GEOMETRY
      },
      ispolygon: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.TEXT
      },
      province_id: {
        type: Sequelize.INTEGER
      },
      district_id: {
        type: Sequelize.INTEGER
      },
      ward_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      typeof_zoning_id: {
        type: Sequelize.INTEGER
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
      //Province -> Nations 
      .then(
        async () => {
          await queryInterface
            .addConstraint("Provinces", {
              type: "FOREIGN KEY",
              fields: ["nation_id"],
              name: "FK_NAT_PRO",
              references: {
                table: "Nations",
                field: "id"
              }
            })
        }
      )
      //District -> Province
      .then(
        async () => {
          await queryInterface
            .addConstraint("Districts", {
              type: "FOREIGN KEY",
              fields: ["province_id"],
              name: "FK_PD",
              references: {
                table: "Provinces",
                field: "id"
              }
            })
        }
      )
      //Images ->Zoning
      .then(
        async () => {
          await queryInterface
            .addConstraint("Images", {
              type: "FOREIGN KEY",
              fields: ["zoning_id"],
              name: "FK_ZON_IMG",
              references: {
                table: "Zonings",
                field: "id"
              }
            })
        }
      )
      //Images -> Posts
      .then(
        async () => {
          await queryInterface
            .addConstraint("Images", {
              type: "FOREIGN KEY",
              fields: ["post_id"],
              name: "FK_POS_IMG",
              references: {
                table: "Posts",
                field: "id"
              }
            })
        }
      )
      //Zonings -> Provinces  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Zonings", {
              type: "FOREIGN KEY",
              fields: ["province_id"],
              name: "FK_ZON_PRO",
              references: {
                table: "Provinces",
                field: "id"
              }
            })
        }
      )
      //Zonings -> Districts  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Zonings", {
              type: "FOREIGN KEY",
              fields: ["district_id"],
              name: "FK_ZON_DIS",
              references: {
                table: "Districts",
                field: "id"
              }
            })
        }
      )
      //Zonings -> Wards  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Zonings", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_ZON_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Zonings -> Users  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Zonings", {
              type: "FOREIGN KEY",
              fields: ["user_id"],
              name: "FK_ZON_USER",
              references: {
                table: "Users",
                field: "id"
              }
            })
        }
      )
      //Zonings -> Typeof_zonings 
      .then(
        async () => {
          await queryInterface
            .addConstraint("Zonings", {
              type: "FOREIGN KEY",
              fields: ["typeof_zoning_id"],
              name: "FK_ZON_TYP_ZON",
              references: {
                table: "Typeof_zonings",
                field: "id"
              }
            })
        }
      )
      //Zonings -> Status  
      .then(
        async () => {
          await queryInterface
            .addConstraint("Zonings", {
              type: "FOREIGN KEY",
              fields: ["status_id"],
              name: "FK_ZON_STA",
              references: {
                table: "Status",
                field: "id"
              }
            })
        }
      )
      //Posts -> Status
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["status_id"],
              name: "FK_POS_STA",
              references: {
                table: "Status",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of post
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["typeof_posts_id"],
              name: "FK_POS_TYPO_POS",
              references: {
                table: "Typeof_posts",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real estates
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["typeof_real_estate_id"],
              name: "FK_POS_TYPO_REAL",
              references: {
                table: "Typeof_real_estates",
                field: "id"
              }
            })
        }
      )
      //Posts -> Provices
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["province_id"],
              name: "FK_POS_PRO",
              references: {
                table: "Provinces",
                field: "id"
              }
            })
        }
      )
      //Posts -> Districts
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["district_id"],
              name: "FK_POS_DIS",
              references: {
                table: "Districts",
                field: "id"
              }
            })
        }
      )
      //Posts -> Wards
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_POS_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real streets
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["street_id"],
              name: "FK_POS_STR",
              references: {
                table: "Streets",
                field: "id"
              }
            })
        }
      )
      //Posts -> Type of real users
      .then(
        async () => {
          await queryInterface
            .addConstraint("Posts", {
              type: "FOREIGN KEY",
              fields: ["user_id"],
              name: "FK_POS_USER",
              references: {
                table: "Users",
                field: "id"
              }
            })
        }
      )
      //Users -> Type of real wards
      .then(
        async () => {
          await queryInterface
            .addConstraint("Users", {
              type: "FOREIGN KEY",
              fields: ["ward_id"],
              name: "FK_USER_WAR",
              references: {
                table: "Wards",
                field: "id"
              }
            })
        }
      )
      //Users -> Roles
      .then(
        async () => {
          await queryInterface
            .addConstraint("Users", {
              type: "FOREIGN KEY",
              fields: ["role_id"],
              name: "FK_USER_ROL",
              references: {
                table: "Roles",
                field: "id"
              }
            })
        }
      )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Zonings');
  }
};
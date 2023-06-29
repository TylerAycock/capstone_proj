require(`dotenv`).config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require(`sequelize`);
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
            DROP TABLE IF EXISTS reservations;
            DROP TABLE IF EXISTS campsites;
            DROP TABLE IF EXISTS parks;

            CREATE TABLE parks (
                park_id SERIAL PRIMARY KEY,
                park_name VARCHAR NOT NULL
            );

            CREATE TABLE campsites (
                campsite_id SERIAL PRIMARY KEY,
                park_id INTEGER REFERENCES parks(park_id) NOT NULL,
                campsite_name VARCHAR(50) NOT NULL,
                occupancy INTEGER NOT NULL,
                available BOOLEAN NOT NULL
            );

            CREATE TABLE reservations (
                res_id SERIAL PRIMARY KEY,
                park_id INTEGER REFERENCES parks(park_id) NOT NULL,
                campsite_id INTEGER REFERENCES campsites(campsite_id) NOT NULL
            );
           
            INSERT INTO parks (park_name)
            VALUES ('Acadia'),
            ('Arches'),
            ('Badlands'),
            ('Big Bend'),
            ('Bryce Canyon'),
            ('Carlsbad Caverns'),
            ('Channel Islands'),
            ('Yosemite'),
            ('Joshua Tree'),
            ('Yellow Stone'); 
        
            INSERT INTO campsites (park_id, campsite_name, occupancy, available)
            VALUES (2, 'River Spot', 10, true),
            (2, 'Big Camp', 20, true),
            (3, 'Little Camp', 2, true),
            (3, 'Hideaway', 5, true),
            (1, 'Lucky Spot', 4, true),
            (9, 'Base Camp', 3, true),
            (5, 'Bear Camp', 11, true),
            (3, 'Hidden Meadow', 3, true),
            (8, 'Scouts Camp', 6, true),
            (8, 'Star Gazer', 5, true),
            (7, 'Hidden Gem', 8, true);
        
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};

// INSERT INTO available (park_name, campsite_name, occupancy, available)
// VALUES ('Badlands', 'River Spot', 10, true),
// ('Badlands', 'Big Camp', 20, true),
// ('Big Bend', 'Little Camp', 2, true),
// ('Big Bend', 'Hideaway', 5, true),
// ('Arches', 'Lucky Spot', 4, true),
// ('Yellow Stone', 'Base Camp', 3, true ),
// ('Carlsbad Caverns', 'Bear Camp', 11, true),
// ('Big Bend', 'Hidden Meadow', 3, true),
// ('Joshua Tree', 'Scouts Camp', 6, true),
// ('Joshua Tree', 'Star Gazer', 5, true),
// ('Yosemite', 'Hiddne Gem', 8, true);

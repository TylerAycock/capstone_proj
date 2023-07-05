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
                park_name VARCHAR NOT NULL,
                state VARCHAR NOT NULL,
                acres INT NOT NULL,
                est DATE NOT NULL
            );

            CREATE TABLE campsites (
                campsite_id SERIAL PRIMARY KEY,
                park_id INTEGER REFERENCES parks(park_id) NOT NULL,
                campsite_name VARCHAR(50) NOT NULL,
                occupancy INTEGER NOT NULL,
                available BOOLEAN NOT NULL,
                price INTEGER NOT NULL
            );

            CREATE TABLE reservations (
                res_id SERIAL PRIMARY KEY,
                park_id INTEGER REFERENCES parks(park_id) NOT NULL,
                campsite_id INTEGER REFERENCES campsites(campsite_id) NOT NULL
            );

            INSERT INTO parks (park_name, state, acres, est)
            VALUES ('Acadia National Park', 'Maine',49071, '1919-02-26'),
            ('Arches National Park', 'Utah', 76678,'1971-11-12' ),
            ('Badlands National Park', 'South Dakota', 242755, '1978-11-10'),
            ('Big Bend National Park', 'Texas', 801163, '1944-06-12'),
            ('Bryce Canyon National Park', 'Utah',35835, '1928-02-25'),
            ('Carlsbad Caverns National Park', 'New Mexico', 46766, '1930-05-14'),
            ('Channel Islands National Park', 'California', 249561, '1980-03-05'),
            ('Yosemite National Park','California', 761747, '1890-10-01'),
            ('Joshua Tree National Park', 'California',795155,'1994-10-31'),
            ('Yellow Stone National Park', 'Wyoming', 2213790, '1872-03-01'); 
            
            INSERT INTO campsites (park_id, campsite_name, occupancy, available, price)
            VALUES (2, 'River Spot',10, true, 10),
            (2, 'Big Camp', 20, true, 15),
            (3, 'Little Camp', 2, true, 10),
            (3, 'Hideaway', 5, true, 15),
            (1, 'Lucky Spot', 4, true, 14),
            (9, 'Base Camp', 3, true, 35),
            (5, 'Bear Camp', 11, true, 50),
            (3, 'Hidden Meadow', 3, true, 10),
            (8, 'Scouts Camp', 6, true, 20),
            (8, 'Star Gazer', 5, true, 10),
            (7, 'Hidden Gem', 8, true, 35);
        
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};



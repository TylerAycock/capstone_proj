require(`dotenv`).config()
const {CONNECTION_STRING} = process.env
const Sequelize = require(`sequelize`)
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS campsites;
            DROP TABLE IF EXISTS parks;

            CREATE TABLE rangers (
                ranger_id SERIAL PRIMARY KEY, 
                name VARCHAR NOT NULL,
                position VARCHAR NOT NULL,
                park VARCHAR NOT NULL,
                cell VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                exp INTEGER NOT NULL
            );

            CREATE TABLE parks (
                park_id SERIAL PRIMARY KEY,
                park_name VARCHAR NOT NULL
            );
            
            INSERT INTO rangers (name, position, park, cell, email, exp)
            VALUES ('Smokey The Bear','Bear' , 'American Wilderness', 8007873473, 'smokey@onlyyou.com', 50),
            ('Paul Bunyan','Head Forester' , 'Yosemite National Park', 1234567890, 'paulB@nationalpark.gov', 200),
            ('Ron Swanson','Dir of Food Op' , 'Joshua Tree National Park', 3334445555, 'ronS@nationalpark.gov', 15);

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
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }}
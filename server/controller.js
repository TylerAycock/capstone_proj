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
    getCampsites: (req,resp) =>{
        sequelize.query(`
        SELECT parks.park_name AS park, camp.campsite_name AS site, campsite_id as ID, occupancy AS occ
        FROM campsites AS camp
        JOIN parks
        ON parks.park_id = camp.park_id
        WHERE available = true
        `).then(dbres=>{
            resp.status(200).send(dbres[0])
        }).catch(err=>console.log(err))
    }
}
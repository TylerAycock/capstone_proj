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
        sequilize.query(`
        SELECT *
        FROM campsites
        `).then(dbres=>{
            resp.status(200).send(dbres)
        }).catch(err=>console.log(err))
    }
}
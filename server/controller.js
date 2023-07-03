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
  getCampsites: (req, resp) => {
    sequelize
      .query(
        `
        SELECT parks.park_name AS park, camp.campsite_name AS site, campsite_id as site_ID, parks.park_id, occupancy AS occ, available, price
        FROM campsites AS camp
        JOIN parks
        ON parks.park_id = camp.park_id
        WHERE available = true
        ORDER BY park_name asc
        `
      )
      .then((dbres) => {
        resp.status(200).send(dbres[0]);
      })
      .catch((err) => console.log(err));
  },
  makeReservation: (req, resp) => {
    let { park, site, site_id, park_id, occ } = req.body;
    // console.log(req.body);
    sequelize
      .query(
        `
        UPDATE campsites 
        SET available = False
        WHERE campsite_id = ${site_id};

        INSERT INTO reservations(park_id, campsite_id)
          VALUES (${park_id}, ${site_id});

         `
      )
      .then((dbres) => resp.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },
  showReservation: (req, resp) => {
    console.log(req.body);
    sequelize
      .query(
        `
      SELECT res_id, parks.park_id, parks.park_name, campsites.campsite_id, campsites.campsite_name, campsites.occupancy AS occ, campsites.available AS available
      FROM reservations AS res
      JOIN campsites ON res.campsite_id = campsites.campsite_id
      JOIN parks ON parks.park_id = campsites.park_id
      `
      )
      .then((dbres) => resp.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },
  deleteRes: (req, resp) => {
    console.log(req.params);
    let {id} = req.params
    sequelize.query(`
      UPDATE campsites
      SET available = True
      WHERE campsite_id = ${id};

      DELETE FROM reservations
      WHERE campsite_id = ${id};
    `)
    .then(dbres => resp.status(200).send(dbres[0]))
    .catch(err =>console.log(err))
  },
  getParks: (req, resp) =>{
    sequelize.query(`
    SELECT *
    FROM parks
    `)
    .then(dbRes =>{
      resp.status(200).send(dbRes[0])
    })
    .catch(err=>console.log(err))
  },
  getTable:(req,resp) =>{
    sequelize.query(`
    Select *
    FROM parks
    `)
    .then(dbRes =>{
      resp.status(200).send(dbRes[0])
    }).catch(err=>console.log(err))
  }
};

const db = require("../../config/db");


// GET ALL USERS
const getUsers = async (req, res, next) => {

  try {

    const result = await db.query(`

      SELECT

        users.id,

        users.name,

        users.email,

        roles.role_name

      FROM users

      LEFT JOIN roles
        ON users.role_id = roles.id

      ORDER BY users.id ASC;

    `);

    return res.status(200).json({

      success: true,

      message: "Users fetched successfully",

      data: result.rows,
    });

  } catch (err) {

    return next(err);
  }
};


module.exports = {
  getUsers,
};
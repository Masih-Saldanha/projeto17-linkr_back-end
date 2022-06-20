import db from '../config/db.js';

async function getUserInfoById(userId) {
  return db.query(`
    SELECT u.email, u.username, u."pictureUrl" 
    FROM users u
    WHERE u.id = $1
    `, [userId]);
}

async function checkSignUp(email, username) {
  return db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [
    email,
    username,
  ]);
}

async function getUsersByQuery(query) {
  return db.query(`
    SELECT us.username, us.id
    FROM users us
    WHERE us.username
    ILIKE $1
    `, [`${query}%`]);
}

async function insertUser(username, email, passwordHash, picture) {
  return db.query(
    `INSERT INTO users(username, email, password, "pictureUrl") 
    VALUES ($1, $2, $3, $4)
    `,
    [username, email.toLowerCase(), passwordHash, picture],
  );
}

async function getUserPictureByUserId(userId) {
  return db.query(`
    SELECT u."pictureUrl" 
    FROM users u
    WHERE u.id = $1
    `, [userId]);
}

const usersRepository = {
  getUserInfoById,
  checkSignUp,
  insertUser,
  getUserPictureByUserId,
  getUsersByQuery,
};

export default usersRepository;

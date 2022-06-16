import db from "./../config/db.js";

async function getUserInfoById(userId) {
  return db.query(`
    SELECT u.email, u.username, u."pictureUrl" 
    FROM users u
    WHERE u.id = $1
    `, [userId]);
}

async function checkSignUp(email, username) {
  return db.query("SELECT * FROM users WHERE email = $1 OR username = $2", [
    email,
    username,
  ]);
}

async function insertUser(username, email, passwordHash, picture) {
  return db.query(
    `INSERT INTO users(username, email, password, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [username, email.toLowerCase(), passwordHash, picture]
  );
}

const usersRepository = {
  getUserInfoById,
  checkSignUp,
  insertUser
};

export default usersRepository;
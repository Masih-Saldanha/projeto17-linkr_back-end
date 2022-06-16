import db from "../config/db.js";

async function getUserInfoById(userId) {
    return db.query(`
    SELECT u.email, u.username, u."pictureUrl" 
    FROM users u
    WHERE u.id = $1
    `, [userId]);
}

const usersRepository = {
    getUserInfoById
}

export default usersRepository;
import db from '../config/db.js';

async function insertFollower(followedId, followerId) {
    return db.query(`
    INSERT INTO followers
    ("followedId", "followerId") 
    VALUES ($1, $2)
    `, [followedId, followerId]);
}

async function deleteFollower(followedId, followerId) {
    return db.query(`
    DELETE FROM followers
    WHERE "followedId" = $1 AND "followerId" = $2
    `, [followedId, followerId]);
}

const followerRepository = {
    insertFollower,
    deleteFollower,
};

export default followerRepository;
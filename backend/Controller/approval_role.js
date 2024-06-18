const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const argon2 = require('argon2');

router.post('/byadmin', async (req, res) => {
    try {
        const { user_id, role } = req.body;
        if (!user_id || !role) {
            return res.status(400).json({ error: 'user_id and role are required fields' });
        }

        await db.query(`UPDATE users SET is_user_valid = 1 WHERE user_id = ${user_id};`);
        await db.query(`UPDATE users SET role = "${role}" WHERE user_id = ${user_id};`);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        // Handle database errors or any other unexpected errors
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});


module.exports = router;
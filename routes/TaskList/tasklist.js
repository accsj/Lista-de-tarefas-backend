const pool = require("../../modules/db");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();

async function getTasksByUserId(userId) {
    try {
        const query = {
            text: 'SELECT * FROM tarefas WHERE user_id = $1',
            values: [userId],
        };

        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar tarefas do usuário:', error);
        throw error;
    }
}

function extractToken(authorizationHeader) {
    if (!authorizationHeader) return null;
    const token = authorizationHeader.split(' ')[1];
    return token;
}

router.get('/tasklist', async(req, res) => {
    const token = extractToken(req.headers.authorization); 

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;

        const tasks = await getTasksByUserId(userId);

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas do usuário:', error);
        return res.status(500).json({ error: 'Erro ao buscar tarefas do usuário.' });
    }
});

module.exports = router;

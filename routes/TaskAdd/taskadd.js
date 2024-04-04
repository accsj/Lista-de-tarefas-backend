const express = require('express');
const router = express.Router();
const pool = require('../../modules/db');
const jwt = require('jsonwebtoken');

function extractToken(authorizationHeader) {
    if (!authorizationHeader) return null;
    const token = authorizationHeader.split(' ')[1];
    return token;
}

router.post('/addtask', async (req, res) => {
    const token = extractToken(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        const userId = decodedToken.userId; 

        const { title } = req.body;

        const query = {
            text: 'INSERT INTO tarefas (user_id, title) VALUES ($1, $2) RETURNING *',
            values: [userId, title],
        };

        const result = await pool.query(query);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
});

module.exports = router;

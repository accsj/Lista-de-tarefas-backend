const express = require('express');
const router = express.Router();
const pool = require('../../modules/db');

router.delete('/deletetask/:taskId', async (req, res) => {
    const taskId = req.params.taskId; 
    
    if (!taskId) {
        return res.status(400).json({ error: 'ID da tarefa não fornecido.' });
    }

    try {
        const query = {
            text: 'DELETE FROM tarefas WHERE id = $1 RETURNING *',
            values: [taskId],
        };

        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }

        const deletedTask = result.rows[0];
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        res.status(500).json({ error: 'Erro ao excluir tarefa.' });
    }
});

module.exports = router;
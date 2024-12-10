const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Fetch all applied jobs
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs ORDER BY applied_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST: Save job application details
router.post('/', async (req, res) => {
    const { title, company, location, link } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO jobs (title, company, location, link) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, company, location, link]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
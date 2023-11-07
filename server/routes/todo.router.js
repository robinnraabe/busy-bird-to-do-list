const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "todo" ORDER BY "status", "due_date" ASC, "color" ASC;`;
    pool.query(queryText)
        .then((result) => {
            console.log('GET from server');
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in server GET', error);
            res.sendStatus(500);
        });
})

// POST
router.post('/', (req, res) => {
    const task = req.body;
    console.log(req.body);
    let queryText;
    if (task.date == '') {
        task.date = 'NOW()';
    }
    queryText = `
        INSERT INTO "todo" ("task", "due_date", "color", "status")
        VALUES ($1, $2, $3, false);
    `;
    pool.query(queryText, [task.task, task.date, task.color])
        .then((result) => {
            console.log('POST task to server', task);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in server POST', error);
            res.sendStatus(500);
        });
})

// PUT to set status
router.put('/:id', (req, res) => {
    const queryText = `UPDATE "todo" SET "status" = NOT "status" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in server PUT', error);
            res.sendStatus(500);
        });
})

// DELETE
router.delete('/:id', (req, res) => {
    console.log('Request to delete id #', req.params.id);
    const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in server DELETE', error);
            res.sendStatus(500);
        });
})

module.exports = router;

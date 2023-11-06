const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//PUT to add notes
router.put('/:id', (req, res) => {
    const queryText = `UPDATE "todo" SET "notes_status" = NOT "notes_status" WHERE "id" = $1;`;
    console.log(req.body);
    pool.query(queryText, [req.params.id, req.body.notes_status])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in server PUT', error);
            res.sendStatus(500);
        });
})

module.exports = router;

//const queryText = `UPDATE "todo" SET "notes" = $2 WHERE "id" = $1;`;
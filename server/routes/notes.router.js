const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//PUT to add notes
router.put('/:id', (req, res) => {
    console.log("notes router req.body:", req.body, req.params);
    const queryText = `UPDATE "todo" SET "notes" = $2 WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id, req.body.notes])
        .then((result) => {
            console.log('Successfully updated note');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in editNotes on notes router:', error);
            res.sendStatus(500);
        });
})

module.exports = router;
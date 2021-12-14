const express = require("express");
const router = express.Router();
const fs = require("fs");
router.get('/images/:url', (req, res) => {
    if (req.params.url) {
        fs.readFile('public/images/' + req.params.url, (err, data) => {
            if (err) {
                return res.status(500).json({ data: err });
            } // Fail if the file can't be read.
            else {
                res.end(data); // Send the file data to the browser.
            }
        });
    }
    else {

        return res.status(500).json({ msg: "Invalid File!" });
    }
});

module.exports = router;
const express = require("express");
const router = express();


router.post('/logout', (req, res) => {
    res.clearCookie('token');

    res.status(200).send({ message: "Logout realizado com sucesso" });
})

module.exports = router;
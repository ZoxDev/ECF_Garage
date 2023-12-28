const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) => {
    try {
        // Search for token in the request
        const jwtToken = req.header("token");

        if(!jwtToken){
           return res.status(403).json("Non autorisé");
        }

        // Verify if the token match with secret
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;

        next();
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("Non autorisé");
    }
};



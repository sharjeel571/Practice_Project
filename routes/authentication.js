const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../model/user');
const fetchUser = require('../middleware/fetchUser');
require('dotenv').config();

// const app = express();
const router = express.Router();

const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY

router.post('/createUser', async (req, res) => {
    try {
        const { name, email, password } = req.body;


        let existingUser = await Users.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).send("An error occurred: Cannot create user with the same Email");
        } else {
            if (!name || !email || !password) {
                return res.status(400).send("An error occurred: Missing required fields");
            }
            const salt = await bcrypt.genSalt(10);
            const secure_password = await bcrypt.hash(password, salt)
            newUser = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: secure_password
            });

            const data = {
                newUser: {
                    id: newUser.id
                }
            }
            const token = jwt.sign(data, JWT_SECRETE_KEY)
            res.status(201).send({ message: "New user created successfully", token });
        }
    } catch (error) {
        console.error("An error occurred: " + error.message);
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.post('/login', [], async (req, res) => {

    try {
        const { email, password } = req.body;
        let user = await Users.findOne({ email });
        let compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            res.status(404).send({ message: "Wrong password can't logged in", });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRETE_KEY);
        res.cookie("token", token);
        res.status(200).json({ token, message: "Successfully logged in" });        
    } catch (error) {
        console.error("An error occurred: " + error.message);
        res.status(500).send("An error occurred: " + error.message);
    }
})


router.get('/getUser', fetchUser , async (req, res) => {

    try {
        const userId = req.user.id;
        let user = await Users.findById(userId).select("-password");
        res.json(user)
    } catch (error) {
        console.error("An error occurred: " + error.message);
        res.status(500).send("An error occurred: " + error.message);
    }


})
module.exports = router;
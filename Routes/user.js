const UserModel = require("../Model/usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const express = require("express");
const { authenticate } = require("../Middleware/authenticate");
const UserRouter = express.Router();

//registering users
UserRouter.post("/register", async (req, res) => {
    const { name, email, password, dob, bio } = req.body;
    try {
        const data = await UserModel.findOne({ email });
        if (data) {
            res.send("email already registered")
        }
        bcrypt.hash(password, 6, async (err, hash) => {
            const user = new UserModel({
                name,
                email,
                password: hash,
                dob,
                bio
            })
            await user.save();
        });
        res.send("user registered successfully").status(201)
    } catch (error) {
        console.log(`error while registering : ${error}`);
    }
})

//logining user
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "") return res.status(501).json("Enter all fields");

    try {
        const isPresent = await UserModel.findOne({ email: email });
        if (!isPresent) return res.status(401).send({
            "Message": "User not found"
        });

        const hashedPassword = isPresent?.password;

        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (!result) return res.status(404).send({
                "Message": "login failed"
            });

            const Normal_Token = jwt.sign({ userId: isPresent._id }, process.env.key, { expiresIn: "7d" });

            res.status(201).send({
                "Message": "Login successful",
                "Token": Normal_Token,
                "Data": isPresent
            });
        });
    } catch (error) {
        console.log(`error while login : ${error}`);
    }
})

//getting user
UserRouter.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.send({ mssg: "all users details", data: data }).status(200);

    } catch (error) {
        console.log(`error while getting : ${error}`);
    }
})

//finding user with specific Id
UserRouter.get("/users/:id/friends", async (req, res) => {
    const id = req.params.id
    try {

        const user = await UserModel.findById(id).populate('friends');
        if (!user) {
            return res.send({ error: 'User not found' });
        }
        res.send(user.friends).status(200);
    } catch (error) {
        console.log(`error while getting user : ${error}`);
    }
})

//find user with specific Id and sending friend request
UserRouter.post("/users/:id/friends", authenticate, async (req, res) => {
    const userId = req.params.id;
    const friendId = req.body.friendId;
    try {

        const user = await UserModel.findById(userId);
        const friend = await UserModel.findById(friendId);

        if (!user || !friend) {
            return res.send('User or friend not found');
        }

        if (user.friendRequests.includes(friendId)) {
            return res.send('Friend request sent already');
        }

        user.friendRequests.push(friendId);
        await user.save();

        res.status(201).send({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.log(`error while sending friend request : ${error}`);
    }
})

//accepting and rejecting friend requests
UserRouter.put("/users/:id/friends/:friendid",authenticate, async (req, res) => {
    const userId = req.params.id;
    const friendId = req.params.friendid;
    const accept = req.body.accept;
    try {

        const user = await UserModel.findById(userId);
        const friend = await UserModel.findById(friendId);

        if (!user || !friend) {
            return res.send('User or friend not found');
        }

        if (!user.friendRequests.includes(friendId)) {
            return res.send('Friend request not found');
        }

        if (accept) {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        res.status(204).send( 'Friend request updated successfully' );
    } catch (error) {
        console.log(`error while viewing friend request : ${error}`);
    }
})
module.exports = {
    UserRouter
}
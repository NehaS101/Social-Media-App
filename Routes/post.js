const { authenticate } = require("../Middleware/authenticate");
const PostModel = require("../Model/postmodel");
const express = require("express");

const PostRouter = express.Router();

//getting all requests
PostRouter.get("/", async (req, res) => {
    try {
        const data = await PostModel.find();
        res.send({ mssg: "all posts", data: data }).status(200);

    } catch (error) {
        res.send(`error while getting : ${error}`);
    }
})

//getting post with specific id
PostRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id);
        res.send(post).status(200)
    } catch (error) {
        res.send(`error while getting : ${error}`);
    }
})

//creating a new post
PostRouter.post("/", authenticate, async (req, res) => {
    const { user, text, image } = req.body;
    try {
        const post = new PostModel({
            user,
            text,
            image,
        });

        await post.save();

        res.status(201).send("post created successfully");
    } catch (error) {
        res.send(`error while creating: ${error}`);
    }
})

//updating a post
PostRouter.put("/:id", authenticate, async (req, res) => {
    const Id = req.params.id;
    const { text, image } = req.body;
    try {
     const post =   await PostModel.findByIdAndUpdate(Id,req.body);
        
        res.send({mssg:"post updated successfully",post}).status(204)
    } catch (error) {
        res.send(`error while updating: ${error}`);
    }
})

//deleting a post
PostRouter.delete("/:id", authenticate, async (req,res) => {
    const id = req.params.id;
try {
    await PostModel.findByIdAndDelete(id);
    res.send({mssg:"delete deleted successfully"}).status(202)
} catch (error) {
    res.send(`error while deleting: ${error}`);
}
});

module.exports = {
    PostRouter
}
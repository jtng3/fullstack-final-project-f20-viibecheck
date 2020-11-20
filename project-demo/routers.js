const express = require("express");
const router = express.Router();
const Student = require("./model/Student")


// Get all posts
router.get("/students", async (req, res) => {
	const student = await Student.find()
	res.send(student)
})

module.exports = router
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");

const StudyGroup = require("../../models/StudyGroup");
const User = require("../../models/User");

// @route   POST api/study-group
// @desc    Create a study-group
// @access  Private
router.post("/", protect, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newStudyGroup = new StudyGroup({
      user: req.user.id,
      module: req.body.module,
      name: req.body.name,
      text: req.body.text,
      discord: req.body.discord,
    });

    const studyGroup = await newStudyGroup.save();

    res.json(studyGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/study-group
// @desc    Get all study groups
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const studyGroups = await StudyGroup.find().sort({ date: -1 });
    res.json(studyGroups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/study-group/:id
// @desc    Get study group by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({ msg: "Study group not found" });
    }

    res.json(studyGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Study group not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/study-group/:id
// @desc    Delete a study group
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({ msg: "Study group not found" });
    }

    // Check user
    if (studyGroup.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    await studyGroup.remove();

    res.json({ msg: "Study group removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Study group not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/study-group/join/:id
// @desc    Join a study group
// @access  Private
router.put("/join/:id", protect, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    // Check if the study group has already been joined
    if (
      studyGroup.members.filter(
        (member) => member.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Study group already joined" });
    }

    studyGroup.members.unshift({ user: req.user.id });

    await studyGroup.save();

    res.json(studyGroup.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/leave/:id
// @desc    Leave a study group
// @access  Private
router.put("/leave/:id", protect, async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    // Check if the study group has already been joined
    if (
      studyGroup.members.filter(
        (member) => member.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "Study group has yet to be joined" });
    }

    // Get remove index
    const removeIndex = studyGroup.members
      .map((member) => member.user.toString())
      .indexOf(req.user.id);

    studyGroup.members.splice(removeIndex, 1);

    await studyGroup.save();

    res.json(studyGroup.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

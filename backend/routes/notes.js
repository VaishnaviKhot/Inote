const express = require("express");
const router = express.Router();
const Fetchuser = require("../middleware/Fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route 1 : get all the notes using : Get "/api/notes/fetchallnotes".

try {
  router.get("/fetchallnotes", Fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  });
} catch (error) {
  console.error(error.message);
  // eslint-disable-next-line no-undef
  res.status(500).send("some error occured");
}

//route 2 : add a new note using : post "/api/notes/addnote".

router.post(
  "/addnote",
  Fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid desc").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//route 3 : Update an existing note using : put "/api/notes/updatenote". login required

router.put("/updatenote/:id", Fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to update
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.send(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//route 4 : deleting an existing note using : delete "/api/notes/deletenote". login required

router.delete("/deletenote/:id", Fetchuser, async (req, res) => {
  console.log("delete route");
  try {
    await Notes.findOneAndDelete({ _id: req.params.id })
      .then(async (response) => {
        console.log(response);
        res.status(200).send({
          message: "Deleted successfully",
          response: response,
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          message: "Error in deletion",
          response: err,
          success: false,
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;

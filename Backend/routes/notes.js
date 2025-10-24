const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');   // model import


// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    if (notes.length === 0) {
      return res.json({ msg: "This user has no notes available.", notes});
    }

    res.json(notes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 2: Get all the notes using: POST "/api/notes/addnotes". Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Please enter a title at least 5 characters').isLength({ min: 3 }),
    body('description', 'Please enter a description').isLength({ min: 5 }),
    body('tag', 'Please enter a Tag')
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })

        const saveNotes = await note.save();
        res.json({ msg: "Note are added", saveNotes })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 3: Udate notes using: PUT "/api/notes/updatenotes". Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    //  Create a newnote object
    const newnote = {};
    if (title) {newnote.title = title;}
    if (description) {newnote.description = description;}
    if (tag) {newnote.tag = tag;}


    // note ko doodna hai id ky through
    let note = await Note.findById(req.params.id);
    // ager asa koi note exist hi ni krta
    if (!note) {
        return res.status(404).send("Not found!");
    }
    // ya check krna hai ka gis ka note hai wo hi update kr reha hai
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send({msg: "Not allowed to make change another Notes!"});
    }

    // uper waly mai sy agr koo chooch wesa ni hai to ya update kr do
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json({msg: "Notes are updated", note});

});

// ROUTE 4: Delete notes using: DELETE "/api/notes/deletenotes". Login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    // note ko doodna hai id ky through
    let note = await Note.findById(req.params.id);
    // ager asa koi note exist hi ni krta
    if (!note) {
        return res.status(404).send("Sorry, the requested note could not be found!");
    }
    // ya check krna hai ka gis ka note hai wo hi update kr reha hai
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Sorry, you're not allowed to delete notes that don't belong to you.");
    }

    // uper waly mai sy agr kooch wesa ni hai to ya update kr do
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({msg: "Notes are deleted", note: note});

});

module.exports = router;
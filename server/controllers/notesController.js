const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  if (!notes.length) return res.status(400).json({ message: "No notes found" });
  res.json(notes);
});

/**
 * @desc Create new note
 * @route POST / notes
 * @access
 */
const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  // validate all required fields from request body
  if (!user || !title || !text)
    return res.status(400).json({ message: "All fields are required" });

  // check if the user exists in the database
  const foundUser = await User.findOne({ user }).lean().exec();
  if (!foundUser)
    return res
      .status(409)
      .json({ message: "Error creating note, user does not exist in record" });

  const savedNote = { user, title, text };

  const note = await Note.create(savedNote);
  console.log(foundUser);
  if (note) {
    res
      .status(201)
      .json({ message: `New note was created by ${foundUser.username}` });
  } else {
    res.status(400).json({ message: "Invalid note data, note not created" });
  }
});

/**
 * @desc Update a note
 * @route PATCH /notes
 * @access
 */

const updateNote = asyncHandler(async (req, res) => {
  const { id, title, text, completed } = req.body;
  const foundNote = await Note.findById(id).exec();
  if (!foundNote) return res.status(400).json({ message: "Note not found, cannot update" });

  if(!id || !title || !text) return res.status(400).json({ message: "All fields are required"})

  foundNote.title = title;
  foundNote.text = text;
  foundNote.completed = completed;
  const updatedNote = await foundNote.save();
  res.json({ message: `Note updated: ${foundNote}`})
  

})

/**
 * @desc Delete a note by id
 * @route DELETE /notes
 * @access
 */
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Note ID required" });
  const note = await Note.findById(id).exec();

  if (!note) return res.status(400).json({ message: "Note not found" });

  const result = await note.deleteOne();
  const reply = `Note titled ${result.title} with ID ${result._id} deleted`;
  res.json(reply);
});
module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};

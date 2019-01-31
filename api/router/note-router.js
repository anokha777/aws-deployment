const express = require('express');
const Notecontroller = require('../controller/note/note-controller');

const router = express.Router();
// get note page
router.route('/page')
  .get(Notecontroller.getNotePage);
// get all notes, create note
router.route('')
  .get(Notecontroller.getNotes)
  .post(Notecontroller.createNote);

// get note by id, mark completed, edit/update note
router.route('/:id')
  .get(Notecontroller.getNoteById)
  .put(Notecontroller.updateNote);

module.exports = router;

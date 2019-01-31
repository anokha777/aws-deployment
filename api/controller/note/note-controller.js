const path = require('path');
const Note = require('../../model/Note');

exports.getNotePage = (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/note/notes.html'));
  } catch (error) {
    next(error);
  }
};

exports.getNotes = (req, res, next) => {
  Note.find().then((notes) => {
    if (notes.length > 0) {
      res.status(201).json({
        notes,
      });
    } else {
      res.status(404).json({
        message: 'No record found',
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: 'No record found',
    });
    next(error);
  });
};

exports.getNoteById = (req, res, next) => {
  Note.find({ _id: req.params.id }).then((note) => {
    if (note.length > 0) {
      res.status(201).send({
        note,
      });
    } else {
      res.status(404).json({
        message: `No note found with id- ${req.params.id}`,
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: `No note found with id- ${req.params.id}`,
    });
    next(error);
  });
};

exports.createNote = (req, res, next) => {
  const note = new Note({
    notetitle: req.body.notetitle,
    notedescription: req.body.notedescription,
    iscompleted: false,
    createtime: Date.now(),
  });
  note.save().then((createdNote) => {
    res.status(201).json({
      createdNote,
    });
  }).catch((error) => {
    next(error);
  });
};

exports.updateNote = (req, res, next) => {
  const note = new Note({
    _id: req.params.id,
    notetitle: req.body.notetitle,
    notedescription: req.body.notedescription,
    iscompleted: req.body.iscompleted,
    createorupdatetime: Date.now(),
  });
  Note.update({ _id: req.params.id }, note).exec().then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!!!' });
    }
  }).catch((error) => {
    res.status(500).json({
      message: 'Could not update trello note!',
    });
    next(error);
  });
};

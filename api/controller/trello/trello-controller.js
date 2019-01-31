const path = require('path');
const Trello = require('../../model/Trello');

// get trello page - html
exports.getTrelloPage = (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/trello/boards.html'));
  } catch (error) {
    next(error);
  }
};

// get board - card list page
exports.getCardsListPage = (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../../../public/static/html/trello/lists.html'));
  } catch (error) {
    next(error);
  }
};

// boards
exports.getBoards = (req, res, next) => {
  Trello.find().then((boards) => {
    if (boards.length > 0) {
      res.status(201).send({
        boards,
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

exports.getBoardById = (req, res, next) => {
  Trello.find({ _id: req.params.id }).then((board) => {
    if (board.length > 0) {
      res.status(201).send({
        board,
      });
    } else {
      res.status(404).json({
        message: `No board found with id- ${req.params.id}`,
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: `No board found with id- ${req.params.id}`,
    });
    next(error);
  });
};

exports.createBoard = (req, res, next) => {
  const board = new Trello({
    boardtitle: req.body.boardtitle,
    boarddescription: req.body.boarddescription,
    createorupdatetime: Date.now(),
    // cards: [],
  });
  board.save().then((createdBoard) => {
    res.status(201).send({
      message: 'Board created successfully',
      createdBoard,
    });
  }).catch((error) => {
    next(error);
  });
};

exports.updateBoard = (req, res, next) => {
  const board = new Trello({
    _id: req.params.id,
    boardtitle: req.body.boardtitle,
    boarddescription: req.body.boarddescription,
    createorupdatetime: Date.now(),
  });
  Trello.update({ _id: req.params.id }, board).exec().then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!!!' });
    }
  }).catch((error) => {
    res.status(500).json({
      message: 'Could not update board!',
    });
    next(error);
  });
};

exports.deleteBoard = (req, res, next) => {
  Trello.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: 'board deleted!' });
    } else {
      res.status(401).json({ message: 'Not authorized!!!' });
    }
  }).catch((error) => {
    res.status(500).json({
      message: 'Deleting board failed!',
    });
    next(error);
  });
};

// *********************************** cards ************************************
exports.getCards = (req, res, next) => {
  Trello.find({ _id: req.params.boardid }).then((boards) => {
    if (boards[0].cards.length > 0) {
      res.status(201).send({
        cards: boards[0].cards,
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

exports.getCardById = (req, res, next) => {
  Trello.find({ _id: req.params.boardid }).then((board) => {
    if (board[0].cards.length > 0) {
      board[0].cards.findIndex((card) => {
        if (req.params.cardid.localeCompare(card._id.toString()) === 0) {
          res.status(201).send({
            cards: card,
          });
        }
      });
    } else {
      res.status(404).json({
        message: `No card found with id- ${req.params.cardid}`,
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: `No card found with id- ${req.params.cardid}`,
    });
    next(error);
  });
};

exports.createCard = (req, res, next) => {
  Trello.findOne({ _id: req.params.boardid }).then((board) => {
    if (board) {
      board.cards.push({
        cardid: Math.floor(Math.random() * 10),
        cardtitle: req.body.cardtitle,
        carddescription: req.body.carddescription,
        createorupdatetime: Date.now(),
      });
      board.save().then(() => {
        Trello.findOne({ _id: req.params.boardid }).then((updatedBoard) => {
          res.status(200).json({
            message: 'card added to board successfully.',
            updatedBoard,
          });
        });
      });
    } else {
      res.status(404).json({
        message: `No board found with id- ${req.params.boardid}. to add card - stage 1`,
      });
    }
  }).catch((error) => {
    res.status(404).json({
      message: `No board found with id- ${req.params.boardid}. to add card - stage 2`,
    });
    next(error);
  });
};

exports.updateCard = (req, res, next) => {
  Trello.findOneAndUpdate({ _id: req.params.boardid, 'cards._id': req.params.cardid },
    {
      $set: {
        'cards.$.cardtitle': req.body.cardtitle,
        'cards.$.carddescription': req.body.carddescription,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(404).json({ message: 'Not updated!!!' });
      } else {
        res.status(200).json({ message: 'Update successful!', doc });
      }
    }).catch((error) => {
    res.status(500).json({
      message: 'Could not update board!',
    });
    next(error);
  });
};

exports.deleteCard = (req, res, next) => {
  Trello.findOne({ _id: req.params.boardid }, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Deleting board failed!',
      });
      next(err);
    } else {
      result.cards.id(req.params.cardid).remove();
      result.save().then(() => {
        res.status(200).json({
          message: 'card deleted successfully.',
        });
      });
    }
  });
};

exports.addMembersToBoard = (req, res, next) => {
  Trello.findByIdAndUpdate({ _id: req.params.boardid },
    { $push: { members: req.body.userid } },
    { new: true, upsert: true },
    (err, doc) => {
      if (err) {
        res.status(404).json({ message: 'Member Not added to board!!!' });
      } else {
        res.status(200).json({ message: 'Member added to board successfully!', doc });
      }
    }).catch((error) => {
    res.status(500).json({
      message: 'Could not add member to board!',
    });
    next(error);
  });
};

exports.addCardItemToCard = (req, res, next) => {
  let index = -1;
  let board;
  Trello.findOne({ _id: req.params.boardid }).then((board1) => {
    board = board1;
    board.cards.find((o) => {
      if (o._id.toString() === req.params.cardid) {
        index += 1;
        return board.cards[index].carditems.push({
          carditem: req.body.carditem,
          createorupdatetime: Date.now(),
        });
      }
      index += 1;
    });
    board.save().then((response) => {
      res.status(200).json({
        message: 'Card item saved.',
        carditem: board.cards[index].carditems[board.cards[index].carditems.length - 1],
      });
    });
  }).catch((error) => {
    res.status(500).json({
      message: 'Could not save card item!',
    });
    next(error);
  });
};

exports.deleteCardItem = (req, res, next) => {
  Trello.findOne({ _id: req.params.boardid }, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Deleting board failed!',
      });
      next(err);
    } else {
      result.cards.id(req.params.cardid).carditems.id(req.params.carditemid).remove();
      result.save().then(() => {
        res.status(200).json({
          message: 'card deleted successfully.',
        });
      });
    }
  });
};

exports.dragDrop = (req, res, next) => {
  // console.log('boardid-', req.params.boardid);
  // console.log('dragFromCardId-', req.params.dragFromCardId);
  // console.log('dragToCardId-', req.params.dragToCardId);
  // console.log('dragCardItemId-', req.body.dragCardItemId);
  // console.log('dragCardItemValue-', req.body.dragCardItemValue);
  Trello.findOne({ _id: req.params.boardid }, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'drag and drop failed!',
      });
      next(err);
    } else {
      result.cards.id(req.params.dragFromCardId).carditems.id(req.body.dragCardItemId).remove();
      result.save().then(() => {
        let index = -1;
        let board;
        Trello.findOne({ _id: req.params.boardid }).then((board1) => {
          board = board1;
          board.cards.find((o) => {
            if (o._id.toString() === req.params.dragToCardId) {
              index += 1;
              return board.cards[index].carditems.push({
                carditem: req.body.dragCardItemValue,
                createorupdatetime: Date.now(),
              });
            }
            index += 1;
          });
          board.save().then((response) => {
            res.status(200).json({
              message: 'Card item dragged and dropped successfully.',
              carditem: board.cards[index].carditems[board.cards[index].carditems.length - 1],
            });
          });
        }).catch((error) => {
          res.status(500).json({
            message: 'Could not save card item!',
          });
          next(error);
        });
      });
    }
  });
};

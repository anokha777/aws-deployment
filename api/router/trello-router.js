const express = require('express');
const Trellocontroller = require('../controller/trello/trello-controller');

const router = express.Router();

// get trello page
router.route('/page')
  .get(Trellocontroller.getTrelloPage);

// get all boards, create board
router.route('/board')
  .get(Trellocontroller.getBoards)
  .post(Trellocontroller.createBoard);

// get board by id, delete board, edit/update board
router.route('/board/:id')
  .get(Trellocontroller.getBoardById)
  .put(Trellocontroller.updateBoard)
  .delete(Trellocontroller.deleteBoard);

// get card page
router.route('/board/card/page')
  .get(Trellocontroller.getCardsListPage);

// get all cards, create card
router.route('/board/:boardid/card')
  .get(Trellocontroller.getCards)
  .post(Trellocontroller.createCard);

// get Card by id, delete Card, edit/update Card
router.route('/board/:boardid/card/:cardid')
  .get(Trellocontroller.getCardById)
  .put(Trellocontroller.updateCard)
  .delete(Trellocontroller.deleteCard);

// add members to a board
router.route('/board/:boardid/addmember')
  .put(Trellocontroller.addMembersToBoard);

// add card items
router.route('/board/:boardid/card/:cardid/addcarditem')
  .put(Trellocontroller.addCardItemToCard);

// delete a card item, provide - boardid, cardid, carditemid
// api/trello/board/${boardid}/card/${cardid}/carditem/${carditemid}
router.route('/board/:boardid/card/:cardid/carditem/:carditemid')
  .delete(Trellocontroller.deleteCardItem);

// implement drag drop, in database- delete from card and add to another card
// api/trello/board/${boardid}/fromcard/${dragFromCardId}/tocard/${dragToCardId}
router.route('/board/:boardid/fromcard/:dragFromCardId/tocard/:dragToCardId')
  .put(Trellocontroller.dragDrop);

module.exports = router;

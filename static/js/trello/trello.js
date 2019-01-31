import { BACKEND_URL } from '../constants/constant.js';

const getTrelloPage = () => {
  fetch(`${BACKEND_URL}api/trello/page`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    return response.text();
  }).then((res) => {
    document.body.innerHTML = '';
    document.write(res);
  }).then(() => {
    fetch(`${BACKEND_URL}api/trello/board`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    }).then((boardsResponse) => {
      boardsResponse.json().then((boardsArray) => {
        const body = document.getElementById('board');
        const trelloDiv = document.createElement('div');
        trelloDiv.id = 'inner-div';
        for (let i = 0; i < boardsArray.boards.length; i++) {
          const trelloOuterDiv = document.createElement('div');
          trelloOuterDiv.classList.add('trello-outer-div');
          trelloOuterDiv.id = boardsArray.boards[i]._id;
          trelloOuterDiv.value = boardsArray.boards[i]._id;
          const deleteicon = document.createElement('span');
          deleteicon.classList.add('delete-icon');
          deleteicon.value = boardsArray.boards[i]._id;
          deleteicon.appendChild(document.createTextNode('X'));
          deleteicon.onclick = function() { deleteBoard(this.value); };

          const boardDiv = document.createElement('div');
          boardDiv.classList.add('trello-div');
          boardDiv.value = boardsArray.boards[i]._id;
          
          const boardtitlePara = document.createElement('p').appendChild(document.createTextNode(`BOARD TITLE- ${boardsArray.boards[i].boardtitle}`));
          const lineBreak = document.createElement('br')
          const boarddescriptionPara = document.createElement('p').appendChild(document.createTextNode(`BOARD DESCRIPTION- ${boardsArray.boards[i].boarddescription}`));
          trelloOuterDiv.appendChild(deleteicon);
          // boardDiv.appendChild(deleteicon);
          boardDiv.appendChild(boardtitlePara);
          boardDiv.appendChild(lineBreak);
          boardDiv.appendChild(boarddescriptionPara);

          boardDiv.onclick = function() { getListOfCardLIST(this.value, boardsArray.boards[i].boardtitle); };
          trelloOuterDiv.appendChild(boardDiv);
          // trelloDiv.appendChild(boardDiv);
          trelloDiv.appendChild(trelloOuterDiv);
        }
        body.appendChild(trelloDiv);
      });
    });
  });
};

const createBoard = (boardtitle, boarddescription) => {
  fetch(`${BACKEND_URL}api/trello/board`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      boardtitle,
      boarddescription,
    }),
  }).then((response) => {
    response.json().then((createdBoardResponse) => {
      const trelloOuterDiv = document.createElement('div');
      trelloOuterDiv.classList.add('trello-outer-div');
      trelloOuterDiv.id = createdBoardResponse.createdBoard._id;
      trelloOuterDiv.value = createdBoardResponse.createdBoard._id;

      let trelloDiv = null;
      if (document.getElementById('inner-div') === null) {
        trelloDiv = document.getElementById('board');
      } else {
        trelloDiv = document.getElementById('inner-div');
      }
      const boardDiv = document.createElement('div');
      const deleteicon = document.createElement('span');
      deleteicon.classList.add('delete-icon');
      deleteicon.value = createdBoardResponse.createdBoard._id;
      deleteicon.appendChild(document.createTextNode('X'));
      deleteicon.onclick = function() { deleteBoard(this.value); };

      boardDiv.classList.add('trello-div');
      boardDiv.value = createdBoardResponse.createdBoard._id;
      // boardDiv.id = createdBoardResponse.createdBoard._id;
      boardDiv.onclick = function() { getListOfCardLIST(this.value, createdBoardResponse.createdBoard.boardtitle); };
      const boardtitlePara = document.createElement('p').appendChild(document.createTextNode(`BOARD TITLE- ${createdBoardResponse.createdBoard.boardtitle}`));
      const lineBreak = document.createElement('br');
      const boarddescriptionPara = document.createElement('p').appendChild(document.createTextNode(`BOARD DESCRIPTION- ${createdBoardResponse.createdBoard.boarddescription}`));
      trelloOuterDiv.appendChild(deleteicon);
      // boardDiv.appendChild(deleteicon);
      boardDiv.appendChild(boardtitlePara);
      boardDiv.appendChild(lineBreak);
      boardDiv.appendChild(boarddescriptionPara);
      trelloOuterDiv.appendChild(boardDiv);
      trelloDiv.appendChild(trelloOuterDiv);
    });
  });
};

// function to create card list--------------------------------
const createCard = (cardtitle, carddescription, boardid) => {
  fetch(`${BACKEND_URL}api/trello/board/${boardid}/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      cardtitle,
      carddescription,
    }),
  }).then((response) => {
    response.json().then((createdCardResponse) => {
      let cardListDiv = null;
      if (document.getElementById('card-list-div') === null) {
        cardListDiv = document.getElementById('cardlist-view');
      } else {
        cardListDiv = document.getElementById('card-list-div');
      }
      const deleteicon = document.createElement('span');
      deleteicon.classList.add('delete-icon');
      deleteicon.value = createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1]._id;
      deleteicon.appendChild(document.createTextNode('X'));
      deleteicon.onclick = function() { deleteCard(boardid, this.value); };

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card-div');
      cardDiv.classList.add('droptarget');
      cardDiv.value = createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1]._id;
      cardDiv.id = createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1]._id;

      const cardtitlePara = document.createElement('p').appendChild(document.createTextNode(`CARD TITLE- ${createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1].cardtitle}`));
      const lineBreak = document.createElement('br');
      const carddescriptionPara = document.createElement('p').appendChild(document.createTextNode(`CARD DESCRIPTION- ${createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1].carddescription}`));
      cardDiv.appendChild(deleteicon);
      cardDiv.appendChild(cardtitlePara);
      cardDiv.appendChild(lineBreak);
      cardDiv.appendChild(carddescriptionPara);

      // adding input box and button starts
      const addInputCardItemDiv = document.createElement('div');
      addInputCardItemDiv.classList.add('add-input-carditem-div');
      const addCardItemInput = document.createElement('input');
      addCardItemInput.setAttribute('type', 'text');
      addCardItemInput.setAttribute('placeholder', 'Enter Card Item');
      addCardItemInput.id = `card-input-id-${createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1]._id}`;
      addInputCardItemDiv.appendChild(addCardItemInput);
      const addCardItemButton = document.createElement('button');
      addCardItemButton.value = createdCardResponse.updatedBoard.cards[createdCardResponse.updatedBoard.cards.length - 1]._id;
      addCardItemButton.innerHTML = 'Add list item';
      addCardItemButton.onclick = function() { addCardItem(boardid, this.value); };
      cardDiv.appendChild(addInputCardItemDiv);
      cardDiv.appendChild(addCardItemButton);
      // adding input box and button ends
      cardListDiv.appendChild(cardDiv);
    });
  });
};

const addMembers = (userid, boardid) => {
  fetch(`${BACKEND_URL}api/trello/board/${boardid}/addmember`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      userid,
    }),
  }).then((response) => {
    response.json().then((resJson) => {
      if (resJson.doc.members.includes(userid)) {
        document.getElementById('user-added-msg').innerHTML = 'Member added successfully.';
      } else {
        document.getElementById('user-added-msg').innerHTML = 'Member not added.';
      }
    });
  });
};

function getListOfCardLIST(boardid, boardtitle) {
  fetch(`${BACKEND_URL}api/trello/board/card/page`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    return response.text();
  }).then((htmlFileResponse) => {
    document.body.innerHTML = '';
    document.write(htmlFileResponse);
    document.getElementById('list-board-id').value = boardid;
  }).then(() => {
    fetch(`${BACKEND_URL}api/trello/board/${boardid}/card`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    }).then((response) => {
      if (response.status !== 404) {
        response.json().then((responseJson) => {
          const cardListViewBody = document.getElementById('cardlist-view');
          const cardListDiv = document.createElement('div');
          cardListDiv.id = 'card-list-div';
          for (let i = 0; i < responseJson.cards.length; i++) {
            const deleteicon = document.createElement('span');
            deleteicon.classList.add('delete-icon');
            deleteicon.value = responseJson.cards[i]._id;
            deleteicon.appendChild(document.createTextNode('X'));
            deleteicon.onclick = function() { deleteCard(boardid, this.value); };

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card-div');
            cardDiv.classList.add('droptarget');
            cardDiv.value = responseJson.cards[i]._id;
            cardDiv.id = responseJson.cards[i]._id;
            const cardtitlePara = document.createElement('p').appendChild(document.createTextNode(`CARD TITLE- ${responseJson.cards[i].cardtitle}`));
            const lineBreak = document.createElement('br');
            const carddescriptionPara = document.createElement('p').appendChild(document.createTextNode(`CARD DESCRIPTION- ${responseJson.cards[i].carddescription}`));
            cardDiv.appendChild(deleteicon);
            cardDiv.appendChild(cardtitlePara);
            cardDiv.appendChild(lineBreak);
            cardDiv.appendChild(carddescriptionPara);

            // adding card items starts
            // const cardidElement = document.getElementById(cardid);
            let cardDivItem = null;
            for (let j = 0; j < responseJson.cards[i].carditems.length; j++) {
              cardDivItem = document.createElement('div');
              cardDivItem.classList.add('card-item-class');
              cardDivItem.id = responseJson.cards[i].carditems[j]._id;
              cardDivItem.value = responseJson.cards[i].carditems[j]._id;
              cardDivItem.setAttribute('card-id', responseJson.cards[i]._id);
              cardDivItem.setAttribute('draggable', true);
              cardDivItem.appendChild(document.createTextNode(responseJson.cards[i].carditems[j].carditem));
              // adding delete button
              const deleteCardItem = document.createElement('span');
              deleteCardItem.classList.add('delete-card-item');
              deleteCardItem.value = responseJson.cards[i].carditems[j]._id;
              deleteCardItem.id = responseJson.cards[i].carditems[j]._id;
              deleteCardItem.appendChild(document.createTextNode('X'));

              deleteCardItem.setAttribute('card-id', responseJson.cards[i]._id);
              deleteCardItem.onclick = function() { deleteCardItemFromCard(boardid, deleteCardItem.getAttribute('card-id'), this.value); };
              cardDivItem.appendChild(deleteCardItem);
              cardDiv.appendChild(cardDivItem);
            }
            // adding acrd items ends

            // adding input box and button starts
            const addInputCardItemDiv = document.createElement('div');
            addInputCardItemDiv.classList.add('add-input-carditem-div');
            const addCardItemInput = document.createElement('input');
            addCardItemInput.setAttribute('type', 'text');
            addCardItemInput.setAttribute('placeholder', 'Enter Card Item');
            addCardItemInput.id = `card-input-id-${responseJson.cards[i]._id}`;
            addInputCardItemDiv.appendChild(addCardItemInput);
            const addCardItemButton = document.createElement('button');
            addCardItemButton.value = responseJson.cards[i]._id;
            addCardItemButton.innerHTML = 'Add list item';
            addCardItemButton.onclick = function() { addCardItem(boardid, this.value); };
            cardDiv.appendChild(addInputCardItemDiv);
            cardDiv.appendChild(addCardItemButton);
            // adding input box and button ends
            cardListDiv.appendChild(cardDiv);
          }
          cardListViewBody.appendChild(cardListDiv);
        });
      }
      document.getElementById('list-board-id').innerHTML = boardid;
      document.getElementById('board-name').innerHTML = `Board Title - ${boardtitle}`;
    });
  });
}

function deleteBoard(boardid) {
  fetch(`${BACKEND_URL}api/trello/board/${boardid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    response.json().then((deleteResponse) => {
      const elem = document.getElementById(boardid);
      elem.parentNode.removeChild(elem);
    });
  });
}

function deleteCard(boardid, cardid) {
  fetch(`${BACKEND_URL}api/trello/board/${boardid}/card/${cardid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    response.json().then((deleteResponse) => {
      const elem = document.getElementById(cardid);
      elem.parentNode.removeChild(elem);
    });
  });
}

function addCardItem(boardid, cardid) {
  const carditem = document.getElementById(`card-input-id-${cardid}`).value;
  // const pattern = /\s/g;
  if (carditem === '' || carditem === null || !carditem.replace(/\s/g, '').length) {
    return;
  }
  fetch(`${BACKEND_URL}api/trello/board/${boardid}/card/${cardid}/addcarditem`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      carditem,
    }),
  }).then((response) => {
    response.json().then((resJson) => {
      const cardidElement = document.getElementById(cardid);
      const cardDivItem = document.createElement('div');
      cardDivItem.classList.add('card-item-class');
      cardDivItem.id = resJson.carditem._id;
      cardDivItem.value = resJson.carditem._id;
      cardDivItem.setAttribute('card-id', cardid);
      cardDivItem.setAttribute('draggable', true);
      cardDivItem.appendChild(document.createTextNode(resJson.carditem.carditem));
      // adding delete button
      const deleteCardItem = document.createElement('span');
      deleteCardItem.classList.add('delete-card-item');
      deleteCardItem.appendChild(document.createTextNode('X'));
      deleteCardItem.id = resJson.carditem._id;
      deleteCardItem.value = resJson.carditem._id;
      deleteCardItem.setAttribute('card-id', cardid);
      deleteCardItem.onclick = function() { deleteCardItemFromCard(boardid, deleteCardItem.getAttribute('card-id'), this.value); };
      cardDivItem.appendChild(deleteCardItem);

      cardidElement.appendChild(cardDivItem);
    });
  });
}

function deleteCardItemFromCard(boardid, cardid, carditemid) {
  fetch(`${BACKEND_URL}api/trello/board/${boardid}/card/${cardid}/carditem/${carditemid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    response.json().then((deleteResponse) => {
      const elem = document.getElementById(carditemid);
      elem.parentNode.removeChild(elem);
    });
  });
}

/* Drag and drop implementation */
/* Event fired on the drag target */
document.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('drag-card-item-id', event.target.id);
  event.dataTransfer.setData('drag-card-item-fromcardid', event.target.getAttribute('card-id'));
  event.dataTransfer.setData('drag-card-item-value', event.target.textContent);
});

/* Events fired on the drop target */
document.addEventListener('dragover', (event) => {
  event.preventDefault();
});

document.addEventListener('drop', (event) => {
  event.preventDefault();
  const boardid = document.getElementById('list-board-id').value;
  const dragCardItemId = event.dataTransfer.getData('drag-card-item-id');
  const dragFromCardId = event.dataTransfer.getData('drag-card-item-fromcardid');
  const dragToCardId = event.target.id;
  let dragCardItemValue = event.dataTransfer.getData('drag-card-item-value');
  dragCardItemValue = dragCardItemValue.slice(0, -1);
  // console.log('boardid-', boardid, 'dragCardItemId-', dragCardItemId, 'dragFromCardId-', dragFromCardId, 'dragToCardId-', dragToCardId, 'dragCardItemValue-', dragCardItemValue);
  if (dragFromCardId === dragToCardId) {
    event.target.appendChild(document.getElementById(dragCardItemId));
    return;
  }
  event.stopPropagation();
  implementDragAndDropInDatabase(boardid, dragFromCardId, dragToCardId, dragCardItemId, dragCardItemValue);
  event.target.appendChild(document.getElementById(dragCardItemId));
  event.stopPropagation();
});

function implementDragAndDropInDatabase(boardid, dragFromCardId, dragToCardId, dragCardItemId, dragCardItemValue) {
  fetch(`${BACKEND_URL}api/trello/board/${boardid}/fromcard/${dragFromCardId}/tocard/${dragToCardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      dragCardItemValue,
      dragCardItemId,
    }),
  }).then((response) => {
    // console.log('drag drop-', response);
  });
}

export { getTrelloPage, createBoard, createCard, addMembers };

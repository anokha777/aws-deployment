import {
  userLogin, logoutUser, getRegistrationPage, userRegistration, getHomePage, redirectHomePage,
} from './user/user.js';
import { getNotePage, createNote, updateNote } from './note/notes.js';
import { getTrelloPage, createBoard, createCard, addMembers } from './trello/trello.js';
import { getSlackChannelPage, createChannel, sendMessage } from './slack/slack.js';
import '../css/user.css';
import '../css/note.css';
import '../css/trello.css';
import '../css/slack.css';

window.userloginui = function (username, passpord) {
  userLogin(username, passpord);
};

window.logoutUserui = function () {
  logoutUser();
};

window.redirectHomePageui = function () {
  redirectHomePage();
};

window.getRegistrationPageui = function () {
  getRegistrationPage();
};

window.userRegistrationui = function (username, password) {
  userRegistration(username, password);
};

window.getHomePageui = function () {
  getHomePage();
};

window.getNotePageui = function () {
  getNotePage();
};

window.createNoteui = function (notetitle, notedescription) {
  createNote(notetitle, notedescription);
};

window.updateNoteui = function (notedescription, notedetails) {
  updateNote(notedescription, notedetails);
};

window.getTrelloPageui = function () {
  getTrelloPage();
};

window.createBoardui = function (boardtitle, boarddescription) {
  createBoard(boardtitle, boarddescription);
};

window.createCardui = function (cardtitle, carddescription, boardid) {
  if (cardtitle !== '' && carddescription !== '') {
    createCard(cardtitle, carddescription, boardid);
  }
};

window.getSlackChannelPageui = function () {
  getSlackChannelPage();
};

window.createChannelui = function (channeltitle, channeldescription) {
  createChannel(channeltitle, channeldescription);
};

window.sendMessageui = function (message, channelid) {
  sendMessage(message, channelid);
};

window.addMembersui = function (userid, boardid) {
  addMembers(userid, boardid);
};

import { BACKEND_URL } from '../constants/constant.js';
// import { updateNote } from '../../../api/controller/note/note-controller.js';

const getNotePage = () => {
  fetch(`${BACKEND_URL}api/note/page`, {
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
    fetch(`${BACKEND_URL}api/note`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    }).then((notesResponse) => {
      notesResponse.json().then((notesArray) => {
        const body = document.getElementById('note-list');
        const tbl = document.createElement('table');
        tbl.style.width = '100%';
        tbl.setAttribute('border', '1');
        tbl.id = 'note-table-id';
        const thead = document.createElement('thead');
        thead.appendChild(document.createElement('th')).appendChild(document.createTextNode('Select to Edit'));
        thead.appendChild(document.createElement('th')).appendChild(document.createTextNode('Title'));
        thead.appendChild(document.createElement('th')).appendChild(document.createTextNode('Description'));
        thead.appendChild(document.createElement('th')).appendChild(document.createTextNode('Create/Update Date'));
        thead.appendChild(document.createElement('th')).appendChild(document.createTextNode('Completed?'));
        tbl.appendChild(thead);

        const tbdy = document.createElement('tbody');
        for (let i = 0; i < notesArray.notes.length; i++) {
          const tr = document.createElement('tr');
          const td0 = document.createElement('td');
          const td1 = document.createElement('td');
          const td2 = document.createElement('td');
          const td3 = document.createElement('td');
          const td4 = document.createElement('td');

          const radioBtn = document.createElement('input');
          radioBtn.type = "radio";
          radioBtn.name = "note";
          radioBtn.value = notesArray.notes[i]._id;
          radioBtn.value = `${notesArray.notes[i]._id}|${notesArray.notes[i].notetitle}|${notesArray.notes[i].notedescription}|${notesArray.notes[i].iscompleted}`;
          radioBtn.onclick = function() { populateUpdateForm(this.value) }

          const button = document.createElement('button');
          button.innerHTML = notesArray.notes[i].iscompleted;
          button.value = notesArray.notes[i]._id +'|'+ notesArray.notes[i].notetitle +'|'+ notesArray.notes[i].notedescription +'|'+ notesArray.notes[i].iscompleted;
          button.onclick = function() { updateIsCompleted(this.value); };

          td0.appendChild(radioBtn);
          td1.appendChild(document.createTextNode(notesArray.notes[i].notetitle));
          td2.appendChild(document.createTextNode(notesArray.notes[i].notedescription));
          td3.appendChild(document.createTextNode(notesArray.notes[i].createorupdatetime));
          td4.appendChild(button);
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        body.appendChild(tbl);
      });
    });
  });
};

const createNote = (notetitle, notedescription) => {
  fetch(`${BACKEND_URL}api/note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      notetitle,
      notedescription,
    }),
  }).then((response) => {
    response.json().then((createdNoteJson) => {
      const tbdy = document.getElementById('note-table-id');
      const tr = document.createElement('tr');
      const td0 = document.createElement('td');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      const td4 = document.createElement('td');

      const radioBtn = document.createElement('input');
      radioBtn.type = "radio";
      radioBtn.name = "note";
      radioBtn.value = `${createdNoteJson.createdNote._id}|${createdNoteJson.createdNote.notetitle}|${createdNoteJson.createdNote.notedescription}|${createdNoteJson.createdNote.iscompleted}`;
      radioBtn.onclick = function() { populateUpdateForm(this.value) }

      const button = document.createElement('button');
      button.innerHTML = createdNoteJson.createdNote.iscompleted;
      button.value = createdNoteJson.createdNote._id +'|'+ createdNoteJson.createdNote.notetitle +'|'+ createdNoteJson.createdNote.notedescription +'|'+ createdNoteJson.createdNote.iscompleted;
      button.onclick = function() { updateIsCompleted(this.value); };

      td0.appendChild(radioBtn);
      td1.appendChild(document.createTextNode(createdNoteJson.createdNote.notetitle));
      td2.appendChild(document.createTextNode(createdNoteJson.createdNote.notedescription));
      td3.appendChild(document.createTextNode(createdNoteJson.createdNote.createorupdatetime));
      td4.appendChild(button);
      tr.appendChild(td0);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tbdy.appendChild(tr);
    });
  });
};

const updateNote = (updatedNotedescription, notedetails) => {
  const noteDetailArray = notedetails.split('|');
  fetch(`${BACKEND_URL}api/note/${noteDetailArray[0]}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      notetitle: noteDetailArray[1],
      notedescription: updatedNotedescription,
      iscompleted: noteDetailArray[3],
    }),
  }).then((response) => {
    response.json().then((responseJson) => {
      if (responseJson.message === 'Update successful!') {
        console.log('updated ------', responseJson.message);
      }
    });
  });
};

function updateIsCompleted(noteDetail) {
  const noteDetailArray = noteDetail.split('|');
  let iscompletedVar = true;
  if (String(noteDetailArray[3]) === 'true') {
    iscompletedVar = false;
  }
  fetch(`${BACKEND_URL}api/note/${noteDetailArray[0]}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      notetitle: noteDetailArray[1],
      notedescription: noteDetailArray[2],
      iscompleted: iscompletedVar,
    }),
  }).then((response) => {
    response.json().then((responseJson) => {
      if (responseJson.message === 'Update successful!') {
        console.log('updated ------', responseJson.message);
      }
    });
  });
}

function populateUpdateForm(notedetails) {
  const notedetailsArray = notedetails.split('|');
  document.getElementById('notetitle-to-update').value = notedetailsArray[1];
  document.getElementById('notedescription-to-update').value = notedetailsArray[2];
  document.getElementById('update-note-button').value = notedetails;
}

export { getNotePage, createNote, updateNote };

import { BACKEND_URL } from '../constants/constant.js';

const getSlackChannelPage = () => {
  fetch(`${BACKEND_URL}api/slack/channel/page`, {
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
    fetch(`${BACKEND_URL}api/slack`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    }).then((channelsResponse) => {
      channelsResponse.json().then((channelsArray) => {
        const channelBody = document.getElementById('channel');
        const wrappingchannelDiv = document.createElement('div');
        wrappingchannelDiv.id = 'inner-channel-div';
        for (let i = 0; i < channelsArray.channels.length; i++) {
          const deleteicon = document.createElement('div');
          deleteicon.classList.add('delete-icon');
          deleteicon.value = channelsArray.channels[i]._id;
          deleteicon.appendChild(document.createTextNode('X'));
          deleteicon.onclick = function() { deleteChannel(this.value); };

          const channelDiv = document.createElement('div');
          channelDiv.classList.add('channel-div');
          channelDiv.value = channelsArray.channels[i]._id;
          channelDiv.id = channelsArray.channels[i]._id;
          channelDiv.onclick = function() { getListOfChannelMessages(this.value); };
          const channeltitlePara = document.createElement('p').appendChild(document.createTextNode(`Channel Title- ${channelsArray.channels[i].channeltitle}`));
          const channeldescriptionPara = document.createElement('p').appendChild(document.createTextNode(`Channel Description- ${channelsArray.channels[i].channeldescription}`));
          channelDiv.appendChild(deleteicon);
          channelDiv.appendChild(channeltitlePara);
          channelDiv.appendChild(channeldescriptionPara);
          wrappingchannelDiv.appendChild(channelDiv);
        }
        channelBody.appendChild(wrappingchannelDiv);
      });
    });
  });
};

const createChannel = (channeltitle, channeldescription) => {
  fetch(`${BACKEND_URL}api/slack`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      channeltitle,
      channeldescription,
    }),
  }).then((response) => {
    response.json().then((createdChannelResponse) => {
      const wrappingchannelDiv = document.getElementById('inner-channel-div');
      const channelDiv = document.createElement('div');
      const deleteicon = document.createElement('div');
      deleteicon.classList.add('delete-icon');
      deleteicon.value = createdChannelResponse.createdChannel._id;
      deleteicon.appendChild(document.createTextNode('X'));
      deleteicon.onclick = function() { deleteChannel(this.value); };

      channelDiv.classList.add('channel-div');
      channelDiv.value = createdChannelResponse.createdChannel._id;
      channelDiv.id = createdChannelResponse.createdChannel._id;
      const channeltitlePara = document.createElement('p').appendChild(document.createTextNode(`Channel Title- ${createdChannelResponse.createdChannel.channeltitle}`));
      const channeldescriptionPara = document.createElement('p').appendChild(document.createTextNode(`Channel Description- ${createdChannelResponse.createdChannel.channeldescription}`));
      channelDiv.appendChild(deleteicon);
      channelDiv.appendChild(channeltitlePara);
      channelDiv.appendChild(channeldescriptionPara);
      wrappingchannelDiv.appendChild(channelDiv);
    });
  });
};

const sendMessage = (chmessage, channelid) => {
  fetch(`${BACKEND_URL}api/slack/channel/${channelid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
    body: JSON.stringify({
      chmessage,
    }),
  }).then((response) => {
    response.json().then((createdMessageResponse) => {
      const wrappingchanneMessagelDiv = document.getElementById('channel-messge-div');
      const channelMessageDiv = document.createElement('div');
      channelMessageDiv.classList.add('channel-message-div');
      channelMessageDiv.value = createdMessageResponse.updatedChannel.chmessage[createdMessageResponse.updatedChannel.chmessage.length -1]._id;
      channelMessageDiv.id = createdMessageResponse.updatedChannel.chmessage[createdMessageResponse.updatedChannel.chmessage.length -1]._id;
      const channeltitlePara = document.createElement('p').appendChild(document.createTextNode(`## ${createdMessageResponse.updatedChannel.chmessage[createdMessageResponse.updatedChannel.chmessage.length -1].chmessage}`));
      channelMessageDiv.appendChild(channeltitlePara);
      wrappingchanneMessagelDiv.appendChild(channelMessageDiv);
    });
  });
};

function getListOfChannelMessages(channelid) {
  fetch(`${BACKEND_URL}api/slack/channel/message/page`, {
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
  }).then(() => {
    fetch(`${BACKEND_URL}api/slack/channel/${channelid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    }).then((response) => {
      response.json().then((responseJson) => {
        const channelMessageViewBody = document.getElementById('channel-msg');
        const channelMessageListDiv = document.createElement('div');
        channelMessageListDiv.id = 'channel-messge-div';
        for (let i = 0; i < responseJson.channel[0].chmessage.length; i++) {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('channel-message-div'); 
          messageDiv.value = responseJson.channel[0].chmessage[i]._id;
          messageDiv.id = responseJson.channel[0].chmessage[i]._id;
          const carddescriptionPara = document.createElement('p').appendChild(document.createTextNode(`## ${responseJson.channel[0].chmessage[i].chmessage}`));
          messageDiv.appendChild(carddescriptionPara);
          channelMessageListDiv.appendChild(messageDiv);
        }
        channelMessageViewBody.appendChild(channelMessageListDiv);
        document.getElementById('send-message-button-id').value = channelid;
      });
    });
  });
}

function deleteChannel(channelid) {
  fetch(`${BACKEND_URL}api/trello/board/${channelid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    response.json().then((deleteResponse) => {
      const elem = document.getElementById(channelid);
      elem.parentNode.removeChild(elem);
    });
  });
}

export { getSlackChannelPage, createChannel, sendMessage };

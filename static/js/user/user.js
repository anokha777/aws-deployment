import { BACKEND_URL } from '../constants/constant.js';
// user logs in and render home page
const userLogin = (username, passpord) => {
  fetch(`${BACKEND_URL}user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      passpord,
    }),
  }).then((response) => {
    response.json().then((jsonResponse) => {
      if (jsonResponse.token !== undefined) {
        if(document.cookie === 'access_token =') {
          document.cookie = document.cookie + jsonResponse.token;
        } else {
          document.cookie = `access_token = ${jsonResponse.token}`;
        }
        
        fetch(`${BACKEND_URL}user/home`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie.split('=')[1]}`,
          },
        }).then((response1) => {
          return response1.text();
        }).then((res) => {
          document.body.innerHTML = '';
          document.write(res);
        });
      }
    });
  });
};

// redirect home page
const redirectHomePage = () => {
  fetch(`${BACKEND_URL}user/home`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response1) => {
    return response1.text();
  }).then((res) => {
    document.body.innerHTML = '';
    document.write(res);
  });
};

// logout user
const logoutUser = () => {
  fetch(`${BACKEND_URL}user/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response) => {
    return response.text();
  }).then((res) => {
    document.body.innerHTML = '';
    deleteCookie('access_token', '', -1);
    document.write(res);
  });
};

function deleteCookie(name, value, days) {
  const expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `; expires= ${date.toGMTString()}`;
  }
  document.cookie = `${name} = ${value} ${expires} ; path=/`;
}

const getRegistrationPage = () => {
  fetch(`${BACKEND_URL}user/registerform`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    response.json().then((jsonResponse) => {
      document.getElementById('loginform').style.display = 'none';
      const regForm = document.getElementById('registerationform');
      regForm.insertAdjacentHTML('afterEnd', jsonResponse.htmlTeplate);
    });
  });
};

const userRegistration = (username, password) => {
  fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => {
    response.json().then((jsonResponse) => {
      document.getElementById('loginform').style.display = 'none';
      const regSucc = document.getElementById('registerSuccess');
      regSucc.insertAdjacentHTML('afterEnd', jsonResponse.htmlTeplate);
    });
  });
};

const getHomePage = () => {
  fetch(`${BACKEND_URL}user/home`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  }).then((response1) => {
    return response1.text();
  }).then((res) => {
    document.body.innerHTML = '';
    document.write(res);
  });
};

export {
  userLogin, logoutUser, getRegistrationPage, userRegistration, getHomePage, redirectHomePage,
};

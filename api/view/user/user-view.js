// exports.loginform = `<div id="loginform" class="loginform">
// <h1>Login</h1> <br>
// <form action="/user/login" method="POST">
//     Users ID: <input name="username" type="text" placeholder="User name"> <br><br>
//     Password: <input name="password" type="password" placeholder="Password"> <br><br>
//     <button type="submit">Login</button>
// </form>

// <h4>DO have account, please register using below button.</h4> <br>
// <form action="/user/registerform" method="GET">
//     <button type="submit">Register</button>
// </form>
// </div>`;

exports.successregistration = `<div id="successregistration" class="successregistration">
<h4>You are Register successfully, Please login.</h4>`;
// `<div id="successregistration" class="successregistration">
// <h4>You are Register successfully, Please login using below button</h4> <br>
// <form action="/" method="GET">
//     <button type="submit">Login</button>
// </form>`

exports.registrationForm = `<div id="registerform" class="registerform">
<h1>Registration</h1> <br>
<form method="POST">
    Users ID: <input name="username" id="regusername" type="text" placeholder="User name"> <br><br>
    Password: <input name="password" id="regpassword" type="password" placeholder="Password"> <br><br>
    <button type="button" onclick="userRegistrationui(document.getElementById('regusername').value, document.getElementById('regpassword').value)">Register</button>
</form>

<h4>Already has account ?</h4> <br>
<form action="/" method="GET">
    <button type="submit">Login</button>
</form>
</div>`;

$(document).ready(function () {
    console.log("I am working");
    const $submitBtn = $("#submit-btn");
    let $userEmail = $("#user-email"); // get user email
    let $userPwd = $("#user-pwd"); // get user password

    let newUrl = "";
    $submitBtn.on('click', e => {
        let email = $userEmail.val();
        let pwd = $userPwd.val();

        $.get('http://localhost:3000/admin?password=' + pwd + '&email=' + email, function (data, status) {
            if (email === data[0].email && pwd === data[0].password) {
                location.replace("app.html");
            }
        });
        e.preventDefault();
    });
});
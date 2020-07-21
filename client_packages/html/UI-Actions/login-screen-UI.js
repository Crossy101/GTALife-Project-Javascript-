$(".btn-GTALogin").click(() => {
    var usernameInput = $("#usernamediv").val();
    var passwordInput = $("#passworddiv").val();

    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();
    

    var usernameValidated = false;
    var passwordValidated = false;

    if(usernameInput.length < 6)
    {
        $(".usernameincorrect small").text("Your username must have at least 6 characters").css({"color": "red"});
    }
    else
    {
        $(".usernameincorrect small").text("");
        usernameValidated = true;
    }

    if(passwordInput.length < 6)
    {
        $(".passwordincorrect small").text("Your password must have at least 6 characters").css({"color": "red"});
    }
    else
    {
        $(".passwordincorrect small").text("");
        passwordValidated = true;
    }

    if(usernameValidated && passwordValidated)
    {
        var obj = { Username:`${usernameInput}`,
                    Password:`${passwordInput}` };

        var object = btoa(JSON.stringify(obj));
		
        mp.trigger("loginpanel:login", object);
    }

});

$(".btn-GTARegister").click(() => {
    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    mp.trigger("loginpanel:register", "");
});

$(".btn-GTAForgotPass").click(() => {
    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    mp.trigger("loginpanel:forgotpassword", "");
});



$(".btn-GTAResetPassword").click(() => {

    var emailInput = $("#emaildiv").val();
    var usernameInput = $("#usernamediv").val();
	
	console.log(emailInput);
	console.log(usernameInput);

    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    var emailValidated = validateEmail(emailInput);
    var passwordValidated = false;

    if(!emailValidated)
    {
        $(".emailgroup small").text("Your Email is incorrect").css({"color": "red"});
    }
    else
    {
        $(".emailgroup small").text("");
    }

    if(usernameInput.length < 6)
    {
        $(".usernamegroup small").text("Your username must have at least 6 characters").css({"color": "red"});
    }
    else
    {
        $(".usernamegroup small").text("");
        usernameValidated = true;
    }
	
	if(emailValidated && usernameValidated)
	{
        var obj = { 
                    Email:`${emailInput}`,
                    Username:`${usernameInput}`
                  };
        var object = btoa(JSON.stringify(obj));

		mp.trigger("forgotpasspanel:resetpass", object);
	}

});

$(".btn-GTAGoBack").click(() => {
    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    mp.trigger("forgotpasspanel:goback", "");
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


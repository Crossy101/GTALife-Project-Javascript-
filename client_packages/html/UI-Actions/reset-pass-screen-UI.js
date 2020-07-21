if(window.Prototype) {
    delete Object.prototype.toJSON;
    delete Array.prototype.toJSON;
    delete Hash.prototype.toJSON;
    delete String.prototype.toJSON;
}

$(".btn-GTAResetPassword").click(() => {

    var passwordInput = $(".passwordinput").val();
    var passwordConfirmInput = $(".passwordconfirminput").val();

    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    var passwordValidated = false;

    if(passwordInput.length < 6)
    {
        $(".passwordmatch small").text("Your password must have at least 6 characters").css({"color": "red"});
    }
    else
    {
		if(passwordInput == passwordConfirmInput)
		{
			$(".passwordmatch small").text("");
			passwordValidated = true;
		}
		else
		{
			$(".passwordmatch small").text("Both passwords don't match!").css({"color": "red"});
		}
    }
	
	if(passwordValidated)
	{
        var obj = { Password: `${passwordInput}` };
        var object = btoa(JSON.stringify(obj));

		mp.trigger("resetpasspanel:resetpass", object);
	}

});

$(".btn-GTAGoBack").click(() => {
    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    mp.trigger("resetpasspanel:goback");
});


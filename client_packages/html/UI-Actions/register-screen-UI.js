
$(".btn-GTACreateAccount").click(() => {

    var emailInput = $("#emaildiv").val();
    var usernameInput = $("#usernamediv").val();
    var passwordInput = $("#passworddiv").val();

    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    var emailValidated = validateEmail(emailInput);
    var usernameValidated = false;
    var passwordValidated = false;
    var touValidated = $('#TOUCheckbox').prop('checked');

    if(!emailValidated)
    {
        $(".emailincorrect small").text("Your Email is incorrect").css({"color": "red"});
    }
    else
    {
        $(".emailincorrect small").text("");
    }

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

    if(touValidated == false)
    {
        $("#touagreementsmall").text("You must accept the Terms of Use").css({"color": "red"});
    }
    else
    {
        $("#touagreementsmall").text("");
    }

    if(usernameValidated && passwordValidated && emailValidated && touValidated)
    {

        var obj = { 
                    Username:`${usernameInput}`,
                    Password:`${passwordInput}`,
                    Email: `${emailInput}`,
                    TermsOfUse:`${touValidated}` 
                };


        var object = btoa(JSON.stringify(obj));

        mp.trigger("registerpanel:register", object);   
    }
});

$(".btn-GTAGoBack").click(() => {
    //Play Mouse Click Sound
    var mouseclick = $("#myaudiolist")[0];
    mouseclick.play();

    mp.trigger("registerpanel:goback", "");
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


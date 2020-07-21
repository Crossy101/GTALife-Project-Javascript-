$(".btngendermale, .btngenderfemale").change(() => {
    var gendermale = $(".btngendermale").prop("checked");

    console.log(gendermale);
    if(gendermale)
    {
        mp.trigger('charactercreation:changegender', 0);
    }
    else
    {
        mp.trigger('charactercreation:changegender', 1);
    }
    
});

$('.btn-GTACreateCharacter').click(() => {
    var firstname = $('.firstname').val();
    var lastname = $('.lastname').val();
    var nationality = $('.national').val();
    var dateOfBirth = $('.DateOfBirth').val();
    var height = $('.height').val();

    var firstnamevalid = false;
    var lastnamevalid = false;
    var heightvalid = false;

    if(firstname.length < 3)
    {
        $('.firstnamevalidation small').text("Must be more than 2 characters!").css({"color": "red"});
    }
    else
    {
        firstnamevalid = true;
        $('.firstnamevalidation small').text("");
    }

    if(lastname.length < 3)
    {
        $('.lastnamevalidation small').text("Must be more than 2 characters!").css({"color": "red"});
    }
    else
    {
        $('.lastnamevalidation small').text("");
        lastnamevalid = true;
    }

    if(height >= 150 && height <= 210)
    {
        $('.heightvalidation small').text("");
        heightvalid = true;
    }
    else
    {
        $('.heightvalidation small').text("Height must be between 150(cm) and 210(cm)").css({"color": "red"});
    }

    if(firstnamevalid && lastnamevalid && heightvalid)
    {
        var obj = { 
                    FirstName:`${firstname}`,
                    LastName:`${lastname}`,
                    Nationality: `${nationality}`,
                    DateOfBirth: `${dateOfBirth}`,
                    Height:`${height}` 
                };

        var object = btoa(JSON.stringify(obj));
        mp.trigger('charactercreation:charactercomplete', object);
    }
});

function SliderChange(val, facefeature)
{
    mp.trigger('charactercreation:changeface', val, facefeature);
};

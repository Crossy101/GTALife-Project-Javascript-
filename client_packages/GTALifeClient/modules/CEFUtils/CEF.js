var htmlLink = "package://html/UI/";
var currentCEF = null;

function CreateCEFWithMouse(url)
{   
    DeleteCEF();

    currentCEF = mp.browsers.new(url);
    mp.gui.cursor.show(true, true);
}

function CreateCEFWithMouseAndPlayerControl(url)
{
    DeleteCEF();

    currentCEF = mp.browsers.new(url);
    mp.gui.cursor.show(false, true);
}

function DeleteCEF()
{  
    if(currentCEF !== null)
    {
        mp.gui.cursor.show(false, false);
        currentCEF.destroy();
        currentCEF = null;
    }
}

exports = {DeleteCEF, CreateCEFWithMouse, CreateCEFWithMouseAndPlayerControl, htmlLink, currentCEF};
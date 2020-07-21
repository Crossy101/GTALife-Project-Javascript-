var arr = ['0', '1', '2', '3', '4'];
var i = 0;

function ChangeHair(hairstyle)
{
    mp.trigger('charactercreation:changehair', hairstyle);
}

function nextItem() {
    i = i + 1; // increase i by one
    i = i % arr.length; // if we've gone too high, start from `0` again
    ChangeHair(i);
    return arr[i]; // give us back the item of where we are now
}

function prevItem() {
    if (i === 0) { // i would become 0
        i = arr.length; // so put it at the other end of the array
    }
    i = i - 1; // decrease by one
    ChangeHair(i);
    return arr[i]; // give us back the item of where we are now
}

window.addEventListener('load', function () {
    document.getElementById('output').textContent = arr[0]; // initial value
    document.getElementById('prev_button').addEventListener(
        'click', // we want to listen for a click
        function (e) { // the e here is the event itself
            document.getElementById('output').textContent = prevItem();
        }
    );
    
    document.getElementById('next_button').addEventListener(
        'click', // we want to listen for a click
        function (e) { // the e here is the event itself
            document.getElementById('output').textContent = nextItem();
        }
    );
});
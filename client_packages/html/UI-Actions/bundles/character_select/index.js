var newCharacterHtml = `
    <div class="card animated fadeIn" id="FadeInJS" style="min-height: 270px;">
        <div class="card-body elegant-color-dark p-0">
            <button type="button" class="btn-createCharacter btn elegant-color text-white btn-block waves-effect waves-light" style="min-height: 270px">
                <i class="fas fa-user fa-5x mb-3"></i>
                <br><span class="h6 lead">Create<br>Character</span>
            </button>
        </div>
    </div>`;

var lockedCharacterHtml = `
    <div class="card animated fadeIn" id="FadeInJS" style="min-height: 270px;">
        <div class="card-body elegant-color-dark p-0">
            <button type="button" class="btn-lockedChar btn elegant-color text-white btn-block disabled" style="min-height: 270px">
                <i class="fas fa-user-lock fa-5x mb-3"></i>
                <br><span class="h6 lead">Character<br>Locked</span>
            </button>
        </div>
    </div>`;

    
$('body').on('click', '.btn-createCharacter', function () {
    mp.trigger('characterselection:createcharacter');
});

var x = 0;
var classNames = [".firstcharacter", ".secondcharacter", ".thirdcharacter"];

function LoadCharacter(characterDetails, extracharacter)
{ 
    if(x <= 1)
    {   
        if(characterDetails != null)
        {
            $(`${classNames[x]}`).append(`           
                <div class="card animated fadeIn" id="FadeInJS" style="min-height: 270px;">
                    <div class="card-header elegant-color" style="border-bottom: solid 4px #337ab7;">
                        <h6 class="card-title text-white lead mb-1">${characterDetails.FirstName} ${characterDetails.LastName}</h6>
                        <h6 class="grey-text text-monospace mb-0">${characterDetails.Faction}</h6>
                    </div>
                    <div class="card-body elegant-color-dark p-1 text-monospace">

                        <div class="d-flex mb-1 grey-text">
                        <div class="mr-auto p-2">Experience</div>
                        <div class="p-2">${characterDetails.Experience}</div>
                        </div>
                        <div class="d-flex mb-1 grey-text">
                        <div class="mr-auto p-2">Health</div>
                        <div class="p-2">${characterDetails.Health}</div>
                        </div>
                        <div class="d-flex mb-1 grey-text">
                        <div class="mr-auto p-2">Money</div>
                        <div class="p-2">${characterDetails.Money}</div>
                        </div>
                        
                    </div>
                    <div class="card-footer elegant-color p-0">
                        <!-- Card Footer -->
                        <button type="button" class="btn-SelectChar${x} btn unique-color text-white m-0 btn-block waves-effect waves-light">
                            <i class="fas fa-hand-pointer mr-1"></i>Select
                        </button>
                    </div>
                </div>
            `);
        }
        else
        {
            $(`${classNames[x]}`).append(newCharacterHtml);
        }
    }
    else
    {
        if(characterDetails != null & extracharacter == true)
        {
            $(`${classNames[x]}`).append(`           
                <div class="card animated fadeIn" id="FadeInJS" style="min-height: 270px;">
                    <div class="card-header elegant-color" style="border-bottom: solid 4px #337ab7;">
                        <h6 class="card-title text-white lead mb-1">${characterDetails.FirstName} ${characterDetails.LastName}</h6>
                        <h6 class="grey-text text-monospace mb-0">${characterDetails.Faction}</h6>
                    </div>
                    <div class="card-body elegant-color-dark p-1 text-monospace">

                        <div class="d-flex mb-1 grey-text">
                        <div class="mr-auto p-2">Experience</div>
                        <div class="p-2">${characterDetails.Experience}</div>
                        </div>
                        <div class="d-flex mb-1 grey-text">
                        <div class="mr-auto p-2">Health</div>
                        <div class="p-2">${characterDetails.Health}</div>
                        </div>
                        <div class="d-flex mb-1 grey-text">
                        <div class="mr-auto p-2">Money</div>
                        <div class="p-2">${characterDetails.Money}</div>
                        </div>
                        
                    </div>
                    <div class="card-footer elegant-color p-0">
                        <!-- Card Footer -->
                        <button type="button" class="btn-SelectChar1 btn unique-color text-white m-0 btn-block waves-effect waves-light">
                            <i class="fas fa-hand-pointer mr-1"></i>Select
                        </button>
                    </div>
                </div>
            `);
        }
        else if (characterDetails == null && extracharacter == true)
        {
            $(`${classNames[x]}`).append(newCharacterHtml);
        }
        else if (characterDetails == null && extracharacter == false)
        {
            $(`${classNames[x]}`).append(lockedCharacterHtml);
        }
    }
    x++;
}

module.exports = {LoadCharacter: LoadCharacter};

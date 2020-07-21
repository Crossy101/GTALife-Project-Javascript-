var TruckerJobInfo = `
                    <div class="tab-pane fade p-3 text-white-50" id="job2" role="tabpanel">
                    <div class="clearfix">
                            <span class="float-left">XP Requirement:</span>
                            <span class="float-right">500</span>
                        </div>
                        <hr class="mt-1 mb-1" style="border-color: #5f5f5f">
                        <div class="clearfix">
                            <span class="float-left">Job Type:</span>
                            <span class="float-right">Supermarket Food Delivery</span>
                        </div>
                        <hr class="mt-1 mb-1" style="border-color: #5f5f5f">
                        <div class="clearfix">
                            <span class="float-left">Required Vehicle:</span>
                            <span class="float-right">Heavy Truck</span>
                        </div>
                        <hr class="mt-1 mb-1" style="border-color: #5f5f5f">
                        <div class="clearfix">
                            <span class="float-left">Destination:</span>
                            <span class="float-right">Vinewood Hills</span>
                        </div>
                        <hr class="mt-1 mb-1" style="border-color: #5f5f5f">
                        <div class="clearfix">
                            <span class="float-left">Reward:</span>
                            <span class="float-right green-text">$2000</span>
                        </div>
                        <hr class="mt-1 mb-1" style="border-color: #5f5f5f">
                        <div class="text-right">
                            <button type="button" class="btn btn-dark-green btn-sm z-depth-0 mt-3 mb-0 mr-0 ml-0">Accept Delivery</button>
                            <button type="button" class="btn btn-red btn-sm z-depth-0 mt-3 mb-0 mr-0 ml-0 disabled">Not enough XP</button>
                        </div>
                    </div>`

var TruckerJobButton = `
        <button type="button" id="job2-tab" data-toggle="tab" href="#job2" role="tab" class="list-group-item list-group-item-action rounded-0 p-2 text-white-50 btn-elegant remove-border">
            Delivery Mission 2
        </button>`


$( document ).ready(function() {
    $(".btn_OpenTruckerJob").trigger('click');
});

function AddJobButton()
{
    
}

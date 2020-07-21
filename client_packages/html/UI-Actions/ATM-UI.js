$( document ).ready(function() {
    $(".btn-OpenATM").trigger('click');

    LoadATM();
});

var UserBankDetails = null;

function LoadATM(bankdetails)
{
    UserBankDetails = bankdetails;

    $("#BalanceWithdraw").text(`${numberWithCommas(bankdetails.Balance)}`);
    $("#BalanceDeposit").text(`${numberWithCommas(bankdetails.Balance)}`);

    $(".BankIDDeposit").text(`Your bank ID: ${bankdetails.BankAccountID}`);
    $(".BankIDWithdraw").text(`Your bank ID: ${bankdetails.BankAccountID}`);
};

$(".btn-ATMDeposit").click(() => {
    var depositAmount = $(".DepositAmount").val();
    mp.trigger('ATM:deposit', depositAmount);
});

$(".btn-ATMWithdraw").click(() => {
    var withdrawAmount = $(".WithdrawAmount").val();
    mp.trigger('ATM:withdraw', withdrawAmount);
});

function CloseATM()
{
    mp.trigger('ATM:close');
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
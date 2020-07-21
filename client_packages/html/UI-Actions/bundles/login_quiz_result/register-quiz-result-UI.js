$(".GTA-quizFailButton").click(() => {
	mp.trigger("loginquiz:failed");
});

$(".GTA-quizPassButton").click(() => {
	mp.trigger("loginquiz:completed");
});

function SetQuizScore(score)
{
    $(".quizScore").text(`Score: ${score}/9`);
};

module.exports = { SetQuizScore: SetQuizScore }
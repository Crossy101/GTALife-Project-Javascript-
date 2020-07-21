var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

function QuizIntialise()
{
    mp.events.callRemote('loginquiz:intialise');
}
mp.events.add('loginquiz:intialise', QuizIntialise);

function SubmitQuiz(correctAnswers)
{
    mp.events.callRemote('loginquiz:submitanswers', correctAnswers);
}
mp.events.add('loginquiz:submitanswers', SubmitQuiz);

function TakeQuiz()
{
    CEF.DeleteCEF();
    CEF.CreateCEFWithMouse(htmlLink + "Quiz/register-screen-quiz-UI.html");
}
mp.events.add('loginquiz:takequiz', TakeQuiz);

function ShowUIPassed(correctAnswers)
{
    CEF.CreateCEFWithMouse(htmlLink + "Quiz/register-screen-quiz-UI-passed.html");
    currentCEF.execute(`bundle.SetQuizScore(\"${correctAnswers}\")`);
}
mp.events.add('loginquiz:passedquiz', ShowUIPassed);

function ShowUIFailed(correctAnswers)
{
    CEF.CreateCEFWithMouse(htmlLink + 'Quiz/register-screen-quiz-UI-failed.html');
    currentCEF.execute(`bundle.SetQuizScore(\"${correctAnswers}\")`);
}
mp.events.add('loginquiz:failedquiz', ShowUIFailed)

function FailedQuiz()
{
    CEF.DeleteCEF();
    mp.events.callRemote('system:banuser', 0, 0, 1, 0, 'Failed Quiz');
}
mp.events.add('loginquiz:failed', FailedQuiz);

function CompletedQuiz()
{
    mp.gui.chat.push("Completed Quiz!");
    mp.events.call('characterselection:intialise');
}
mp.events.add('loginquiz:completed', CompletedQuiz);


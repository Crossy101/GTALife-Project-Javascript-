const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

const questions = 9;

function QuizIntialise(client)
{
    DBCheckUserDoneQuiz(client);
}
mp.events.add('loginquiz:intialise', QuizIntialise);

function QuizSubmitted(client, answersCorrect)
{
    console.log(`Answers Correct: ${answersCorrect}`);
    if(answersCorrect >= 7)
    {
        DBAddUserToQuiz(client, answersCorrect);
        client.call('loginquiz:passedquiz', [answersCorrect]);
    }
    else
    {
        client.call('loginquiz:failedquiz', [answersCorrect]);
    }
}
mp.events.add('loginquiz:submitanswers', QuizSubmitted);


const Quiz = new Schema({
    _id: {type: String, require: false},
    AccountID: String,
    CorrectAnswers: Number,
    Percentage: Number,
    DateCompleted: Date,
    Valid: Boolean
});

var QuizModel = mongoose.model('QuizInfo', Quiz, 'quizresults');

function DBCheckUserDoneQuiz(client)
{
    console.log(client.getVariable('player:account'));
    let account = JSON.parse(client.getVariable('player:account'));
    DatabaseHelper.GetInstance().GetDocuments('quizresults', 'AccountID', account.AccountID).then(
        (res) => {
            let quizValid = false;
            res.forEach(element => {
                if(element.Valid == true)
                {
                    quizValid = true;
                }
            });

            if(quizValid)
            {
                //Completed Quiz
                client.call('loginquiz:completed');
            }
            else
            {
                //Hasn't completed quiz or needs a retake
                client.call('loginquiz:takequiz');
            }

        },
        (rej) => {
            console.log(rej);
            client.call('loginquiz:takequiz');
        });
}

function DBAddUserToQuiz(client, quizResult)
{
    let quizPercentage = ((100 / questions) * quizResult);

    let account = JSON.parse(client.getVariable("player:account"));
    let newQuizResult = new QuizModel({AccountID: account.AccountID, CorrectAnswers: quizResult, Percentage: quizPercentage, DateCompleted: Date.now(), Valid: true});

    DatabaseHelper.GetInstance().InsertDocuments(newQuizResult, 'quizresults').then(
        (res) => {
            if(res)
            {
                console.log('==> Quiz Added!');
            }
            else
            {
                console.log('==> Quiz Failed to be Added!');
            }
        });
}



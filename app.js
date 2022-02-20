// global variables
let question;
let correctAnswer;
let userAnswer;
let numberOfQuestionsAnswered = 0;
let userScore = 0;
let nextQuestionEnabled = true;
let trueAndFalseEnabled = false;
let bodyClass = null

refreshScoreOnScreen();


// write a fetch request to bring back a question in a p
async function getQuestion(){
    let response = await fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=boolean");
    let data = await response.json();
    console.log(data);
    // retrieve question
    question = document.querySelector('#question');
    question.innerHTML = decodeURIComponent(data.results[0]['question']);
    //retrieve answer
    correctAnswer = data.results[0]['correct_answer'];
    console.log(correctAnswer);
    trueAndFalseEnabled = true;
    nextQuestionEnabled = false;
    bodyClass = null
    refreshScoreOnScreen();
    return correctAnswer;
}

// make btn that fetches---link btn, changing innerText to new Q
let newQuestion = document.querySelector("#new-question");
newQuestion.addEventListener('click', getQuestion);

console.log(correctAnswer)
// Stores answer in 'answer' when submit clicked -- check if answer is correct


function checkAnswerInput(userAnswer) {
    let answer
    if (correctAnswer === "False") {
        answer = false
    }
    if (correctAnswer === "True") {
        answer = true
    }
    if (userAnswer === answer) {
        userScore ++;
        bodyClass = "winner"
    } else {
        bodyClass = "loser"
    }

    numberOfQuestionsAnswered += 1;
    trueAndFalseEnabled = false;
    nextQuestionEnabled = true;
    refreshScoreOnScreen();
}

// Uses the local variables to update the HTML DOM and display the current score

function refreshScoreOnScreen() {
    let scoreTracker = document.querySelector('#scoretracker');
    scoreTracker.innerText = `You have scored ${userScore} out of ${numberOfQuestionsAnswered}`;

    document.querySelector('#truebtn').disabled = !trueAndFalseEnabled;
    document.querySelector('#falsebtn').disabled = !trueAndFalseEnabled;
    document.querySelector('#new-question').disabled = !nextQuestionEnabled;

    document.querySelector('body').className = bodyClass;
}

let truebtn = document.querySelector("#truebtn");
truebtn.addEventListener('click', () => checkAnswerInput(true));

let falsebtn = document.querySelector("#falsebtn");
falsebtn.addEventListener('click', () => checkAnswerInput(false));



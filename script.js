// header section elements
var headerEl = document.getElementById("header");
var viewHighBtnEl = document.getElementById("viewHigh");
var timerEl = document.getElementById("timer");

// intro section elements
var introEl = document.getElementById("intro");
var startBtnEl = document.getElementById("startBtn");

// quiz section elements
var quizEl = document.getElementById("quizSection");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answerChoices");
var choiceResult = document.getElementById("result-info");

// input section elements
var inputEl = document.getElementById("scoreInput");
var finalScoreEl = document.getElementById("score");
var initialEl = document.getElementById("initials");
var submitEl = document.getElementById("submitInitials");

// past score section elements
var prevScoreEl = document.getElementById("prevScores");
var scoreHistoryEl = document.getElementById("score-history");
var backBtnEl = document.getElementById("back-btn");
var clearBtnEl = document.getElementById("clear-btn");

var secondsRemaining = 90;
var interval = 0;
var currIndex = 0;

startBtnEl.addEventListener("click", function () {
    if (interval == 0) {
        interval = setInterval(function () {
            secondsRemaining--;
            timerEl.textContent = secondsRemaining;
            if (secondsRemaining <= 0) {
                clearInterval(interval);
                quizEl.style.display = "none";
                gameOver();
            }
        }, 1000);
    }
    introEl.style.display = "none";
    quizEl.style.display = "block";
    displayQuestion(currIndex);
});

var questions = [
    {
        title: "Commonly used data types DO not include.",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed with _____",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "curly brackets"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
    {
        title: "Arrays in Javascript can be used to store ____",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },

];

function displayQuestion(index) {
    answerEl.innerHTML = "";
    questionEl.textContent = questions[currIndex].title;

    for (let i = 0; i < 4; i++) {
        var choiceContainer = document.createElement("div");
        choiceContainer.classList.add("row");
        var choiceBtn = document.createElement("button");
        choiceBtn.classList.add("btn", "btn-primary", "btn-lg", "btn-block", "mb-3", "text-left")
        choiceBtn.textContent = questions[currIndex].choices[i];
        choiceBtn.addEventListener("click", compare);
        choiceContainer.appendChild(choiceBtn);
        answerEl.appendChild(choiceContainer);
    } 


}

function compare(event) {

    var choice = event.target;
    choiceResult.textContent = "";

    if (choice.textContent == questions[currIndex].answer) {
        choiceResult.textContent = "Correct!"
    } else {
        secondsRemaining -= 10;
        choiceResult.textContent = "Wrong!"
    }

    currIndex += 1;
    if (currIndex >= questions.length) {
        quizEl.style.display = "none";
        choiceResult.textContent = "";
        clearInterval(interval);
        gameOver();
    } else {
        displayQuestion(currIndex);
    }

}

function gameOver() {
    inputEl.style.display = "block";
    finalScoreEl.textContent = secondsRemaining;

    submitEl.addEventListener("click", function() {
        var initials = initialEl.value;
        initialEl.value = "";
        if (initials == null) {
            alert("No value entered");
        } else {
            var finalScore = {
                initial: initials,
                score: secondsRemaining,
            }
            
            if (localStorage.getItem('scoreHistory')== null) {
                localStorage.setItem('scoreHistory', '[]');
            } 
            var scoreHist = JSON.parse(localStorage.getItem('scoreHistory'));
            scoreHist.push(finalScore);

            localStorage.setItem("scoreHistory", JSON.stringify(scoreHist));
        }

        renderHighScore();
        inputEl.style.display = "none";
        headerEl.style.display = "none";
        prevScoreEl.style.display = "block";
    })
}

function renderHighScore() {
    var scoreHist = JSON.parse(localStorage.getItem('scoreHistory'));
    for (var i = scoreHist.length - 1; i > scoreHist.length - 6 && i >= 0; i--) {
        var scoreLi = document.createElement("li");
        scoreLi.style.listStyle = "none";
        scoreLi.innerHTML = scoreHist[i].initial + ": " + scoreHist[i].score;
        scoreHistoryEl.appendChild(scoreLi);
    }
}

clearBtnEl.addEventListener("click", function() {
    localStorage.clear();
    scoreHistoryEl.innerHTML = "";
})

backBtnEl.addEventListener("click", function() {
    currIndex = 0;
    secondsRemaining = 90;
    interval = 0;
    timerEl.textContent = 0;
    prevScoreEl.style.display = "none";
    headerEl.style.display = "block";
    introEl.style.display = "block";
})
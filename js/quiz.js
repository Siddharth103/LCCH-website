// js/quiz.js
let playerName = "";
while (!playerName || playerName.trim() === "") {
    playerName = prompt("Please enter your name:");
}

const socket = io();

// Screen elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

// Quiz elements
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const timerDisplay = document.getElementById('timer').querySelector('span');
const questionCounterDisplay = document.getElementById('question-counter');
const finalScoreDisplay = document.getElementById('final-score');
const difficultyDisplay = document.getElementById('difficulty-display');

// Buttons
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

let score = 0;
let timer;

// --- CORE LOGIC ---

function showWaitingScreen() {
    startScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    document.querySelector('#start-screen h1').textContent = 'Welcome to the Quiz!';
    document.querySelector('#start-screen p').textContent = 'Waiting for the admin to start the event...';
    startButton.style.display = 'none';
}

function runQuiz() {
    score = 0;
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    // The quiz UI is now visible, but waits for the first question
}

function showQuestion(questionData) {
    resetState();
    startTimer(questionData.question); // Start the timer for this question

    // Update question text and counters
    questionCounterDisplay.textContent = `Question ${questionData.questionNumber} / ${questionData.totalQuestions}`;
    questionText.innerText = questionData.question.question;

    // Update difficulty tag
    difficultyDisplay.textContent = questionData.question.difficulty;
    difficultyDisplay.className = 'difficulty-tag';
    difficultyDisplay.classList.add(questionData.question.difficulty);

    // Create and display answer buttons
    const shuffledAnswers = [...questionData.question.answers].sort(() => Math.random() - 0.5);
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    // Find the index of the selected answer
    const answerIndex = Array.from(answerButtons.children).indexOf(selectedButton);

    // Send the answer to the server
    socket.emit('submit-answer', {
        name: playerName,
        answerIndex: answerIndex
    });

    // Show correct/wrong status to the user
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function startTimer(question) {
    let timeLeft;
    switch (question.difficulty) {
        case "easy": timeLeft = 30; break;
        case "medium": timeLeft = 45; break;
        case "hard": timeLeft = 60; break;
        default: timeLeft = 30;
    }

    timerDisplay.textContent = timeLeft;
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Time's up! Show the correct answer and wait for admin.
             Array.from(answerButtons.children).forEach(button => {
                setStatusClass(button, button.dataset.correct === "true");
                button.disabled = true;
            });
        }
    }, 1000);
}


// --- SOCKET.IO LISTENERS ---

socket.on('quiz-started', () => {
    console.log('Received start signal from server!');
    runQuiz();
});

socket.on('new-question', (questionData) => {
    console.log('Received new question from server:', questionData);
    showQuestion(questionData);
});

socket.on('quiz-over', (data) => {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = score; // Just show local score for now
    alert(data.message);
});

// Initialize the waiting screen
showWaitingScreen();
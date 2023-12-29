document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            question: "What does BMW stand for",
            answers: ["Bayerische Motoren Werke", "Nothing, is just an accronym", "Bavarian Motor Works", "Bavarian Motor Workshop"],
            correctAnswer: "Bayerische Motoren Werke"
        },
        {
            question: "How many BHP does a Bugatti have?",
            answers: ["700", "550", "1500", "1800"],
            correctAnswer: "1500"
        },
        {
            question: "What was the first car that was made?",
            answers: ["Mercedes-Benz", "Ford", "Audi", "Jaguar"],
            correctAnswer: "Mercedes-Benz"
        },
        {
            question: "When was the first Ferrari ever made?",
            answers: ["125 S", " Daytona", "Portofino ", "Purosangue"],
            correctAnswer: "125 S"
        },
        {
            question: "In what year was Tesla founded?",
            answers: ["2010", "2003", "1995", "2006"],
            correctAnswer: "2003"
        }
    ];
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 60;
    const startButton = document.getElementById('start-button');
    const landingPage = document.getElementById('landing-page');
    const quizContainer = document.getElementById('quiz-container');
    const endPage = document.getElementById('end-page');
    const finalScoreElement = document.getElementById('final-score');
    const initialsForm = document.getElementById('initials-form');
    const playAgainButton = document.getElementById('play-again-button');
    const highScoresList = document.getElementById('high-scores-list');
    const timerContainer = document.getElementById('timer-container');
    const timerElement = document.getElementById('timer');
    startButton.addEventListener('click', startQuiz);
    playAgainButton.addEventListener('click', function () {
        resetQuiz();
        startQuiz();
    });

    function startQuiz() {
        landingPage.style.display = 'none';
        quizContainer.style.display = 'block';
        timerContainer.style.display = 'block';
        timer = setInterval(updateTimer, 1000);
        renderQuestion();
    }
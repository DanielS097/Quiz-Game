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


    function renderQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <h2>${currentQuestion.question}</h2>
                <button class="answer-btn">A. ${currentQuestion.answers[0]}</button>
                <button class="answer-btn">B. ${currentQuestion.answers[1]}</button>
                <button class="answer-btn">C. ${currentQuestion.answers[2]}</button>
                <button class="answer-btn">D. ${currentQuestion.answers[3]}</button>
            `;
            quizContainer.innerHTML = '';
            quizContainer.appendChild(questionElement);
            const answerButtons = document.querySelectorAll('.answer-btn');
            answerButtons.forEach(button => {
                button.addEventListener('click', function () {
                    checkAnswer(this.textContent.slice(3));
                });
            });
            updateTimerDisplay();
        } else {
            endQuiz();
        }
    }

    function checkAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
        } else {
            timeLeft -= 10;
            updateTimerDisplay();
        }
        currentQuestionIndex++;
        renderQuestion();
    }
    function updateTimerDisplay() {
        timerElement.textContent = timeLeft;
    }
    function endQuiz() {
        clearInterval(timer);
        quizContainer.style.display = 'none';
        endPage.style.display = 'block';
        finalScoreElement.textContent = calculateScore();
    }
    function calculateScore() {
        return timeLeft;
    }
    function updateTimer() {
        if (timeLeft <= 0) {
            endQuiz();
        }
        updateTimerDisplay();
        timeLeft--;
    }

    initialsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveScore();
    });
    function saveScore() {
        const initialsInput = document.getElementById('initials');
        const initials = initialsInput.value.trim();
        if (initials !== '') {
            const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            const newScore = { initials: initials, score: calculateScore() };
            highScores.push(newScore);
            highScores.sort((a, b) => b.score - a.score);
            localStorage.setItem('highScores', JSON.stringify(highScores));
            displayHighScores(highScores);
        }
    }


const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

// Function to play the correct sound
function playCorrectSound() {
    correctSound.play();
}

// Function to play the incorrect sound
function playIncorrectSound() {
    incorrectSound.play();
}

const questions = [
    {
        question: "Transform the following active voice sentence into passive voice: 'She sings a song.'",
        options: [
            "A song is sung by her.",
            "She is singing a song.",
            "She sang a song.",
            "She will sing a song."
        ],
        answerIndex: 0
    },
    {
        question: "Change the sentence to the past tense: 'He reads a book.'",
        options: [
            "He reads a book.",
            "He read a book.",
            "He will read a book.",
            "He is reading a book."
        ],
        answerIndex: 1
    },
    {
        question: "Make a question from the sentence: 'They are eating lunch.'",
        options: [
            "Are they eat lunch?",
            "Are they eating lunch?",
            "They are eating lunch?",
            "They will eat lunch."
        ],
        answerIndex: 1
    },
    {
        question: "Transform the following active voice sentence into passive voice: 'The chef is preparing a delicious meal.'",
        options: [
            "A delicious meal is being prepared by the chef.",
            "The chef was preparing a delicious meal.",
            "The chef prepared a delicious meal.",
            "A delicious meal will be prepared by the chef."
        ],
        answerIndex: 0
    },
    {
        question: "Change the sentence to the future tense: 'She walks to school.'",
        options: [
            "She walks to school.",
            "She walked to school.",
            "She will walk to school.",
            "She is walking to school."
        ],
        answerIndex: 2
    },
    {
        question: "Change the sentence to a negative form: 'They have completed the project.'",
        options: [
            "They have not completed the project.",
            "They have completed the project not.",
            "They did not have completed the project.",
            "They did have completed the project."
        ],
        answerIndex: 0
    },
    {
        question: "Make a question from the sentence: 'He has finished his homework.'",
        options: [
            "He finished his homework?",
            "Has he finished his homework?",
            "He has finished his homework.",
            "He will finish his homework."
        ],
        answerIndex: 1
    },
    {
        question: "Transform the following active voice sentence into passive voice: 'The company will launch a new product.'",
        options: [
            "A new product will be launched by the company.",
            "The company launched a new product.",
            "The company is launching a new product.",
            "A new product will be launching by the company."
        ],
        answerIndex: 0
    },
    {
        question: "Change the sentence to the present continuous tense: 'I write a letter.'",
        options: [
            "I write a letter.",
            "I wrote a letter.",
            "I am writing a letter.",
            "I will write a letter."
        ],
        answerIndex: 2
    },
    {
        question: "Change the sentence to a negative form: 'She eats ice cream.'",
        options: [
            "She eats ice cream not.",
            "She does not eat ice cream.",
            "She ate ice cream not.",
            "She eating ice cream."
        ],
        answerIndex: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

// Function to start the quiz
function startQuiz() {
    document.getElementById('instructions').style.display = 'none'; // Hide the instructions
    document.getElementById('question-container').style.display = 'block'; // Display the question container
    loadQuestion(); // Load the first question
}

// Add an event listener to the "Start Quiz" button
document.getElementById('start-button').addEventListener('click', startQuiz);

// Function to load and display the current question
function loadQuestion() {
    clearInterval(timer); // Clear the previous timer

    const currentQuestion = questions[currentQuestionIndex];
    const questionText = document.getElementById('question-container');
    const optionsList = document.createElement('div');
    optionsList.id = 'options-list';
    const timerValue = document.getElementById('timer-value'); // Add timer element

    // Clear previous question and options
    questionText.innerHTML = '';
    optionsList.innerHTML = '';

    questionText.textContent = currentQuestion.question;

    // Add options for the current question
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => checkAnswer(index));
        optionsList.appendChild(optionButton);
    });

    questionText.appendChild(optionsList);

    // Start the timer for this question (10 seconds)
    let timeLeft = 10;
    timerValue.textContent = `Time Left: ${timeLeft}`;

    timer = setInterval(function () {
        timeLeft--;
        timerValue.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            checkAnswer(-1); // Timeout (no answer)
        }
    }, 1000);
}

// Function to check the selected answer
// Function to check the selected answer
function checkAnswer(selectedIndex) {
    clearInterval(timer); // Stop the timer

    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answerIndex) {
        playCorrectSound();
        score++; // Increment the score when the answer is correct
    } else {
        playIncorrectSound();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Display the final score or navigate to another screen
        document.getElementById('question-container').innerHTML = `<h2>Quiz Completed</h2><p>Your Score: ${score} out of ${questions.length}</p>`;
    }

    // Update the score display
    document.getElementById('score').textContent = `Score: ${score}`;
}

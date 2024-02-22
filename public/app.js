var questions = [
    {
        question:"Html Stands For _______________",
        options: ["Help Text Makeover Language",
        "HTML",
        "Case Cading Style Sheet",
        "Hypertext Markup language"
        ],
        correctAns: "Hypertext Markup language",
    },
    {
        question:"Css Stands For _______________",
        options: [
            "Casecading Style Sheet",
            "Java",
            "Ram",
            "Hypertext markup language"
        ],
        correctAns: "Casecading Style Sheet",
    },
    {
        question:"Js Stands For _______________",
        options: [
            "Java Style",
            "Java Script",
            "Script",
            "Script Src"
        ],
        correctAns: "Java Script",
    },
    {
        question:"Dom Stands For _______________",
        options: [
            "Document Object Model",
            "html",
            "Css",
            "Java"
        ],
        correctAns: "Document Object Model",
    },
    {
        question:"Ram Stands For _______________",
        options: [
            "Read Only Memory",
            "Dom",
            "Random Acccess Memory",
            "For Pc"
        ],
        correctAns: "Random Acccess Memory",
    },
    {
        question:"Rom Stands For _______________",
        options: [
            "Hyper Text Markup Language",
            "html",
            "HTml",
            "Read Only Memory"
        ],
        correctAns: "Read Only Memory",
    },
];
 
const headingQuizApp = document.getElementById("headng") 
const quizContainer = document.getElementById("quiz")
const resultContainer = document.getElementById("result")
const submitButton = document.getElementById("submit")
const retryButton = document.getElementById("retry")
const showAnswerButton = document.getElementById("showAnswer")

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = questions[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
    
    let quesInc = document.getElementById("quesInc");
    quesInc.className = "questionIncrement"
    quesInc.innerHTML = (currentQuestion + 1 ) + "/" + questions.length
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    quizContainer.appendChild(quesInc);
}

function checkAnswer(){
    const selectedOption = document.querySelector("input[name='quiz']:checked")
    if(selectedOption){
        const answer = selectedOption.value
        if(answer == questions[currentQuestion].correctAns){
            score++
        }
        else{
            incorrectAnswers.push({
            question: questions[currentQuestion].question,
            incorrectAnswer: answer,
            correctAnswer: questions[currentQuestion].correctAns,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    headingQuizApp.innerHTML = "Result"
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    headingQuizApp.innerHTML = "Quiz App"
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    if (incorrectAnswers!=0){
        for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
            <strong>Question: </strong> ${incorrectAnswers[i].question}<br>
            <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
            <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            <hr>
            </p>
        `;
        }
    }else{
        incorrectAnswersHtml = '"Hurrah! No Incorrect Answers"'
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${questions.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
   
}
  

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
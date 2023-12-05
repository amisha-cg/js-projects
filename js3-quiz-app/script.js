const questions = [
    {
        question: "Which is the largest animal in world?",
        answers:[
            { text: "Shark", correct:false},
            { text: "Blue Whale", correct:true},
            { text: "Elephant", correct:false},
            { text: "Giraffe", correct:false}
        ]
    },
    {
        question: "Which is the largest desert in world?",
        answers:[
            { text: "Kalahari", correct:false},
            { text: "Gobi", correct:false},
            { text: "Sahara", correct:false},
            { text: "Antarctica", correct:true}
        ]
    },
    {
        question: "Which is the smallest country in world?",
        answers:[
            { text: "Vatican City", correct:true},
            { text: "Bhutan", correct:false},
            { text: "Nepal", correct:false},
            { text: "Sri Lanka", correct:false}
        ]
    },
    {
        question: "Which is the smallest continent in world?",
        answers:[
            { text: "Asia", correct:false},
            { text: "Australia", correct:true},
            { text: "Arctic", correct:false},
            { text: "Africa", correct:false}
        ]
    }    
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button"); 
const nextBtn = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";    //not needed bacause Next is written in the html code
    showQues();
}

function showQues(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild)
        {
            answerBtn.removeChild(answerBtn.firstChild);
        }
}

// The below function seems to handle the visual feedback for the selected answer, 
// updates the score if it's correct, highlights correct answers, disables all buttons, 
// and shows the "Next" button to proceed to the next question.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;    
    if(currentQuestionIndex < questions.length){
        showQues();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}.`
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}


startQuiz();

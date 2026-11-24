const welcome =
document.querySelector(".welcome");
const instructions =
document.querySelector("#instructions");

const moreBtn =
document.querySelector("#more-btn");
const backBtn=
document.querySelector("#back-btn");

moreBtn.addEventListener("click",function(){
    welcome.style.display ="none";
    instructions.style.display ="block";
});

backBtn.addEventListener("click",function(){
    instructions.style.display ="none";
    welcome.style.display ="block";
});

const startBtn=
document.querySelector("#start-btn");
const quizScreen=
document.querySelector("#quiz-screen");

 const resultScreen=
    document.querySelector("#result-screen");

    const reviewScreen=
    document.querySelector("#review-screen");

    const reviewContent=
    document.querySelector("#review-content");

    const reviewBtn=
    document.querySelector("#review-btn");

    const reviewBackBtn=
    document.querySelector("#review-back-btn");

    const finalSore=
    document.querySelector("#final-score");

    const finalPercentage=
    document.querySelector("#final-percentage");

    const performanceMessage=
    document.querySelector("#performance-message");

    const retryBtn=
    document.querySelector("#retry-btn");

startBtn.addEventListener("click",function(){

    audioContext.resume().then(()=>{
        playClick();
    });

    welcome.style.display="none";
    instructions.style.display="none";
    quizScreen.style.display="block";
    startTimer();
});

const answerButtons=
document.querySelectorAll(".answer-btn");
const nextBtn=document.querySelector("#next-btn");
const questionTitle=
document.querySelector("#Question");
const questionCount=
document.querySelector(
".Question-count");
const optionLetters=
document.querySelectorAll(".option-letter");

const questions=[
    {
        category:"COMPUTER SCIENCE",
        question:"Which language is primarily used to structure a web page?",
        options:["CSS","HTML","PYTHON","JAVASCRIPT"],
        answer:"HTML"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH LANGUAGE IS USED TO STYLE A WEB PAGE?",
        options:["HTML","C++","PYTHON","CSS"],
        answer:"CSS"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH LANGUAGE IS KNOWN FOR ADDING INTERACTIVITY TO WEB PAGES?",
        options:["JAVA","JAVASCRIPT","SQL","C"],
        answer:"JAVASCRIPT"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH COMPANY DEVELOPED THE JAVA PROGRAMMING LANGUAGE?",
        options:["MICROSOFT","SUN MICROSYSYTEM","GOOGLE","APPLE"],
        answer:"SUN MICROSYSYTEM"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHAT DOES CPU STAND FOR?",
        options:["CENTRAL PROCESSING UNIT","COMPUTER PERSONAL UNIT","CENTRAL PROGRAM UTILITY","CONTROL PROCESSING USER"],
        answer:"CENTRAL PROCESSING UNIT"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH DATA STRUCTURE FOLLOWES THE FIFO PRINCIPLE?",
        options:["STACK","TREE","QUEUE","GRAPH"],
        answer:"QUEUE"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH SYMBOL IS USEED FOR SINGLE-LINE COMMENTS IN JAVASCRIPT?",
        options:["<!-- -->","//","**","##"],
        answer:"//"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH HTML TAG IS USED TO CREATE A HYPERLINK?",
        options:["<link>","<a>","<href>","<url>"],
        answer:"<a>"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHICH OF THESE IS A PROGRAMMING LANGUAGE?",
        options:["HTTP","CSS","PYTHON","JPEG"],
        answer:"PYTHON"
    },
    {
        category:"COMPUTER SCIENCE",
        question:"WHAT IS THE BINARY REPRESENTATION OF DECIMEL 2?",
        options:["01","10","11","100"],
        answer:"10"
    }
];
let score=0;
let currentQuestionIndex= 0;
let userAnswers=[];

let timeLeft=20;
let timerInterval;

const countdown=
document.querySelector("#countdown");

const scoreDisplay=
document.querySelector(".score-display");

const progressFill=
document.querySelector(".quiz-progress-fill");

function updateProgress(){
    const progress=
    ((currentQuestionIndex+1)/questions.length)*100;
    progressFill.style.width=progress+"%";
}

    function startTimer(){
       clearInterval(timerInterval);
        timeLeft=20;
         countdown.textContent="00:"+
        String(timeLeft).padStart(2,"0");

        timerInterval=setInterval(function(){
            timeLeft--;
            console.log("Time left:",timeLeft);
            
             countdown.textContent="00:"+
        String(timeLeft).padStart(2,"0");


            if (timeLeft<=0){
                clearInterval(timerInterval);

                answerButtons.forEach(function(button){
                    button.disabled=true;
                });
                nextBtn.click();
            }
        },1000);
    }


answerButtons.forEach(function(button){
    button.addEventListener("click",function(){

       if(button.disabled){
        return;
        }

        const selectedAnswer=button.textContent.trim()
        .replace(/^[A-D]\s*/,"");
        const correctAnswer=
        questions[currentQuestionIndex].answer;

        userAnswers[currentQuestionIndex]={
        selected:selectedAnswer,
        correct:correctAnswer
        };
        clearInterval(timerInterval);

        answerButtons.forEach(function(btn){
            const answer=btn.textContent.trim()
            .replace(/^[A-D]\s*/,"");

            if(answer===correctAnswer){
                btn.classList.add("correct");
            }
        });

    if(selectedAnswer===correctAnswer){
        button.classList.add("correct");
        playCorrect();
        score++;
        scoreDisplay.textContent="SCORE:"+
        String(score).padStart(2,"0");
    }else{
        button.classList.add("wrong");
        playWrong();
    }

    answerButtons.forEach(function(btn){
        btn.disabled=true;
    });
});
})

nextBtn.addEventListener("click",function(){
    playNext();
    currentQuestionIndex++;
    updateProgress();
    startTimer();
    console.log("TIMER FUNCTION CALLED");

    if(currentQuestionIndex<questions.length){
        questionTitle.textContent=
        questions[currentQuestionIndex].question;

        const currentQuestion=
        questions[currentQuestionIndex];

        answerButtons.forEach(function(button,index){
            button.disabled=false;

            button.classList.remove("correct","wrong");
            button.querySelector("span:last-child").textContent
            =
            currentQuestion.options[index];

            button.querySelector(".option-letter").textContent=
            String.fromCharCode(65+index);
  
        });

        questionCount.textContent=
        "QUESTION"+
        String(currentQuestionIndex + 1).padStart(2,"0")+
        "/"+
        String(questions.length).padStart(2,"0");
        updateProgress();
        quizScreen.classList.remove("quiz-slide-in");
        void quizScreen.offsetWidth;
        quizScreen.classList.add("quiz-slide-in");
    }else{
        quizScreen.style.display="none";
        resultScreen.style.display="flex";
        playVictory();
        resultScreen.classList.remove("victory");

        finalSore.textContent=score+"/"+
        questions.length;
       

        const percentage=Math.round(
            (score/questions.length)*100
        );
        const performanceBadge=
        document.querySelector("#performance-badge");

        if(percentage>=90){
            resultScreen.classList.add("victory");

            performanceBadge.textContent="TECHQUEST MASTER";
            performanceBadge.style.borderColor="#C084FC";
            performanceBadge.style.color="#E9D5FF";
        }else if(percentage>=60){
            performanceBadge.textContent="TECHQUEST PRO";
            performanceBadge.style.borderColor="#67E8F9";
            performanceBadge.style.color="#67E8F9";
        }else{
            performanceBadge.textContent="TECHQUEST ROOKIE";
            performanceBadge.style.borderColor="#FCD34D";
            performanceBadge.style.color="#FCD34D"
        }

         if(percentage>=80){
            finalSore.style.color="#4ADE80";
        }else if(percentage>=40){
            finalSore.style.color="#AF65FA";
        }else{
            finalSore.style.color="#F95B5B";
        }

        finalPercentage.textContent=percentage+"% Accuracy";

        if(percentage===100){
            
            performanceMessage.textContent=
            "PERFECT SCORE! You're a TECHQUEST Master!";
        }else if(percentage>=70){
            performanceMessage.textContent=
            "Excellent Work! Keep it Up!";
        }else if(percentage>=40){
            performanceMessage.textContent=
            "Good Effort! Keep Learning!";
        }else{
            performanceMessage.textContent=
            "Keep Practicing! You Can Do it!";
        }
    } //end of the result logic
}); //end of nextBtn event listener

//RETRY QUIZ BUTTON
retryBtn.addEventListener("click",function(){
    currentQuestionIndex=0;
    score=0;
    userAnswers=[];

    scoreDisplay.textContent="SCORE:00";
    resultScreen.style.display="none";
    quizScreen.style.display="block";

    questionTitle.textContent=questions[0].question;

    const currentQuestion=questions[0];

    answerButtons.forEach(function(button,index){
        button.disabled=false;
        button.classList.remove("correct","wrong");

       button.querySelector("span:last-child").textContent=
       currentQuestion.options[index];

       button.querySelector(".option-letter").textContent=
       String.fromCharCode(65 +index);
    });

    questionCount.textContent=
    "QUESTION 01/"+
    String(questions.length).padStart(2,"0");

    updateProgress();
});

const homeBtn=
document.querySelector("#home-btn");

homeBtn.addEventListener("click",function(){

    clearInterval(timerInterval);
    timeLeft=20;
    countdown.textContent="00:20";
    
    resultScreen.style.display="none";
    reviewScreen.style.display="none";
    quizScreen.style.display="none";
    welcome.style.display="block";
    instructions.style.display="none";
});

//REVIEW ANSWERS BUTTON
reviewBtn.addEventListener("click",function(){
    resultScreen.style.display="none";
    reviewScreen.style.display="block";

    reviewContent.innerHTML="";

    questions.forEach(function(question,index){
        const selected=userAnswers[index]?.selected||"Not answered";
        const correct=question.answer;
        const isCorrect=selected===correct;
        const answerStatus=isCorrect?"correct-answer":
        "wrong-answer";

        reviewContent.innerHTML+=`
         <div class="review-item">
        <h3>Q${index+1}.${question.question}</h3>
            <p class="${answerStatus}">:${selected}</p>
            <p>Correct Answer:${correct}</p> 
        </div>
        `;
    });
});

//BACK TO RESULTS BUTTON//
reviewBackBtn.addEventListener("click",function(){
    reviewScreen.style.display="none";
    resultScreen.style.display="flex";
});

//TECHQUEST SOUND SYSTEM

const audioContext=new(window.AudioContext||
    window.webkitAudioContext)();

    function playTone(frequency,duration,type="sine",volume=0.08){
        const oscillator=audioContext.createOscillator();
        const gain=audioContext.createGain();

        oscillator.type=type;
        oscillator.frequency.value=frequency;

        gain.gain.setValueAtTime(volume,
            audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime+duration
            );

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime+duration);
    }

    function playClick(){
        playTone(700,0.06,"square",0.04);
    }

    function playCorrect(){
        playTone(600,0.12,"sine",0.06);

        setTimeout(()=>{
            playTone(900,0.08,"sine",0.06);
        },120);
    }

    function playWrong(){
        playTone(220,0.18,"sawtooth",0.045);
    }

    function playNext(){
        playTone(500,0.07,"triangle",0.04);

        setTimeout(()=>{
            playTone(750,0.08,"triangle",0.04);
        },90);
    }

    function playVictory(){
        playTone(500,0.15,"sine",0.06);

        setTimeout(()=>{
            playTone(700,0.15,"sine",0.06);
        },150);

        setTimeout(()=>{
            playTone(900,"sine",0.07);
        },300);
    }
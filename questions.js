let numQuestion = 0;
let isAnswered = false;
let correctAnswers = [];
checkAnswered();
updateNumbers();
const choices = document.querySelectorAll('.choice');
choices.forEach((c)=>{
    console.log(c.classList[1]);
    c.addEventListener('click',()=>{answerQuestion(c.classList)});
   
});
document.addEventListener('keydown',(e)=>{
    if(e.key ==='Enter' && isAnswered){
        nextQuestion();
    }
})
document.querySelector('.next-btn').addEventListener('click',nextQuestion)
document.querySelector('.start-btn').addEventListener('click',loopQuestions);
document.querySelector('.skip-btn').addEventListener('click',nextQuestion);

function getQuestions(){
    return JSON.parse(localStorage.getItem('csvData'));
}

function loopQuestions(){
    const mainView = document.querySelector('.main-menu');
    const questionView = document.querySelector('.question');
    mainView.classList.add('hidden');
    questionView.classList.remove('hidden');

    const questions = getQuestions();
    
    console.log('started the method, it is working');  
    console.log(questions);  

    formatQuestion(questions,numQuestion);

}
function formatQuestion(questions, num){
        document.querySelector(".question h2").innerHTML = questions[num].question;
        document.querySelector(".choice-a").innerHTML = "<em>A.</em> "+questions[num].a;
        document.querySelector(".choice-b").innerHTML = "<em>B.</em> "+questions[num].b;
        document.querySelector(".choice-c").innerHTML = "<em>C.</em> "+questions[num].c;
        document.querySelector(".choice-d").innerHTML = "<em>D.</em> "+questions[num].d;
}
function nextQuestion(){
    const questions = getQuestions();

    if(numQuestion+1< questions.length){
        numQuestion+=1;
        console.log('this is question No.'+ String(numQuestion+1));
        formatQuestion(questions,numQuestion);
        isAnswered = false;
        checkAnswered();
        updateNumbers();
        clearSelections();
    }
    else{
        showResults();
    }
}

function answerQuestion(classes){
    let choice = '';
    let isCorrect = false;
    switch(classes[1]){
        case 'choice-a': choice = 'a';
            console.log("choice A has been chosen");
            break;
            case 'choice-b': choice = 'b';
            console.log("choice B has been chosen");
            break;
            case 'choice-c': choice = 'c';
            console.log("choice C has been chosen");
            break;
            case 'choice-d': choice = 'd';
            console.log("choice D has been chosen");
            break;
        
        }
        document.querySelector('.choice-'+choice).classList.add('selected');
        if(getQuestions()[numQuestion].correct === choice){
            document.querySelector('.choice-'+choice).classList.add('correct');
            
            isCorrect = true;
            
        }else{
            document.querySelector('.choice-'+choice).classList.add('wrong');
            document.querySelector('.choice-'+getQuestions()[numQuestion].correct).classList.add('correct');
            isCorrect = false;
        }
        document.querySelectorAll('.choice').forEach((e)=>{
            e.classList.add('disabled');
        });

        isAnswered = true;
        document.querySelector('.correct-answer').innerHTML = setCorrectAnswer(choice.toUpperCase(),isCorrect);
        checkAnswered();
        record(isCorrect);
}
function checkAnswered(){
    choicesList = document.querySelectorAll('.choice');
    if(isAnswered){
        for(let i=0;i<choicesList.length;i++){
            choicesList[i].disabled = true;
            console.log('choices '+i+' disabled');
        }
        document.querySelector('.next-btn').disabled = false
        console.log('next enabled');
    }else{
        for(let i=0;i<choicesList.length;i++){
            choicesList[i].disabled = false;
            console.log('choices '+i+' enabled');
        }
        document.querySelector('.next-btn').disabled = true;
        console.log('next disabled');
    }
}
function updateNumbers(){
    document.querySelector('.question-number').innerHTML = numQuestion+1;
    document.querySelector('.total-questions').innerHTML = getQuestions().length+1;
    document.querySelector('.questions-answered').innerHTML = "You answered "+ correctAnswers.length + " questions."

}
function clearSelections(){
    choicesList = document.querySelectorAll('.choice');
    for(let i =0; i<choicesList.length;i++){
        choicesList[i].classList.remove('wrong');
        choicesList[i].classList.remove('selected');
        choicesList[i].classList.remove('correct');
        choicesList[i].classList.remove('disabled');
    }
    document.querySelector('.correct-answer').innerHTML ='';
}
function setCorrectAnswer(choice, isCorrect){
    let defaultContent = 'The correct answer is '+ getQuestions()[numQuestion].correct.toUpperCase() +' choice.'
    if(isCorrect){
        return defaultContent+ ' Yay! you answered correctly'

    }return defaultContent + 'You answered ' + choice+ ' choice (@ n @)'
}

function record(isCorrect){
    
    if(isCorrect){
        correctAnswers.push(numQuestion);
        
        console.log(numQuestion + ' was answered correctly');
        console.log(correctAnswers);
    }else{
        
        console.log(numQuestion + ' was answered wrongly');
        console.log(correctAnswers);
    }
    updateNumbers();
}
function skipQuestions(){
    numQuestion++;
    
}
function showResults(){
    const questions = getQuestions();
    const resultsSection = document.querySelector('.results');

    resultsSection.classList.remove('hidden');
    document.querySelector('.question').classList.add('hidden');
    resultsSection.innerHTML = '';
    for(let i =0;i<questions.length;i++){
        let correctNumber;
        switch(questions[i].correct){
            case 'a': correctNumber =1;break;
            case 'b': correctNumber =2;break;
            case 'c': correctNumber =3;break;
            case 'd': correctNumber =4;break;
            default:correctNumber =1; break;
        }
        let resultLayout = `<h2>`+questions[i].question+`</h2>`+ 
        `<ul class="result-question-`+i+`">
        <style>--correct:`+correctNumber+";</style>"+
        `<li class="result-a">A. `+ questions[i].a+ `</li>
    <li class="result-b">B. `+questions[i].b+`</li>
    <li class="result-c">C. `+questions[i].c+`</li>
    <li class="result-d">D. `+questions[i].d+`</li>
        </ul>` + 
    `<p> the correct answer was `+questions[i].correct+`.</p>`
    ;
        resultsSection.innerHTML+= resultLayout;
        
    }


}
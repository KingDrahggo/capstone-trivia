
let mainGameBox = document.querySelector(`#Main_Game_Box`);
let scoreBoard = document.querySelector(`#Score_Box`);
let loserBoard = document.querySelector(`#Loser_Box`);
let questionBox = document.querySelector(`#Question_Box`);
questionBox.innerHTML = ``;

let currentAnswer;
let currentQuestion;

let counter = 0;
let loser = "Sorry :)";


fetch("https://jservice.io/api/random")
    .then(response => response.json())
    .then(categoryIdData => {
        console.log(categoryIdData)
       let idNumber = categoryIdData[0].category_id

        fetch(`https://jservice.io/api/clues?category=${idNumber}`)
            .then(newResponse => newResponse.json())
            .then(gameData =>{
               showData(gameData)
            
            })
    })

function showData(gameData) {
    console.log(gameData.length)
    function getIndex() {
        return Math.floor(Math.random()* gameData.length);
      }
    let index = getIndex();
    let usedIndexes = []
        usedIndexes.push(index)
        let newArray = []
        newArray += index
        console.log(newArray)
        console.log(usedIndexes)
  
    currentAnswer = gameData[index].answer.toLowerCase();
    console.log(currentAnswer);
    currentQuestion = gameData[index].question;
    console.log(currentQuestion);

    const questionBox = document.querySelector(`#Question_Box`);
    questionBox.innerHTML = `${currentQuestion}`;
    let form = document.querySelector("#Form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let input = document.querySelector(`#answer_input`).value;
        let answerBox = input.toLowerCase();

        if (index < gameData.length) {
        index = getIndex();
        console.log(index)
        
        if (answerBox === currentAnswer) {
            counter += 1;
            scoreBoard.innerHTML = `Congrats! Score: ${counter}`;
            console.log(true);
            currentAnswer = gameData[index].answer.toLowerCase();
            currentQuestion = gameData[index].question;
            questionBox.innerHTML = `${currentQuestion}`;
            console.log(currentAnswer);
         } else if (currentQuestion === currentQuestion) {
            counter +=1;
            scoreBoard.innerHTML = `${loser} Score: ${counter}`;
            setInterval(function () {
                location.reload();
                }, 4000);
        } else {
            counter = 0;
            mainGameBox.innerHTML = `<p>${loser}<br>Score: ${counter}</br></p>`;
            console.log(false);
            setInterval(function () {
            location.reload();
            }, 4000);
        }
        }
    });
}
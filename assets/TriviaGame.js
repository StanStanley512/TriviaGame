// Array of quiz questions
const quizQuestions = [
    {
        question: 'How many Toy Story movies are there?',
        choices: ['1','2','3','4'],
        correctAnswer:'4', 
     },
     {
        question: 'Who is the antoginist in the first movie?',
        choices: ['Al','Slinky','Sid','Barbie'],
        correctAnswer:'Sid', 
     },
     {
        question: 'Who gets to keep Woody at the end of the 3rd movie?',
        choices: ['Andy','Bonnie','Molly','Nobody-he is a free toy'],
        correctAnswer:'Bonnie', 
     },
    {
        question: 'Who wrote the music for each of the Toy Story movies?',
        choices: ['Randy Newman','Paul Simon','Randy Jackson','Jack Johnson'],
        correctAnswer:'Randy Newman',
     },
     {
        question: 'Who is the father of Buzz Lightyear?',
        choices: ['Emperor Zurg','Larry Lightyear','Buzz Aldron','He was born from a comet'],
        correctAnswer:'Emperor Zurg',
     },
     {
        question: 'Who cares for the 3 aliens from Pizza Planet as their own?',
        choices: ['Woody and Bo Peep','Buzz and Jessie','Mr. and Mrs. Potato Head','Barbie and Ken'],
        correctAnswer:'Mr. and Mrs. Potato Head', 
     },
     {
        question: 'What does it say on the back of the Pizza Planet delivery truck?',
        choices: ["TOY","YO","HI","DA"],
        correctAnswer:"YO", 
     },
     {
        question: 'Where were Woody, Jessie, Bullseye, and The Prospector being shipped in the 2nd movie?',
        choices: ['Hollywood','Tokyo','Beijing','Paris'],
        correctAnswer:'Tokyo', 
     },
     {
        question: 'What is the name of the toy store in the 2nd movie?',
        choices: ["Lucky's Toys","Binford's Toy Bin","Pat's Toys and Parts","Al's Toy Barn"],
        correctAnswer:"Al's Toy Barn",
     },
     {
        question: "What is the brand of the toolbox in Sid's room from the 1st movie?",
        choices: ['Stanley','Binford','Husky','Store-a-lot'],
        correctAnswer:'Binford', 
     },
     {
        question: 'What was the original name for Toy Story?',
        choices: ['Toy Story','Toy Land','You Are A Toy','Toy Life'],
        correctAnswer:'You Are A Toy', 
     },
     {
        question: 'What kind of character was Woody originally supposed to be?',
        choices: ['Ventriloquist Dummy','Tin Toy','Always a Cowboy','Stuffed Western Bear'],
        correctAnswer:'Ventriloquist Dummy', 
     },
     {
        question: 'Who is the new main character introduced in the 4th movie?',
        choices: ['Star Man','Lots-O','Ken','Forky'],
        correctAnswer:'Forky',
     },
     {
        question: 'What was Buzz Lightyears original name?',
        choices: ['Lonnie Lightyear','Johnny Asteroid','Lunar Larry','Asteroid Armstrong'],
        correctAnswer:'Lunar Larry', 
     },
     {
        question: 'How did Andy get his name?',
        choices: ["It's an acronym for the creators names","From a Brown University Professor who taught the animators","He's named after the director's child","Chose it because it was the best fit"],
        correctAnswer:"From a Brown University Professor who taught the animators", 
     },
     {
        question: 'Where does Woody end up at the end of the 4th movie?',
        choices: ['Free with Bo Peep','At the daycare with Barbie',"Back at Bonnie's house with the gang","In an RV with new owner, Tyler"],
        correctAnswer:'Free with Bo Peep', 
     },
];

//image library
const correctImage = [
    src="https://media2.giphy.com/media/BATNxBGty2EwM/giphy.webp?cid=5a38a5a2a1761600cda7fd74a634e6e8c64a0bd0611063c2&rid=giphy.webp",
    src="https://media3.giphy.com/media/LnaPDokBEmONG/giphy.webp?cid=5a38a5a2d5b5a89c05aef7ce6a77df495bb22ef879ba47ae&rid=giphy.webp",
    src="https://media2.giphy.com/media/iQidCLEchWI4o/giphy.webp?cid=5a38a5a22f157766fea611b4bf59abebb1917c990daed92d&rid=giphy.webp",
]

const wrongImage = [
    src="https://media2.giphy.com/media/xYKfMuaUuWNfa/giphy.webp?cid=5a38a5a2be1387eb5e111f20e4aeaeca261e9ff965be5082&rid=giphy.webp",
    src="https://media1.giphy.com/media/tjSBb3g4Oq8iQ/giphy.webp?cid=5a38a5a22f157766fea611b4bf59abebb1917c990daed92d&rid=giphy.webp",
    src="https://media1.giphy.com/media/UWRyZHCsHtBFS/200w.webp?cid=5a38a5a2a26a04c063b923561d23ef9d5449c9e7c91df3fb&rid=200w.webp",
]
// Initial Values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


// Move to next question
function nextQuestion() {

    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        displayResult();
    } else {
        currentQuestion ++;
        loadQuestion(); 
    }

}

// 30 second timer
function timeUp() {
    clearInterval(timer);

    lost++;
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

//Display the question and choices together
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

    $('#time').html('Timer: ' + counter);
    $("#game").html(`
        <h4>${question}</h4>
    `);
    $("#choices").html(`
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);

}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

//Next question after choice
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (correctAnswer === selectedAnswer) {
        score++;
        preloadImage('win')
        setTimeout(nextQuestion, 3 * 1000);
        console.log('win');
    } else {
        lost++;
        preloadImage('lost')
        setTimeout(nextQuestion, 3 * 1000);
        console.log('lost');
    }

    console.log(selectedAnswer);
});

//show end result to player with number of right and wrong answers
function displayResult () {
    const result = `
        <p>You got ${score} question(s) right</p>
        <p>You missed ${lost} question(s)</p>
        <p>Total questions ${quizQuestions.length} questions(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
};

//create reset button so player can go again
$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

//show number of remaining questions
function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1)
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}

//function to generate wrong or correct gif randomly
function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}

//show user whether they question right or wrong and what the answer is
function preloadImage (status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
        <p class="preload-image">You got it!</p>
        <p class="preload-image">The right answer is <b>${correctAnswer}</b></p>
        <img src="${randomImage(correctImage)}"/>
        `);
    } else {
        $('#game').html(`
        <p class="preload-image">Hey-Howdy-Hey! It's ok, you'll get'em next time!</p>
        <p class="preload-image">The right answer was <b>${correctAnswer}</b></p>
        <img src="${randomImage(wrongImage)}"/>
        `);
    }
}

//remove start button when it's clicked and show game
$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});

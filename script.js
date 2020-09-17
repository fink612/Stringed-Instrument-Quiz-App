/**
 * Example store structure
 */
const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'Which instrument with 4 strings plays music written in the treble clef?',
        answers: [
          'bass',
          'viola',
          'violin',
          'cello'
        ],
        correctAnswer: 'violin'
      },
      {
        question: 'Which instrument has 6 strings and often plays arpeggiated chords?',
        answers: [
            'violin',
            'bass', 
            'guitar',  
            'harp'
        ],
        correctAnswer: 'guitar'
      },
      {
        question: 'Which instrument has many strings, but is often grouped with percussion because of the rhythmic quality of its music?',
        answers: [
            'piano',
            'cello',
            'violin',
            'tuba'
        ],
        correctAnswer: 'piano'

      },
      {
        question: 'What medieval instrument is the ancestor to guitars and others?',
        answers: [
            'lyre',
            'cello',
            'mandolin',
            'lute'
        ],
        correctAnswer: 'lute'
    },
    {
        question: 'This is the best stringed instrument of all time, obviously.',
        answers: [
            'bass',
            'bass',
            'bass',
            'bass'
        ],
        correctAnswer: 'bass'
    }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };
  

  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
function startPage() {
  // generates html for the intro page with a start button
  return `<h2>Welcome to the Quiz!</h2><p>Please click START</p><button id="srtBtn">START</button>`
}

function gamePlay() {
  //generate html and questions and answer choices from .store
  let qNum = store.questionNumber
  return `<h2>Question # ${qNum + 1} / ${store.questions.length}</h2><p>${store.questions[qNum].question}</p>
  <form><fieldset class="ansOpt">
  <div id="ansBtn">
  <button class="answer" id="0" value="0">${store.questions[qNum].answers[0]}</button>
  <button class="answer" id="1" value="1">${store.questions[qNum].answers[1]}</button>
  <button class="answer" id="2" value="2">${store.questions[qNum].answers[2]}</button>
  <button class="answer" id="3" value="3">${store.questions[qNum].answers[3]}</button></div></fieldset></form>`

  
  
}  

function wrongRight(answer) {
  //html for 'correct' choice or incorrect and gives correct answer
  if (answer === store.questions[store.questionNumber].correctAnswer ) {
    $('#main').append(`<div class="ansCrt">CORRECT!</div>`)
      store.score++
  }else {
    $('#main').append(`<div class="ansInc">INCORRECT!</div><P>The correct answer is: ${store.questions[store.questionNumber].correctAnswer}!</p>`)
  }
 nextButton()
 

}

function nextButton() {
  //creates next button or results button
  if (store.questionNumber < store.questions.length -1) {
    $('#main').append(`<button class="next">NEXT QUESTION</button>`)
  }else if (store.questionNumber = store.questions.length -1) {
    $('#main').append(`<button class="results">RESULTS</button>`)
    store.questionNumber += 2
  }
  
  clickNextBtn()
  ppltResults()
  
}

function runningTotal() {
  //html for banner that shows store.questionNumber and store.score
  if (store.questionNumber > 0) {
    return `<div id="score-banner">Score: ${store.score}/${store.questionNumber}<div>`
  }else {
    return ``
  }
}

function gameOver() {
  //give total score and make 'restart' button
  let pctCrt = (store.score/store.questions.length)
  
  if (pctCrt <= .2) {
    return `<h2>You scored ${store.score} out of ${store.questions.length}</h2><p>You could do better.</p><button class="rstBtn">TRY AGAIN</button>`
  }else if (pctCrt > .2 && pctCrt <= .8) {
    return `<h2>You scored ${store.score} out of ${store.questions.length}</h2><p>Not bad!  Could be better...</p><button class="rstBtn">TRY AGAIN</button>`
  }else if (pctCrt > .8) {
    return `<h2>You scored ${store.score} out of ${store.questions.length}</h2><p>Wow! Nice work!</p><button class="rstBtn">TRY AGAIN</button>`
  }  
  
}

  
  /********** RENDER FUNCTION(S) **********/
function render() {
  let currentCode = ""

  if (store.quizStarted === false) {
    $('#main').html(startPage())
    return
  }else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    currentCode = runningTotal()
    currentCode += gamePlay()
    $('#main').html(currentCode)
    
  }else {
    $('#main').html(gameOver())
    reset()
  }
}

  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store


  /********** EVENT HANDLER FUNCTIONS **********/
  // These functions handle events (submit, click, etc)
function clickStart() {
  
  $('#srtBtn').on('click',  (event) => {
  store.quizStarted = true
  render()
  submitAnswer()
  })
}

function submitAnswer() {
  $('.answer').on('click', (event) => {
    event.preventDefault()
    wrongRight(event.target.innerHTML)
    $('#ansBtn').hide()
    })
  }

function clickNextBtn() {
  $('.next').on('click', (event) => {
    store.questionNumber++
    render()
    submitAnswer()
  })
}

function ppltResults() {
  $('.results').on('click', (event) => {
    render() 
  })
}

function reset() {
  $('.rstBtn').on('click', (event) => {
    store.quizStarted = false
    store.questionNumber = 0
    store.score = 0
    start()
  })
}
 
function start() {
  render()
  clickStart()
  ppltResults()
} 

$(start)
 

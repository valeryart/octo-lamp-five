
/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });

  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1,
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    // ( Task 3)
    {
      q: 'What is the deepest point in the world?',
      o: ['Challenger Deep', 'Mariana Trench', 'Brownson Deep', 'Factorian Deep'],
      a: 0, 
    },
    {
      q: 'What is the biggest desert in the world?',
      o: ['Gobi', 'Kalahari', 'Great Victoria Desert', 'Sahara'],
      a: 3,
    },
    {
      q: 'What is the capital of France?',
      o: ['Paris', 'London', 'Rome', 'Berlin'],
      a: 0,
    },
    {
      q: 'Who painted the Mona Lisa?',
      o: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
      a: 0,
    }
  ];

  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.forEach((quizItem, index) => {
      quizDisplay += `
        <ul class="list-group">
        Q - ${quizItem.q}
          <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
          <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
          <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
          <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
        </ul>
        <div>&nbsp;</div>`;
    });
    quizWrap.innerHTML = quizDisplay;
  };
// Calculate the score (Task 1)
  const calculateScore = () => {
    let score = 0;
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        const li = `li_${index}_${i}`;
        const r = `radio_${index}_${i}`;
        const liElement = document.querySelector('#' + li);
        const radioElement = document.querySelector('#' + r);

        if (quizItem.a === i) {
          liElement.style.backgroundColor = 'lightgreen';
        }

        if (radioElement.checked && quizItem.a === i) {
          score++;
        }
      }
    });
    return score;
  };
// Add event listener to the submit button (Task 2)
  const submitButton = document.querySelector('#btnSubmit');
  submitButton.addEventListener('click', () => {
    const score = calculateScore();
    document.querySelector('#score').textContent = `Score: ${score}`;
    highlightCorrectAnswers();
  });
 // Add event listener to the reset button (Task 4)
  const resetButton = document.querySelector('#btnReset');
  resetButton.addEventListener('click', () => {
    window.location.reload();  // Reload the page
  });
  // Countdown timer (Task 5)
  const countdownTimer = () => {
    let seconds = 60;
    const timeDisplay = document.querySelector('#time');

    const timer = setInterval(() => {
      seconds--;
      timeDisplay.textContent = formatTime(seconds);

      if (seconds <= 0) {
        clearInterval(timer);
        endQuiz(); // End the quiz when the time is up
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${padZero(min)}:${padZero(sec)}`;
  };

  const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const endQuiz = () => {
    const score = calculateScore();
    document.querySelector('#score').textContent = `Score: ${score}`;
    highlightCorrectAnswers(); // Highlight the correct answers
  };

  const highlightCorrectAnswers = () => {
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        const li = `li_${index}_${i}`;
        const liElement = document.querySelector('#' + li);

        if (quizItem.a === i) {
          liElement.style.backgroundColor = 'lightgreen';
        }
      }
    });
  };

  // Call the displayQuiz function to initialize the quiz
  displayQuiz();
  // Start the countdown timer
  countdownTimer();
});

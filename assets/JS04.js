'use strict';

const output = document.getElementById('output');
let count = 0;
let correctAnswerCount = 0;
let selectAnswer = '';
let quiz = 0;

//最初のページを作成
function displayTopPage() {
  const h = document.createElement('h1');
  h.textContent = 'ようこそ'
  output.appendChild(h);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const p = document.createElement('p');
  p.textContent = '以下のボタンをクリック';
  output.appendChild(p);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const clickbtn = document.createElement('input');
  clickbtn.type = 'button';
  clickbtn.value = '開始';
  output.appendChild(clickbtn);

  clickbtn.addEventListener('click', function() {
    output.textContent = '';
    // function finishQuizContent() {
    //   return new Promise((resolve) => {
    //     resolve(quizContent);
    //   })
    // }

    // function finishDisplayStayPage() {
    //   return new Promise((resolve) => {
    //     resolve(displayStayPage);
    //   })
    // }
    // //「待機中」ページを出力し、fetchでのデータ読み込みが終了したらクイズ画面を出力
    // Promise.all([
    //   finishDisplayStayPage(),
    //   finishQuizContent()
    // ]).then(function(){
    //   output.textContent = '';
    //   console.log('add');
    //   add();
    // })

    // const finishQuizContent = async function() {
    //   quizContent();
    // }

    // const finishDisplayStayPage = async function() {
    //   displayStayPage();
    // }

    // const displayQuizPage = async function() {
    //   output.textContent = '';
    //   console.log('add');
    //   add();
    // }

    // const processAll = async function() {
    //   await finishQuizContent();
    //   await finishDisplayStayPage();
    //   await displayQuizPage();
    // }

    // processAll();

    clickbtn.hidden = true;
    fetchQuiz();

     //finishQuizContent.then(finishDisplayStayPage).then(displayQuizPage);
  } )
}
displayTopPage();

const fetchQuiz = async() => {
  const url = 'https://opentdb.com/api.php?amount=10';
  fetch(url).then((response) => {
    return response.json()
  }).then((result) => {
    // Example(result);
    quiz = result.results;
    console.log(quiz);
  }).catch((e) => {
    console.log(e)
  })

  // function Example(jsonObj){
  //   quiz = jsonObj.result[0]
  // }

  // const json = (await fetch('https://opentdb.com/api.php?amount=10')).json().results;
  // const obj =  JSON.parse(json);
  // console.log(obj.results);

  const h = document.createElement('h1');
  h.textContent = '取得中'
  output.appendChild(h);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const p = document.createElement('p');
  p.textContent = '少々お待ちください。';
  output.appendChild(p);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  displayQuiz();
}

//クイズを取り出す
// const fetchQuiz1 = new Promise((resolve, reject) => {
//   if (fetch('https://opentdb.com/api.php?amount=10')) {
//     resolve(fetch('https://opentdb.com/api.php?amount=10').json());
//   } else {
//     reject();
//   }
// });

// const onFullfilled = () => {
//   const h = document.createElement('h1');
//   h.textContent = '取得中'
//   output.appendChild(h);

//   const hr1 = document.createElement('hr');
//   output.appendChild(hr1);

//   const p = document.createElement('p');
//   p.textContent = '少々お待ちください。';
//   output.appendChild(p);

//   const hr2 = document.createElement('hr');
//   output.appendChild(hr2);

//   displayQuizPage();
// }

// const onRejected = () => {
//   console.log('reject');
// }

// fetchQuiz1.then(onFullfilled, onRejected);


// const fetchQuiz = new Promise((resolve, reject) => {
//   quiz = fetch('https://opentdb.com/api.php?amount=10').then(function  (response) {
//     return response.json();
//   }).then(function(json) {
//       return json.results;
//   })

//   const h = document.createElement('h1');
//   h.textContent = '取得中'
//   output.appendChild(h);

//   const hr1 = document.createElement('hr');
//   output.appendChild(hr1);

//   const p = document.createElement('p');
//   p.textContent = '少々お待ちください。';
//   output.appendChild(p);

//   const hr2 = document.createElement('hr');
//   output.appendChild(hr2);

//   displayQuizPage();
//   resolve();
// })

// const finishDisplayStayPage = new Promise((resolve, reject) => {
//   displayStayPage();
//   resolve();
// })

const displayQuiz = () => {
  output.textContent = '';
  console.log('add');
  if (count < 10) {
    displayQuizPage();
    }else{
    displayResult();
  }
}

//クイズと選択肢を出力
function displayQuizPage() {
  count ++;

  //問題、ジャンル、難易度を出力
  let h = document.createElement('h1');
  h.textContent = '問題' + count;
  output.appendChild(h);

  let janreContent = document.createElement('p');
  janreContent.textContent = '[ジャンル]' + quiz[count].category;
  output.appendChild(janreContent);

  let difficultyContent = document.createElement('p');
  difficultyContent.textContent = '[難易度]' + quiz[count].difficulty;
  output.appendChild(difficultyContent);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const questionContent = document.createElement('p');
  questionContent.textContent = quiz[count].question;
  output.appendChild(questionContent);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const btnDiv = document.createElement('div');
  output.appendChild(btnDiv);

  //選択肢を出力
  if( quiz[count].type === 'boolean') {
    //YesNoクエスチョンのとき
    const trueBtn = document.createElement('input');
    trueBtn.type = 'button';
    trueBtn.value = 'True';
    trueBtn.classList.add('btn');
    btnDiv.appendChild(trueBtn);

    const FalseBtn = document.createElement('input');
    FalseBtn.type = 'button';
    FalseBtn.value = 'False';
    FalseBtn.classList.add('btn');
    btnDiv.appendChild(FalseBtn);

    //ボタン押下された際の処理を記載
    trueBtn.addEventListener('click', function() {
      output.textContent = '';
      selectAnswer = 'True';
      quizContent();
    })
    FalseBtn.addEventListener('click', function() {
      output.textContent = '';
      selectAnswer = 'False';
      quizContent();
    })
    //正解を選択した場合にカウントする
    if (selectAnswer = quiz[count].correct_answer) {
      correctAnswerCount ++;
    }

  } else {
    //４択のとき
    let correctQuestionNumber = Math.random() * 3;
    for (let i = 0; i < 3; i++){
      if (correctQuestionNumber < i) {
        const answerBtn =document.createElement('input');
        answerBtn.type = 'button';
        answerBtn.classList.add('btn');
        answerBtn.value = quiz[count].correct_answer;
        btnDiv.appendChild(answerBtn)

        //ボタン押下された際の処理を記載
        answerBtn.addEventListener('click', function() {
        output.textContent = '';
        correctAnswerCount ++;
        quizContent();
        })
      }
      const answerBtn =document.createElement('input');
      answerBtn.type = 'button';
      // let arrayIncorrect_answers = incorrect_answers;
      // console.log(incorrect_answers);
      // answerBtn.value = arrayIncorrect_answers[i];
      answerBtn.value = quiz[count].incorrect_answers[i];
      answerBtn.classList.add('btn');
      btnDiv.appendChild(answerBtn);

      //ボタン押下された際の処理を記載
      answerBtn.addEventListener('click', function() {
        output.textContent = '';
        quizContent();
      })
    }
  }
  // count++;
}

//クイズ結果を出力
function displayResult() {
  const h = document.createElement('h1');
  h.textContent = 'あなたの正答数は' + correctAnswerCount + 'です！！';
  output.appendChild(h);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const p = document.createElement('p');
  p.textContent = '再度チャレンジしたい場合は以下をクリック！！';
  output.appendChild(p);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const clickbtn = document.createElement('input');
  clickbtn.type = 'button';
  clickbtn.value = 'ホームに戻る';
  output.appendChild(clickbtn);

  clickbtn.addEventListener('click', function() {
    //トップページに移動、初期化
    output.textContent = '';
    count = 0;
    correctAnswerCount = 0;
    displayTopPage();
  } )

}
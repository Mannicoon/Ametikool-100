function myFunction() {
    var x = document.getElementById("links");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

// QUIZ
const quizData = [
  {
    question: "Kuressaare Ametikooli direktor on Neeme Rand",
    a: "Vale",
    b: "Õige",
    correct: "b"
  },
  {
    question: "Kuressaare Ametikool asututati aastal 1800",
    a: "Vale", 
    b: "Õige",
    correct: "a"
  },
  {
    question: "1990. aastast oleme Kuressaare Ametikool.",
    a: "Vale", 
    b: "Õige",
    correct: "b"
  },
  {
    question: "16. mail 2008 külastas ametikooli Eestis riigivisiidil viibinud Suurbritannia kuninganna Elizabeth II",
    a: "Vale", 
    b: "Õige",
    correct: "a"
  },
  {
    question: "Kuressaare Ametikooli tunnusgraafika põhilisteks värvideks on oranž ning sinine",
    a: "Vale", 
    b: "Õige",
    correct: "b"
  },
  {
    question: "Kuressaare Ametikooli laul „Meistriks ei sünnita“ valmis 2007. a ametikooli 85. sünnipäevaks.",
    a: "Vale", 
    b: "Õige",
    correct: "b"
  },
  {
    question: "Vanim õppija 2020–2021 õppeaastal oli 71-aastane",
    a: "Vale", 
    b: "Õige",
    correct: "b"
  },
  {
    question: "Noorim õppija 2020-2021 õppeaastal oli 12-aastane",
    a: "Vale", 
    b: "Õige",
    correct: "a"
  },
  {
    question: "2012. a valmis endise võimla- ja laohoone asemele disaini- ja tarbekunsti erialade õppehoone Disainimajakas.",
    a: "Vale", 
    b: "Õige",
    correct: "b"
  },
  {
    question: "2018. a pälvis ametikool esimese Eesti kutsekoolina Euroopa Ettevõtliku Kooli tiitli.",
    a: "Vale", 
    b: "Õige",
    correct: "b"
  },

  
];

let currentQuestion = 0;
let answers = [];

function loadQuestion() {
  const title = document.querySelector("#question");
  const optionContainer = document.querySelector("#options");
  const options = [];
  title.textContent = quizData[currentQuestion].question;
  for (const option of Object.keys(quizData[currentQuestion])) {
    if (option === "question" || option === "correct") {
      continue;
    } else {
      const optionElement = document.createElement("li");
      const radio = document.createElement("input");
      radio.setAttribute("id", option);
      radio.setAttribute("type", "radio");
      radio.setAttribute("name", "answer");

      const label = document.createElement("label");
      label.setAttribute("for", option);
      label.textContent = quizData[currentQuestion][option];
      optionElement.append(radio, label);
      options.push(optionElement);
    }
  }
  optionContainer.append(...options);
}

loadQuestion();

document.querySelector(".submit").addEventListener("click", (e) => {
  if (currentQuestion === -1) {
    document.querySelector(".submit").textContent = "Järgmine";
    currentQuestion++;
    loadQuestion();
  } else {
    let selected = false;
    const radios = document.getElementsByName("answer");
    for (const radio of radios) {
      if (radio.checked) {
        answers.push(radio.id);
        selected = true;
      }
    }
    if (selected) {
      currentQuestion++;
      const optionContainer = document.querySelector("#options");
      while (optionContainer.firstChild) {
        optionContainer.firstChild.remove();
      }
      if (currentQuestion === quizData.length) {
        let points = 0;
        answers.forEach((answer, index) => {
          if (answer === quizData[index].correct) {
            points = points + 1;
          } else {
            console.log("Vale");
          }
        });

        if (points === quizData.length) {
            document.querySelector(".submit").textContent = "Tubli, kui soovid proovi veel.";
        } else {
            document.querySelector(".submit").textContent = "Proovi uuesti";
        }
        const title = document.querySelector("#question");
        title.textContent = `Palju õnne! Sa vastasid õigesti ${points} küsimust ${quizData.length}st küsimusest!`;
        currentQuestion = -1;
        answers = [];
        
      } else {
        loadQuestion();
      }
      selected = false;
    }
  }
});
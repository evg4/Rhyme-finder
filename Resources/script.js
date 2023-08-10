const url = "https://api.datamuse.com/words?";
const queryParams = "rel_rhy=";
let wordQuery;
let numOfResults;

const wordInputField = document.querySelector("#word-input");
const numInputField = document.querySelector("#num-input");
const submit = document.querySelector("#submit");
const responseField = document.querySelector("#response-field");
const responseText = document.querySelector("#response-text");

const getSuggestions = async () => {
  if (wordInputField.value === "") {
    window.alert("Please type a word.");
    console.log(wordQuery);
  } else {
    wordQuery = wordInputField.value;
  }

  if (numInputField.value < 1 || numInputField.value > 50) {
    window.alert("Please pick a number between 1 and 50.");
  } else {
    numOfResults = numInputField.value;
  }
  if (
    wordInputField.value !== "" &&
    numInputField.value >= 1 &&
    numInputField.value < 51
  ) {
    responseField.style.display = "block";
    const endpoint = url + queryParams + wordQuery;
    responseText.innerHTML = "";
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (numOfResults > jsonResponse.length) {
          numOfResults = jsonResponse.length;
          responseText.innerHTML = `<p> We found ${jsonResponse.length} results:</p>`;
        }
        let wordArray = [];

        for (let i = 0; i < numOfResults; i++) {
          wordArray.push("<li>" + jsonResponse[i].word);
        }
        let wordList = wordArray.join("</li>");
        responseText.innerHTML += "<ol>" + wordList + "</ol>";
      } else {
        console.log("TESTING!");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

submit.addEventListener("click", getSuggestions);

document.getElementById("button").addEventListener("click", getMeaning);
function getMeaning() {
  var word = document.getElementById("word").value;
  var display = document.getElementById("display");
  if (word.length === 0) {
    display.innerText = "First type something";
    return;
  }
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      var check = Array.isArray(data);
      meaning = check
        ? data[0].meanings[0].definitions[0].definition
        : data.message;
      display.innerText = meaning;
    })
    .catch((err) => {
      console.log(err);
    });
}

const prompt = require("prompt-sync")({ sigint: true });
const Shrugman = require("./class");
const { categories, films, cities } = require("./categories");

// create instance
const shruggy = new Shrugman();

// choose category
console.clear();
let cat = prompt("Choose category: films or cities ");
// keep asking until valid category
while (!categories.includes(cat)) {
  console.clear();
  cat = prompt("Choose category: films or cities ");
}

///////////////////////
// play game function

function play() {
  // get secret word(s)
  console.clear();
  const word = shruggy.getWord(eval(cat));
  console.clear();

  // show masked word
  console.log(shruggy.mask(word));
  console.log();

  // 1: ask for a letter
  let guess = prompt("Guess letter: ");
  console.clear();
  // ask until one letter given
  while (guess.length !== 1) {
    console.log(shruggy.mask(word));
    console.log();
    guess = prompt("Guess letter: ");
    console.clear();
  }

  // 2: check if correct letter and unmask if yes
  let wordUnmasking = shruggy.unmask(word, shruggy.mask(word), guess);

  // 3: show progressing word
  console.log(wordUnmasking);

  // 4: draw shrugman
  let drawed = shruggy.draw(word, guess);
  console.log(drawed);

  // repeat last four steps(1-4) until the whole word uncovered
  while (wordUnmasking.includes("_")) {
    // loosing condition
    if (shruggy.countWrong >= 10) {
      shruggy.gamesPlayed.push(word + " - loss");
      console.clear();
      console.log(word);
      console.log(shruggy.draw(word, guess));
      console.log(`Try your luck next time!`);
      break;
    }

    // 1: ask for a letter
    guess = prompt("Guess letter: ");
    console.clear();
    // ask until one letter given
    while (guess.length !== 1) {
      console.log(wordUnmasking);
      console.log(drawed);
      guess = prompt("Guess letter: ");
      console.clear();
    }

    // 2: check if correct letter and unmask if yes
    wordUnmasking = shruggy.unmask(word, wordUnmasking, guess);

    // 3: show progressing word
    console.log(wordUnmasking);

    // 4: draw shrugman
    console.log(shruggy.draw(word, guess));
  }

  // winning condition
  if (shruggy.countWrong < 10) {
    shruggy.gamesPlayed.push(word + " - win");
    console.log(`You win!`);
  }
}

// play game
play();

// play again?
let again = prompt("Play again (y/n)? ");
while (again) {
  if (again === "n") {
    console.clear();
    console.log(shruggy.getGamesList());
    break;
  }
  if (again === "y") {
    shruggy.playAgainReset();
    play();
  }
  again = prompt("Play again (y/n)? ");
}

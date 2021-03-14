const prompt = require("prompt-sync")({ sigint: true });
const chalk = require("chalk");
const Shrugman = require("./class");
const categories = require("./categories");

// create instance
const shruggy = new Shrugman();

// choose category
console.clear();
let cat = prompt(chalk.magenta("Choose category: films or cities "));
// keep asking until valid category
while (!categories.hasOwnProperty(cat)) {
  console.clear();
  cat = prompt(
    chalk.magenta(
      `Choose category: ${chalk.bold.magenta("films")} or ${chalk.bold.magenta(
        "cities"
      )} `
    )
  );
}

///////////////////////
// play game function

function play() {
  // get secret word(s)
  console.clear();
  const word = shruggy.getWord(categories[cat]);
  console.clear();

  // show masked word
  let masked = shruggy.mask(word);
  console.log(chalk.bold.magenta(masked));
  console.log();

  // variables for keeping track of unmasking the word
  // and drawing shrugman
  let wordUnmasking = masked;
  let drawed = "";

  // keep getting guesses until word completely unmasked
  // or shrugman drawn
  while (wordUnmasking.includes("_")) {
    // loosing condition
    if (shruggy.countWrong >= 10) {
      shruggy.gamesPlayed.push(word + " - loss");
      console.clear();
      console.log(chalk.bold.magenta(word));
      console.log(chalk.bold.cyan(drawed));
      console.log(chalk.bold.greenBright(`Try your luck next time!`));
      break;
    }

    // 1: ask for a letter
    let guess = prompt(chalk.greenBright("Guess letter: "));
    console.clear();
    // ask until one letter given
    while (guess.length !== 1) {
      // keep showing unmasking progress
      console.log(chalk.bold.magenta(wordUnmasking));
      // keep showing drawing progress
      console.log(chalk.bold.cyan(drawed));
      // keep asking for letter
      guess = prompt(chalk.greenBright("Guess letter: "));
      console.clear();
    }

    // 2: check if correct letter and unmask if yes
    wordUnmasking = shruggy.unmask(word, wordUnmasking, guess);

    // 3: show progressing word
    console.log(chalk.bold.magenta(wordUnmasking));

    // 4: draw shrugman and show it
    drawed = shruggy.draw(word, guess);
    console.log(chalk.bold.cyan(drawed));
  }

  // winning condition
  if (shruggy.countWrong < 10) {
    shruggy.gamesPlayed.push(word + " - win");
    console.log(chalk.bold.greenBright(`You win!`));
  }
}

// play game
play();

////////////////////////////
// get answer yes or no function
function getAnswer(again) {
  while (again !== "y" && again !== "n") {
    console.clear();
    console.log();
    console.log(chalk.bold.cyan(shruggy.shrug));
    console.log();
    again = prompt(
      chalk.magenta(
        `Play again (${chalk.bold.magenta("y")}/${chalk.bold.magenta("n")})? `
      )
    );
  }
  return again;
}

// play again
let again = prompt(chalk.magenta("Play again (y/n)? "));
again = getAnswer(again);

while (again === "y") {
  shruggy.playAgainReset();
  play();
  again = prompt(chalk.magenta("Play again (y/n)? "));
  again = getAnswer(again);
}

// if answer is no print list of games
console.clear();
console.log(chalk.cyan(shruggy.getGamesList()));
console.log();

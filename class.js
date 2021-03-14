class Shrugman {
  constructor() {
    this.shrug = "¯\\_(:/)_/¯";
    this.countWrong = 0;
    this.guessedLetters = [];
    this.gamesPlayed = [];
    this.wordsPlayed = [];
  }

  getWord(cat) {
    if (this.wordsPlayed.length === cat.length) this.wordsPlayed = [];
    const getRandom = () => Math.floor(Math.random() * cat.length);
    let random = getRandom();
    while (this.wordsPlayed.includes(random)) {
      random = getRandom();
    }
    this.wordsPlayed.push(random);
    return cat[random];
  }

  mask(word) {
    let arr = word.split("");
    for (let [i, char] of arr.entries()) {
      if (char !== " ") {
        arr[i] = "_";
      }
    }
    return arr.join("");
  }

  unmask(word, masked, letter) {
    let arr = masked.split("");
    for (let [i, char] of word.split("").entries()) {
      if (char.toLowerCase() === letter.toLowerCase()) {
        arr[i] = word[i];
      }
    }
    return arr.join("");
  }

  draw(word, letter) {
    let letterLower = letter.toLowerCase();
    let wordLower = word.toLowerCase();

    let str = this.shrug.slice(0, this.countWrong);

    if (this.guessedLetters.includes(letterLower)) {
      let space = 14 - str.length;
      let hint = `You tried this letter already`;
      return (
        str +
        (this.countWrong >= 10 ? "" : hint.padStart(space + hint.length, " "))
      );
    }
    this.guessedLetters.push(letterLower);

    if (!wordLower.includes(letterLower)) {
      this.countWrong++;
    }
    str = this.shrug.slice(0, this.countWrong);
    return str;
  }

  playAgainReset() {
    this.countWrong = 0;
    this.guessedLetters = [];
  }

  getGamesList() {
    return this.gamesPlayed.map((item, i) => `${i + 1}. ${item}`).join("\n");
  }
}

module.exports = Shrugman;

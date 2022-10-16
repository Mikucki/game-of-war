let deckId;
let player1Score = 0;
let player2Score = 0;
const draw = document.getElementById("draw");
const score = document.getElementById("scores");
const cardValuesArr = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];
const title = document.getElementById("title");
const cardsLeft = document.getElementById("cards-left");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      player1Score = 0;
      player2Score = 0;
      score.innerHTML = `
        <p>${player1Score}</p>
        <p>${player2Score}</p>
        `;
      title.innerHTML = `
            <h1 class="title" id="title">Draw a Card!</h1>
        `;
      cardsLeft.innerHTML = `
            <h3 class="cards-left" id="cards-left">Full deck</h3>
            `;

      document.getElementById("draw-cards").disabled = false;

      document.getElementById(
        "ultimateWinner"
      ).innerHTML = `<h4 class="winner" id="winner"></h4>`;
    });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

document.getElementById("draw-cards").addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("card-slot1").innerHTML = `
                <img src=${data.cards[0].image} />   
            `;
      document.getElementById("card-slot2").innerHTML = `
                <img src=${data.cards[1].image} />
            `;
      determineCardWinner(data.cards[0], data.cards[1]);

      cardsLeft.innerHTML = `
            <h3 class="cards-left" id="cards-left">${data.remaining} Cards left</h3>
            `;

      if (data.remaining === 0) {
        document.getElementById("draw-cards").disabled = true;
        if (player1Score > player2Score) {
          document.getElementById(
            "ultimateWinner"
          ).innerHTML = `<h4 class="winner" id="winner">You Won!</h4>`;
        } else if (player1Score < player2Score) {
          document.getElementById(
            "ultimateWinner"
          ).innerHTML = `<h4 class="winner" id="winner">Computer Won!</h4>`;
        }
      } else {
        document.getElementById("draw-cards").disabled = false;
      }
      console.log(player1Score, player2Score);
    });
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  if (card1ValueIndex > card2ValueIndex) {
    player1Score++;
    score.innerHTML = `
        <p>${player1Score}</p>
        <p>${player2Score}</p>
        `;
    title.innerHTML = `
            <h1 class="title" id="title">You Won !</h1>
        `;
  } else if (card1ValueIndex < card2ValueIndex) {
    player2Score++;
    score.innerHTML = `
        <p>${player1Score}</p>
        <p>${player2Score}</p>
        `;
    title.innerHTML = `
            <h1 class="title" id="title">Computer Won!</h1>
        `;
  } else {
    title.innerHTML = `
            <h1 class="title" id="title">Tie!</h1>
        `;
  }
}

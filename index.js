import cardsData from "./data/data.json" assert { type: "json" };

const randomSorting = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const cardsRender = (cards) => {
  randomSorting(cards);

  return cards
    .map(
      (card) => `<li class="card-box-list-item" name="${card.name}">
                   <img class="card-box-face-image" src="${card.imageSrc}" alt="${card.name}" name="${card.name}">
                   <img class="card-box-back-image" src="./images/question-mark.png" alt="question-mark">
                 </li>`
    )
    .join("");
};

const cardsBox = document.querySelector(".card-box-list");
cardsBox.innerHTML = cardsRender(cardsData);

const listCards = document.querySelectorAll(".card-box-list-item");

listCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    card.classList.toggle("toggleCard");

    currentCard(e);
  });
});

const currentCard = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("current");

  const clickedCards = document.querySelectorAll(".current");

  if (clickedCards.length === 2) {
    clickedCards[0].getAttribute("name") ===
    clickedCards[1].getAttribute("name")
      ? clickedCards.forEach((clickedCard) => {
          clickedCard.classList.remove("current");
          clickedCards.forEach((card) => (card.style.pointerEvents = "none"));
        })
      : clickedCards.forEach((clickedCard) => {
          clickedCard.classList.remove("current");
          setTimeout(() => {
            clickedCards.forEach((card) => card.classList.remove("toggleCard"));
          }, 600);
        });
  }
};

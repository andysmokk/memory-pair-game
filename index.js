// Function to fetch JSON data
const fetchCardsData = async () => {
  try {
    const response = await fetch("./data/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return [];
  }
};

const randomSorting = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const cardsBox = document.querySelector(".card-box-list");

const renderCards = (cards) => {
  randomSorting(cards);

  cardsBox.innerHTML = cards
    .map(
      (card) => `<li class="card-box-list-item" name="${card.name}">
                   <img class="card-box-face-image" src="${card.imageSrc}" alt="${card.name}" name="${card.name}">
                   <img class="card-box-back-image" src="./images/question-mark.png" alt="question-mark">
                 </li>`
    )
    .join("");

  const listCards = document.querySelectorAll(".card-box-list-item");

  listCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");

      flipCard(e);
    });
  });
};

// Fetch data and render cards
fetchCardsData().then((cardsData) => {
  renderCards(cardsData);
});

const flipCard = ({ target }) => {
  const clickedCard = target;
  clickedCard.classList.add("current");

  const clickedCards = document.querySelectorAll(".current");

  clickedCards.forEach((card) => {
    clickedCards.length < 2
      ? (card.style.pointerEvents = "none")
      : clickedCards.length === 2
      ? (card.style.pointerEvents = "auto")
      : clickedCards;
  });

  const toggledCards = document.querySelectorAll(".toggleCard");

  clickedCards.forEach((clickedCard) => {
    if (clickedCards.length === 2) {
      clickedCards[0].getAttribute("name") ===
      clickedCards[1].getAttribute("name")
        ? (clickedCard.classList.remove("current"),
          (clickedCard.style.pointerEvents = "none"))
        : (clickedCard.classList.remove("current"),
          setTimeout(() => {
            clickedCard.classList.remove("toggleCard");
          }, 600));
    }

    if (toggledCards.length === 18) {
      setTimeout(() => {
        fetchCardsData().then((cardsData) => {
          renderCards(cardsData);
        });
      }, 1000);
    }
  });
};

// index.js
// Ties api.js and render.js together and boots up the app.

const newPlayerForm = document.getElementById("new-player-form");

newPlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(newPlayerForm);
  const newPlayer = {
    name: formData.get("name"),
    breed: formData.get("breed"),
    status: formData.get("status"),
    imageUrl: formData.get("imageUrl"),
  };

  await addNewPlayer(newPlayer);
  newPlayerForm.reset();
  init(); // refresh the roster to show the new puppy
});

/**
 * Initialize the app: fetch players, hide loading message, render roster.
 */
const init = async () => {
  const loadingMessage = document.getElementById("loading");
  loadingMessage.style.display = "block";

  const players = await getAllPlayers();

  loadingMessage.style.display = "none";
  renderAllPlayers(players);
};

init();

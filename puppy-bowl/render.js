// render.js
// Handles turning player data into DOM elements.

/**
 * Render the full roster into #players-list
 * @param {Array} playerList
 */
const renderAllPlayers = (playerList) => {
  const playersList = document.getElementById("players-list");
  playersList.innerHTML = "";

  if (!playerList || playerList.length === 0) {
    playersList.innerHTML = `<p class="placeholder">No puppies found!</p>`;
    return;
  }

  playerList.forEach((player) => {
    const li = document.createElement("li");
    li.className = "player-card";
    li.innerHTML = `
      <img src="${player.imageUrl}" alt="${player.name}" />
      <p>${player.name}</p>
    `;

    // Clicking a card shows full details
    li.addEventListener("click", async () => {
      const fullPlayer = await getSinglePlayer(player.id);
      renderSinglePlayer(fullPlayer);
    });

    playersList.appendChild(li);
  });
};

/**
 * Render a single player's details into #player-info
 * @param {Object} player
 */
const renderSinglePlayer = (player) => {
  const playerInfo = document.getElementById("player-info");

  if (!player) {
    playerInfo.innerHTML = `<p class="placeholder">Could not load that puppy's details.</p>`;
    return;
  }

  playerInfo.innerHTML = `
    <img src="${player.imageUrl}" alt="${player.name}" />
    <dl>
      <dt>Name</dt>
      <dd>${player.name}</dd>
      <dt>Breed</dt>
      <dd>${player.breed}</dd>
      <dt>Status</dt>
      <dd>${player.status}</dd>
      <dt>ID</dt>
      <dd>${player.id}</dd>
    </dl>
    <button class="remove-btn" data-id="${player.id}">Remove from Roster</button>
  `;

  // Wire up the remove button
  const removeBtn = playerInfo.querySelector(".remove-btn");
  removeBtn.addEventListener("click", async () => {
    const success = await removePlayer(player.id);
    if (success) {
      playerInfo.innerHTML = `<p class="placeholder">Please select a player to view more details!</p>`;
      init(); // refresh the roster list
    }
  });
};

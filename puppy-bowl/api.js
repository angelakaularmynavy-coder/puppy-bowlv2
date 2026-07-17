// api.js
// Handles all communication with the Puppy Bowl API.

const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "2506-Angela"; // Make sure to change this!
const API_URL = `${BASE}/${COHORT}`;

const getAllPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    return result.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return [];
  }
};

const getSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    const result = await response.json();
    return result.data.player;
  } catch (err) {
    console.error(`Uh oh, trouble fetching player #${playerId}!`, err);
    return null;
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerObj),
    });
    const result = await response.json();
    return result.data.newPlayer;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
    return null;
  }
};

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to remove player #${playerId}`);
    }
    return true;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
    return false;
  }
};

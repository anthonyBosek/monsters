// Global Variables
const MONSTER_URL = "http://localhost:3000/monsters";
const createMonster = document.querySelector("#create-monster");
const monsterContainer = document.querySelector("#monster-container");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");
let pageNum = 1;

const getData = (url) => {};
const postData = (url) => {};
const getOneMonster = () => {};
const createMonsterCard = () => {};
const getAllMonsters = () => {
  // getData()
  // createMonsterCard()
};
const handleSubmit = () => {};
const createMonsterForm = () => {};

const pageBack = () => {};
const pageForward = () => {};

// Initialization Function to Encapsulate JS Startup
const initialize = () => {
  getAllMonsters();
  createMonsterForm();

  backButton.addEventListener("click", pageBack);
  forwardButton.addEventListener("click", pageForward);
};
// Initialize on Pageload
document.addEventListener("DOMContentLoaded", initialize);

//
// MVPs:
// on load, dynamically create form
// on load, fetch(GET) all monsters
// invoke card create func for first 50 monsters
// dynamically add monster cards to page
// add functionality to capture form data on submit
// on submit fetch(POST) new monster to add to db
//
// events:
// page load
// form submit
// page forward
// page backward

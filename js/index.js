//* Global Variables
const MONSTER_URL = "http://localhost:3000/monsters";
let limit = 50;
let pageNum = 1;

//* Universal get func w/ fetch
const getData = (url) => {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw resp.statusText;
    }
  });
};

//* Universal post func w/ fetch
const postData = (url, payload) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw resp.statusText;
    }
  });
};

//* Helper func to create cards and append to page
const createMonsterCards = (monsters) => {
  const monsterContainer = document.querySelector("#monster-container");
  monsterContainer.innerHTML = "";
  monsters.forEach(({ id, age, name, description }) => {
    const div = document.createElement("div");
    div.id = `monster-card-${id}`;
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h4 = document.createElement("h4");
    h4.textContent = `Age: ${age}`;
    const p = document.createElement("p");
    p.textContent = `Info: ${description}`;

    div.append(h2, h4, p);
    monsterContainer.appendChild(div);
  });
};

//* Get one monster data
const getOneMonster = () => {}; //TODO: add functionality to fetch one by id

//* Get all monsters data, then invoke card creator callback
const getAllMonsters = () => {
  getData(`${MONSTER_URL}/?_limit=${limit}&_page=${pageNum}`)
    .then((monsters) => createMonsterCards(monsters))
    .catch((err) => console.log("Error: ", err));
};

//* Form submit callback, post data to db
const handleSubmit = (e) => {
  e.preventDefault();
  const { name, age, description } = e.target;
  const payload = {
    name: name.value,
    age: parseFloat(age.value),
    description: description.value,
  };
  postData(MONSTER_URL, payload)
    .then((added) => console.log("New Monster: ", added))
    .catch((err) => console.log("Error: ", err));
};

//* Dynamically create form element and inputs
const createMonsterForm = () => {
  const createMonster = document.querySelector("#create-monster");

  const monsterForm = document.createElement("form");
  monsterForm.id = "monster-form";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Enter Monster Name";

  const ageInput = document.createElement("input");
  ageInput.type = "text";
  ageInput.name = "age";
  ageInput.placeholder = "Enter Monster Age";

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.name = "description";
  descInput.placeholder = "Enter Monster Description";

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Create Monster";

  monsterForm.append(nameInput, ageInput, descInput, submit);
  createMonster.appendChild(monsterForm);
};

//* Page +/- to navigate & display monsters
const pageBack = () => {
  if (pageNum > 1) {
    --pageNum;
    getAllMonsters();
  }
};
const pageForward = () => {
  ++pageNum;
  getAllMonsters();
};

//* Initialization Function to Encapsulate JS Startup
const initialize = () => {
  getAllMonsters();
  createMonsterForm();
  const backButton = document.querySelector("#back");
  const forwardButton = document.querySelector("#forward");
  const monsterForm = document.querySelector("#monster-form");
  backButton.addEventListener("click", pageBack);
  forwardButton.addEventListener("click", pageForward);
  monsterForm.addEventListener("submit", handleSubmit);
};
//* Initialize on Pageload
document.addEventListener("DOMContentLoaded", initialize);

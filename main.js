//<-------------------------------------FETCH DATA------------------------------------------->

const fetchData = () => {
  return fetch(
    "http://hp-api.herokuapp.com/api/characters/house/gryffindor"
  ).then((res) => {
    return res.json();
  });
};

//<------------------------USE DATA TO ADD CHARACTER NAMES TO DROPDOWN MENU------------------------------->

const select = document.querySelector("select");

fetchData().then((characters) => {
  for (let character of characters) {
    const option = document.createElement("option");
    option.setAttribute("value", character.name);
    option.textContent = character.name;
    select.append(option);
  }
});

//<--------------------------------DISPLAY SELECTED CHARACTER'S INFO------------------------------------>

const currentName = document.querySelector("#display_name");
const dob = document.querySelector("#dob");
const patronus = document.querySelector("#patronus");
const headshot = document.querySelector("#headshot");

let selectedCharacter;

const displayCharacter = () => {
  fetchData().then((characters) => {
    for (let character of characters) {
      if (select.value === character.name) {
        selectedCharacter = character;
        console.log(character);
        currentName.textContent = character.name;
        dob.textContent = `DOB: ${character.dateOfBirth}`;
        patronus.textContent = `Patronus: ${character.patronus}`;
        headshot.src = character.image;
        addButton.setAttribute("style", "display:block");
      }
    }
  });
};

select.addEventListener("change", displayCharacter);

//<------------------------ADD selectedCharacter's NAME TO TEAM MEMBERS LIST--------------------------->

const teamList = document.querySelector("#team_members");

const addCharacter = () => {
  let newMember = document.createElement("li");
  newMember.textContent = selectedCharacter.name;
  teamList.append(newMember);
};

const addButton = document.querySelector("#add_button");
addButton.addEventListener("click", addCharacter);

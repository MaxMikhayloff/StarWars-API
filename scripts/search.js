const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const selectElement = document.getElementById("mySelect");

const searchInput2 = document.getElementById("searchInput2");
const searchButton2 = document.getElementById("searchButton2");
const selectElement2 = document.getElementById("mySelect2");

const spinner = document.getElementById("spin");
const searchResult = document.getElementById("content");

const title = document.getElementById("primary")

selectElement.addEventListener('change', function () {
  selectElement.value
});

selectElement2.addEventListener('change', function () {
  selectElement2.value
});




async function text() {
  try {
    title.innerHTML = "";
    searchResult.innerHTML = "";

    spinner.style.display = "block"

    const response = await fetch(`https://swapi.dev/api/${selectElement.value}/?search=${searchInput.value}`)
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }

    const data = await response.json();
    const arr = data.results[0]

    if (selectElement.value == "people") {
      const dataFilms = arr.films;
      const dataWorld = arr.homeworld

      const dataFilmsTitle = await Promise.all(dataFilms.map(item => fetch(item).then(getItem => getItem.json()).then(gettedItem => gettedItem.title)));

      const finishFilms = dataFilmsTitle.join(", ")
      const getWorld = await fetch(dataWorld)
      const gettedWorld = await getWorld.json();
      const dataWorlName = gettedWorld.name;

      title.innerHTML = arr.name;

      const edit = {
        ...arr
      }

      edit.films = finishFilms
      edit.homeworld = dataWorlName

      for (const key in edit) {
        if (edit.hasOwnProperty(key)) {
          const dataName = document.createElement("li");
          dataName.textContent = `${key}: ${edit[key]}`;
          searchResult.appendChild(dataName)
        }
      }
    } else if (selectElement.value == "planets" || selectElement.value == "species") {
      title.innerHTML = arr.name;
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          const dataName = document.createElement("li");
          dataName.textContent = `${key}: ${arr[key]}`;
          searchResult.appendChild(dataName)
        }
      }
    }
    
    spinner.style.display = "none"
    
  } catch (error) {
    title.innerHTML = "ERROR"
    searchResult.innerHTML = "По вашему запросу ничего не найдено"
  }
}

async function aydi() {
  try {
    title.innerHTML = "";
    searchResult.innerHTML = "";

    spinner.style.display = "block"
    
    const response2 = await fetch(`https://swapi.dev/api/${selectElement2.value}/${searchInput2.value}`)

    if (!response2.ok) {
      throw new Error("Ошибка HTTP: " + response2.status);
    }

    const arr2 = await response2.json();

    if (selectElement2.value == "people") {
      const dataFilms2 = arr2.films;
      const dataWorld2 = arr2.homeworld

      const dataFilmsTitle2 = await Promise.all(dataFilms2.map(item => fetch(item).then(getItem => getItem.json()).then(gettedItem => gettedItem.title)));

      const finishFilms2 = dataFilmsTitle2.join(", ")
      const getWorld2 = await fetch(dataWorld2)
      const gettedWorld2 = await getWorld2.json();
      const dataWorlName2 = gettedWorld2.name;

      title.innerHTML = arr2.name;

      const edit2 = {
        ...arr2
      }

      edit2.films = finishFilms2
      edit2.homeworld = dataWorlName2

      for (const key2 in edit2) {
        if (edit2.hasOwnProperty(key2)) {
          const dataName2 = document.createElement("li");
          dataName2.textContent = `${key2}: ${edit2[key2]}`;
          searchResult.appendChild(dataName2)
        }
      }
    } else if (selectElement2.value == "planets" || selectElement2.value == "species") {
      title.innerHTML = arr2.name;
      for (const key2 in arr2) {
        if (arr2.hasOwnProperty(key2)) {
          const dataName2 = document.createElement("li");
          dataName2.textContent = `${key2}: ${arr2[key2]}`;
          searchResult.appendChild(dataName2)
        }
      }
    }
    
    spinner.style.display = "none"
    
  } catch (error) {
    title.innerHTML = "ERROR"
    searchResult.innerHTML = "По вашему запросу ничего не найдено"
  }
}

searchButton.addEventListener("click", async () => {
  text()
});

searchButton2.addEventListener("click", async () => {
  aydi()
});
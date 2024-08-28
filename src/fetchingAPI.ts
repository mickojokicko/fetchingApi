interface iFatchedData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const dataFromLocalStorage = JSON.parse(localStorage.getItem("idData") || "[]");
const resultField = document.querySelector(".results") as HTMLDivElement;
const inputField = document.getElementById("inputField") as HTMLInputElement;
const findIdBtn = document.getElementById("findId") as HTMLButtonElement;

//________________________Functions_____________________________________________________

function clearField(): void {
  inputField.value = "";
}

function keyboardHendler(event: KeyboardEvent) {
  const key = event.key;
  if (key === "Enter") getDataFromApi();
}

function getDataFromApi() {
  const inputFieldValue: number = +inputField.value;

  const findId = async function (numPost: number): Promise<void> {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${inputFieldValue}`
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch post with this id -> ${inputFieldValue}: error status -> ${res.status}`
        );
      }

      const data = await res.json();

      const fetchedData: iFatchedData = {
        userId: data.userId,
        id: data.id,
        title: data.title,
        body: data.body,
      };

      // ________LOCAL STORAGE _______________________________

      let usersDataStored = JSON.parse(localStorage.getItem("idData") || "[]");
      usersDataStored.push(fetchedData);

      localStorage.setItem("idData", JSON.stringify(usersDataStored));

      // __________Clear FIelds and reload page____________________
      window.location.reload();
      clearField();
      // __________________________________________
    } catch (err: any) {
      console.error("Error:", err);
      alert(err.message);
      clearField();
    }
  };
  findId(inputFieldValue);
}

function displayUi(fetchedData: iFatchedData) {
  const dataPattern = document.createElement("div") as HTMLDivElement;
  dataPattern.setAttribute("data-id", fetchedData.id.toString());
  console.log(dataPattern.getAttribute("data-id"));
  dataPattern.innerHTML = `
  <div class="results">
<p> <span> This is user's ID:</span> ${fetchedData.userId}
<p> <span> This is id:</span> ${fetchedData.id}
<p> <span>This is body:</span> ${fetchedData.body}
<p> <span> This is title:</span> ${fetchedData.title} </p></br>
<button class = "resultsBtn" id = "btnDelete">Delete</button>
  </div>
`;
  dataPattern.classList.remove("displayNone");
  dataPattern.classList.add("result");
  resultField.appendChild(dataPattern);
}

// ______________Iteration throw LS objects ____________________

dataFromLocalStorage.forEach((item: iFatchedData) => {
  displayUi(item);
});

function deleteHendler(event: Event) {
  const target = event.target as HTMLElement;
  const parentDiv = target.closest(".result") as HTMLDivElement;

  if (target.id === "btnDelete") {
    if (parentDiv) {
      const idToDelete = parentDiv.getAttribute("data-id");

      // Ukloni 'div' iz DOM-a
      parentDiv.remove();

      // Ukloni element iz localStorage
      let storedData = JSON.parse(
        localStorage.getItem("idData") || "[]"
      ) as iFatchedData[];

      // Filtriraj niz da ukloniš obrisani element
      storedData = storedData.filter(
        (item: iFatchedData) => item.id.toString() !== idToDelete
      );

      // Ažuriraj localStorage sa novim nizom
      localStorage.setItem("idData", JSON.stringify(storedData));
    }
  }
}
// ______________Events______________________

findIdBtn.addEventListener("click", getDataFromApi);
document.addEventListener("keydown", keyboardHendler);
resultField.addEventListener("click", deleteHendler);

const render = (arr) => {
  const ul = document.querySelector(".jobsList");
  ul.innerHTML = "";
  arr.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("jobs");

    const tagH3 = document.createElement("h3");
    tagH3.innerText = element.title;

    const divLocal = document.createElement("div");
    divLocal.classList.add("local-work");

    const tagP = document.createElement("p");
    tagP.innerText = element.enterprise;

    const tagP2 = document.createElement("p");
    tagP2.innerText = element.location;

    const divdescrition = document.createElement("button");
    divdescrition.classList.add("divDescrition");

    const tagP3 = document.createElement("p");
    tagP3.innerText = element.descrition;

    const divButtons = document.createElement("button");
    divButtons.classList.add("buttons");

    const button = document.createElement("button");
    button.classList.add("bt-WorkType");
    button.innerText = element.modalities[0];

    const button2 = document.createElement("button");
    button2.classList.add("bt-WorkType");
    button2.innerText = element.modalities[1];

    const button3 = document.createElement("button");
    button3.classList.add("bt-Submit");
    button3.id = element.id;
    button3.innerText = "Candidatar";

    button3.addEventListener("click", (event) => {
      if (event.target.innerText == "Candidatar") {
        button3.innerHTML = "";
        button3.innerText = "Remover Candidatura";
      } else {
        button3.innerHTML = "";
        button3.innerText = "Candidatar";
      }
    });

    ul.append(li, button3);
    li.append(tagH3, divLocal, divdescrition, divButtons);
    divLocal.append(tagP, tagP2);
    divdescrition.appendChild(tagP3);
    divButtons.append(button, button2);
  });
};
render(jobsData);

let newArray = [];

function eventAdd() {
  const jobsButton = document.getElementsByClassName("bt-Submit");
  const jobsBt = Array.from(jobsButton);

  jobsBt.forEach((button) => {
    button.addEventListener("click", (event) => {
      jobsData.forEach((element) => {
        if (
          event.target.id == element.id &&
          event.target.innerText == "Remover Candidatura"
        ) {
          newArray.push(element);
        }
      });

      if (event.target.innerText == "Candidatar") {
        const remover = document.querySelectorAll(".jobsNew");
        remover.forEach((elementoLi) => {
          if (elementoLi.id == event.target.id) {
            elementoLi.remove();
          }
        });
        const i = newArray.findIndex((index) => {
          return index.id == event.target.id;
        });
        newArray.splice(i, 1);
      }
      if (!newArray.length) {
        const ulAside = document.querySelector(".jobsSelected");
        ulAside.innerHTML = "";
        ulAside.innerText = "Nenhuma vaga selecionada";
      }

      if (newArray.length > 0) {
        const ul = document.querySelector(".jobsSelected");
        ul.innerHTML = "";
        addVagas(newArray);
      }
      const setLocation = JSON.stringify(newArray);
      localStorage.setItem("jobs", setLocation);
    });
  });
}
eventAdd();

if (!newArray.length) {
  const ulAside = document.querySelector(".jobsSelected");
  ulAside.innerHTML = "";
  ulAside.innerText = "Nenhuma vaga selecionada";
} else {
  addVagas(newArray);
}

const addVagas = (jobsList) => {
  const ul = document.querySelector(".jobsSelected");

  jobsList.forEach((newElement) => {
    const li = document.createElement("li");
    li.classList.add("jobsNew");
    li.id = newElement.id;

    const divHeader = document.createElement("div");
    divHeader.classList.add("divHeader");

    const tagH3 = document.createElement("h3");
    tagH3.innerText = newElement.title;

    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("bt-remove");
    buttonRemove.id = newElement.id;

    const imgTrash = document.createElement("img");
    imgTrash.src = "/assets/img/trash.svg";
    imgTrash.id = newElement.id;

    const divAside = document.createElement("div");
    divAside.classList.add("divAside");

    const tagP = document.createElement("p");
    tagP.innerText = newElement.enterprise;

    const tagP2 = document.createElement("p");
    tagP2.innerText = newElement.location;

    buttonRemove.addEventListener("click", (event) => {
      const buttonCandidatar = document.querySelectorAll(".bt-Submit");
      buttonCandidatar.forEach((bt) => {
        if (bt.id == event.target.id) {
          console.log(bt);
          bt.innerText = "Candidatar";
        }
      });
      const i = newArray.findIndex((element) => {
        return element.id == event.target.id;
      });
      newArray.splice(i, 1);
      li.remove();

      if (!newArray.length) {
        const ulAside = document.querySelector(".jobsSelected");
        ulAside.innerHTML = "";
        ulAside.innerText = "Nenhuma vaga selecionada";
      }

      const setLocation = JSON.stringify(newArray);
      localStorage.setItem("jobs", setLocation);
    });

    li.append(divHeader, divAside);
    divHeader.append(tagH3, buttonRemove);
    buttonRemove.appendChild(imgTrash);
    divAside.append(tagP, tagP2);
    ul.appendChild(li);
  });
};

const itemCapture = localStorage.getItem("jobs");
const newItemCapture = JSON.parse(itemCapture);
console.log(newItemCapture);

if (newItemCapture.length > 0) {
  const ulAside = document.querySelector(".jobsSelected");
  ulAside.innerHTML = "";
  newArray = [];
  newArray = [...newItemCapture];
  const buttonNew = document.querySelectorAll(".bt-Submit");
  buttonNew.forEach((btElement) => {
    newItemCapture.forEach((btElement2) => {
      if (btElement.id == btElement2.id) {
        btElement.innerText = "Remover Candidatura";
      }
    });
  });
  addVagas(newItemCapture);
}

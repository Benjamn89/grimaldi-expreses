// console.log("If the color is red and the msg is display we all set");

// document
//   .querySelector(".header-btn-div")
//   .addEventListener("click", async () => {
//     var obj = {
//       name: "Binaymin",
//       email: "Dont care",
//       msg: "Hey",
//     };

//     var request = new XMLHttpRequest();
//     request.open("POST", "http://localhost:3000/console", true);
//     request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     request.send(JSON.stringify(obj));
//   });

let counter = 0;

const initialClick = () => {
  polygonDisable();
  counter--;
  if (counter < 0) {
    counter = 2;
  }
  if (counter > 2) {
    counter = 0;
  }
  removeViewLeft();
  enterViewRight();
  changeOnlyDomNav();
  setTimeout(() => {
    polygonDisable();
    removeClasses();
  }, 700);
};

const initialClick2 = () => {
  polygonDisable();
  counter++;
  if (counter < 0) {
    counter = 2;
  }
  if (counter > 2) {
    counter = 0;
  }
  removeViewRight();
  enterViewLeft();
  changeOnlyDomNav();
  setTimeout(() => {
    polygonDisable();
    removeClasses();
  }, 700);
};

document
  .querySelector(".carrousel-polygon")
  .addEventListener("click", initialClick);
document
  .querySelector(".carrousel-polygon2")
  .addEventListener("click", initialClick2);

const enterViewRight = () => {
  document
    .querySelectorAll(".global-section")
    [counter].classList.add("section-in-right");
};
const enterViewLeft = () => {
  document
    .querySelectorAll(".global-section")
    [counter].classList.add("section-in-left");
};

const removeViewLeft = () => {
  const removeLeftEl = document.querySelector(".section-in-left");
  const removeRightEl = document.querySelector(".section-in-right");
  if (removeLeftEl) {
    removeLeftEl.classList.add("section-out-left");
  }
  if (removeRightEl) {
    removeRightEl.classList.add("section-out-left");
  }
};

const removeViewRight = () => {
  const removeLeftEl = document.querySelector(".section-in-left");
  const removeRightEl = document.querySelector(".section-in-right");
  if (removeLeftEl) {
    removeLeftEl.classList.add("section-out-right");
  }
  if (removeRightEl) {
    removeRightEl.classList.add("section-out-right");
  }
};

removeClasses = () => {
  const removeLeftEl = document.querySelector(".section-out-left");
  const removeRightEl = document.querySelector(".section-out-right");
  if (removeLeftEl) {
    removeLeftEl.classList.remove("section-in-right");
    removeLeftEl.classList.remove("section-in-left");
    removeLeftEl.classList.remove("section-out-left");
  }
  if (removeRightEl) {
    removeRightEl.classList.remove("section-in-right");
    removeRightEl.classList.remove("section-in-left");
    removeRightEl.classList.remove("section-out-right");
  }
};

// Taking care the nav classes
const changeViewFromNav = (e) => {
  const index = parseInt(e.target.getAttribute("index"));
  if (index === counter) {
    return null;
  }
  counter = index;
  if (index > counter) {
    removeViewLeft();
    enterViewRight();
  } else {
    removeViewRight();
    enterViewLeft();
  }
  setTimeout(() => {
    removeClasses();
  }, 700);
  if (e.target.classList.contains("phone-section-selector")) {
    chnagePhoneDiv();
  } else {
    changeOnlyDomNav();
  }
};

const chnagePhoneDiv = () => {
  document.querySelector(".phone-on").classList.remove("phone-on");
  document
    .querySelectorAll(".phone-section-selector")
    [counter].classList.add("phone-on");
};

const changeOnlyDomNav = () => {
  document.querySelector(".logo-p-on").classList.remove("logo-p-on");
  document.querySelectorAll(".logo-p")[counter].classList.add("logo-p-on");
};

for (var i = 0; i < 3; i++) {
  document
    .querySelectorAll(".logo-p")
    [i].addEventListener("click", changeViewFromNav);
  document
    .querySelectorAll(".phone-section-selector")
    [i].addEventListener("click", changeViewFromNav);
}

// Disable the carrousel buttons
const polygonDisable = () => {
  document
    .querySelector(".carrousel-polygon")
    .classList.toggle("carrousel-polygon-off");
  document
    .querySelector(".carrousel-polygon2")
    .classList.toggle("carrousel-polygon-off");
};

// Contact me button
document
  .querySelector(".header-btn-div")
  .addEventListener("click", changeViewFromNav);

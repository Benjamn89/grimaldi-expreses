const focusInput = (e) => {
  try {
    let className = e.target.parentNode.children[1].className;
    document
      .querySelector(`.${className}`)
      .classList.toggle("contact-input-span-on");
  } catch {
    console.log("focusinput err");
  }
};

const focusOut = (e) => {
  if (e.target.value.length < 1) {
    const className = e.target.parentNode.children[1].className.split(" ")[0];
    document
      .querySelector(`.${className}`)
      .classList.toggle("contact-input-span-on");
  }
};

const checkEmail = (e) => {
  const val = e.target.value;
  const el = document.querySelector(".contact-input-input2");
  if (val.length > 6 && val.includes("@")) {
    let validate = val.split("@")[1];
    if (validate.length > 3) {
      try {
        el.classList.remove("contact-input-red-line");
      } catch {
        console.log("remove class err");
      }
    } else {
      el.classList.add("contact-input-red-line");
    }
  } else {
    el.classList.add("contact-input-red-line");
  }
};

const typeOnInput = (e) => {
  let eT = e.target;
  getAtt = eT.getAttribute("index");
  if (eT.classList.contains("contact-input-red-line") && getAtt !== "1") {
    if (getAtt === "0" && eT.value.length > 2) {
      eT.classList.remove("contact-input-red-line");
    }
    if (getAtt === "2" && eT.value.length > 6) {
      e.target.classList.remove("contact-input-red-line");
    }
  }
};

for (var i = 0; i < 3; i++) {
  document
    .querySelectorAll(".input-global")
    [i].addEventListener("focus", focusInput);
  document
    .querySelectorAll(".input-global")
    [i].addEventListener("focusout", focusOut);
  document
    .querySelectorAll(".input-global")
    [i].addEventListener("input", typeOnInput);
}

document
  .querySelector(".contact-input-input2")
  .addEventListener("focusout", checkEmail);

// Send msg click
const sendMsg = () => {
  let inputs = document.querySelectorAll(".input-global");
  let checkInputs = 0;
  if (inputs[0].value.length > 2) {
    checkInputs++;
  } else {
    inputs[0].classList.add("contact-input-red-line");
  }
  if (
    inputs[1].value.length > 2 &&
    !inputs[1].classList.contains("contact-input-red-line")
  ) {
    checkInputs++;
  } else {
    inputs[1].classList.add("contact-input-red-line");
  }
  if (inputs[2].value.length > 6) {
    checkInputs++;
  } else {
    inputs[2].classList.add("contact-input-red-line");
  }
  if (checkInputs === 3) {
    const obj = {
      name: inputs[0].value,
      email: inputs[1].value,
      msg: inputs[2].value,
    };
    fetch("/console", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(() => console.log("Email has been sent"))
      .catch((err) => console.log(err));

    document
      .querySelector(".contact-ellipse")
      .classList.add("contact-ellipse-off");
    document
      .querySelector(".contact-spinner")
      .classList.add("contact-spinner-on");
    setTimeout(() => {
      document
        .querySelector(".contact-spinner")
        .classList.remove("contact-spinner-on");
      document
        .querySelector(".contact-ellipse")
        .classList.remove("contact-ellipse-off");
      setTimeout(() => {
        document
          .querySelector(".arrow-contact")
          .classList.add("arrow-contact-off");
        document.querySelector(".contact-vi").classList.add("contact-vi-on");
        document
          .querySelector(".contact-input-div-wrapper")
          .classList.add("contact-input-div-wrapper-off");
        document
          .querySelector(".contact-msg-sent")
          .classList.add("contact-msg-sent-on");
      }, 500);
    }, 1500);
  }
};

document.querySelector(".contact-ellipse").addEventListener("click", sendMsg);

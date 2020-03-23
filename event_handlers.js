const counter = () => {
    let count = 0;
    return {
        next: () => {
            return count++;
        }
    }
}

const aCounter = counter();

let playerName;

document.querySelector("#menu-image").addEventListener("click", nextStep);

function nextStep(e) {
    let currentCount = aCounter.next();
    console.log("step number " + currentCount);
    switch (currentCount) {
        case 0:
            replaceImage(e.target, "assets/jiub.png");
            break;
        case 1:
            showSpeech(QUOTES.greeting);
            break;
        case 2:
            hideSpeech();
            askName();
            break;
        case 3:
            showSpeech(QUOTES.storm);
            break;
        case 4:
            hideSpeech();
            replaceImage(e.target, "assets/guard_coming.png");
            showSpeech(QUOTES.guardComes);
            break;
        case 5:
            hideSpeech();
            break;
    }
}

function replaceImage(oldImage, newImagePath) {
    let newImage = new Image();
    newImage.id = "menu-image";
    newImage.src = newImagePath;
    newImage.addEventListener("load", () => {
        newImage.addEventListener("click", nextStep);
    });
    let parent = oldImage.parentNode;
    parent.insertBefore(newImage, oldImage);
    parent.removeChild(oldImage);
}

function showSpeech(text) {
    let speechBox = document.querySelector(".dialog-wrapper");
    speechBox.innerHTML = `<p>${text}</p>`;
    speechBox.style.visibility = "visible";
}

function hideSpeech() {
    let dialog = document.querySelector(".dialog-wrapper");
    dialog.innerHTML = "";
    dialog.style.visibility = "hidden";
}

function askName() {
    // prevent clicking to next steps without entering name
    const image = document.querySelector("#menu-image");
    image.removeEventListener("click", nextStep);

    let customDialog = document.createElement("div");
    customDialog.className = "dialog output sexy-border";
    customDialog.id = "ask-name-dialog";
    customDialog.innerHTML = customDialogElement();

    let wrapper = document.querySelector(".wrapper");
    wrapper.appendChild(customDialog);

    let nameInput = document.querySelector("#name-input");
    nameInput.addEventListener(
        "input",
        () => {
            console.log("enabling button");
            document.querySelector("#name-button").disabled = false;
        },
        { once: true }
    );

    let nameButton = document.querySelector("#name-button");
    nameButton.addEventListener("click", () => {
        playerName = nameInput.value;
        console.log("player name is " + playerName);
        wrapper.removeChild(customDialog);
        image.addEventListener("click", nextStep);
        image.click();
    });
}

function customDialogElement() {
    let dialog =
        `<div class="dialog-header">
            <p>Name</p>
        </div>
        <div class="dialog-body">
            <input type="text" id="name-input" class="input sexy-border">
        </div>
        <div class="dialog-footer">
            <button id="name-button" class="sexy-border" disabled>OK</button>
        </div>`;
    return dialog;
}
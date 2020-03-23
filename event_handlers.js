const counter = () => {
    let count = 0;
    return {
        next: () => {
            return count++;
        }
    }
}

let aCounter = counter();

let dialogIsActive = false;
let playerName;

const image = document.querySelector("#menu-image");
image.onclick = function(e) {
    nextStep(e);
}

function nextStep(e) {
    if (dialogIsActive) {
        return;
    }
    let currentCount = aCounter.next();
    console.log("step number " + currentCount);
    switch(currentCount) {
        case 0:
            replaceImage(e.target, "assets/jiub.png");
            break;
        case 1:
            showDialog(text.greeting);
            break;
        case 2:
            hideDialog();
            askName();
            break;
        case 3:
            showDialog(text.storm);
            break;
        case 4:
            hideDialog();
            replaceImage(e.target, "assets/guard_coming.png");
            showDialog(text.guardComes);
            break;
        case 5:
            hideDialog();
            break;
    }
}

function replaceImage(oldImage, newImagePath) {
    let newImage = new Image();
    newImage.id = "menu-image";
    newImage.src = newImagePath;   
    newImage.onload = function() {
        console.log(`image ${newImagePath} finished loading`);
        newImage.addEventListener("click", (e) => {
            nextStep(e);
        });
    };
    console.log("starting loading image " + newImagePath);
    let parent = oldImage.parentNode;
    parent.insertBefore(newImage, oldImage);
    parent.removeChild(oldImage);
    
}

function showDialog(text) {
    let dialog = document.querySelector(".dialog-wrapper");    
    dialog.innerHTML = `<p>${text}</p>`;
    dialog.style.visibility = "visible";
}

function hideDialog() {
    let dialog = document.querySelector(".dialog-wrapper");    
    dialog.innerHTML = "";
    dialog.style.visibility = "hidden";
}

function askName() {
    dialogIsActive = true;
    let wrapper = document.querySelector(".wrapper");
    let customDialog = document.createElement("div");
    customDialog.className = "dialog output sexy-border";
    customDialog.id = "ask-name-dialog";
    customDialog.innerHTML = customDialogElement();    
    wrapper.appendChild(customDialog);

    let nameInput = document.querySelector("#name-input");
    nameInput.oninput = function(e) {
        console.log("enabling button");
        document.querySelector("#name-button").disabled = false;
        nameInput.oninput = null;
    }

    let nameButton = document.querySelector("#name-button");
    nameButton.onclick = function(e) {
        playerName = nameInput.value;
        console.log("player name is " + playerName);
        wrapper.removeChild(customDialog);
        dialogIsActive = false;
        image.click();
    }

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
     </div>
    `;
    return dialog;
}
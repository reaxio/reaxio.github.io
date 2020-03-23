const counter = () => {
    let count = 0;
    return {
        next: () => {
            return count++;
        }
    }
}

let aCounter = counter();

let playerName;

const image = document.querySelector("#menu-image");
image.addEventListener("click", (e) => {
    nextStep(e);
});


function nextStep(e) {
    let currentCount = aCounter.next();
    console.log("step number " + currentCount);
    switch(currentCount) {
        case 0:
            replaceImage(e.target, "assets/jiub.png");
            break;
        case 1:
            showDialog("Stand up, there you go. You were dreaming. What's your name?");
            break;
        case 2:
            hideDialog();
            askName();
            break;
        case 3:
            showDialog("Well, not even last night's storm could wake you. I heard them say we've reached Morrowind. I'm sure they'll let us go.");
            break;
        case 4:
            hideDialog();
            showDialog("Quiet, here comes the guard.");
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
        nextStep();
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
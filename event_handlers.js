const counter = () => {
    let count = 0;
    return {
        next: () => {
            return count++;
        }
    }
}

let aCounter = counter();

const image = document.querySelector("#menu-image");
image.addEventListener("click", (e) => {
    nextStep(e);
});


function nextStep(e) {
    let currentCount = aCounter.next();
    switch(currentCount) {
        case 0:
            replaceImage(e.target, "assets/jiub.png");
            break;
        case 1:
            showDialog();
            break;
        case 2:
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

function showDialog() {
    let dialog = document.querySelector(".dialog-wrapper");    
    dialog.innerHTML = "<p>Stand up, there you go. You were dreaming. What's your name?</p>";
    dialog.style.visibility = "visible";
    console.log("created dialog");
}

function hideDialog() {
    let dialog = document.querySelector(".dialog-wrapper");    
    dialog.innerHTML = "";
    dialog.style.visibility = "hidden";
}

function customDialog() {
    let dialog = 
    `<div class="dialog">
     <div class="dialog-header"></div>
     <div class="dialog-body"></div>
     <div class="dialog-footer">
          <button>click</button>
     </div>
    </div>
    `;
    return dialog;
}
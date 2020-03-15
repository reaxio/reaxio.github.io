

function changetojiub() {
    console.log("change to jiub start ");
    let image = document.createElement("img");
    image.src = "assets/jiub.jpg";
    let oldImage = document.getElementById("start-image");
    document.getElementById("wrapper").replaceChild(image, oldImage);
}


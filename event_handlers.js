const counter = () => {
    let count = 0;
    return {
        next: () => {
            return count++;
        }
    }
}

let count = counter();

const image = document.querySelector("#menu-image");
image.addEventListener("click", (e) => {
    console.log("image clicked " + count.next());
    e.target.src = "assets/jiub.jpg";
})
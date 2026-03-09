const hamburgerMenuContainerTag = document.querySelector(
  ".hamburgerMenuContainer"
);
const hamburgerLine1Tag = document.querySelector(".line1");
const hamburgerLine2Tag = document.querySelector(".line2");
const hamburgerLine3Tag = document.querySelector(".line3");

hamburgerMenuContainerTag.addEventListener("click", ()=> {
  hamburgerMenuContainerTag.append(hamburgerLine1Tag, hamburgerLine2Tag, hamburgerLine3Tag);
})

console.log("Hi");
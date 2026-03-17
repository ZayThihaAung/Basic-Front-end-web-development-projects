import {products} from "./products.js";
const inputTag = document.getElementsByClassName("autoCompleteInput")[0];
const resultContainerTag =  document.getElementsByClassName("resultContainer")[0];
const enteredProductTag = document.getElementsByClassName("enteredProduct")[0]

let searchedText = ""
let filteredProducts = [];
inputTag.addEventListener("keyup", (event) => {
  if (
    event.key === "ArrowDown" ||
    event.key === "ArrowUp" ||
    event.key === "Enter"
  ) {
    navigateAndSelectProduct(event.key);
    return

  }
   //console.log("Key passed..", event.key)
    resultContainerTag.innerHTML = "";
     searchedText = event.target.value.toLowerCase();
    //console.log("Customers Searched is :", searchedText);
    if (searchedText.length === 0){
      return
    }
    filteredProducts = products.filter(product => {
       return product.title.toLowerCase().includes(searchedText);
    })
    const hasProductsToShow = filteredProducts.length> 0;
    if (hasProductsToShow) {
        for (let i = 0; i< filteredProducts.length; i++){
            const productIteamContainer = document.createElement('div');
            productIteamContainer.id = filteredProducts[i].id;
            productIteamContainer.classList.add("productIteamContainer");

            const productName = document.createElement("div");
            productName.classList.add("productName");
            productName.append(filteredProducts[i].title);

            const productImage = document.createElement("img");
            productImage.classList.add("productImage");
            productImage.src= filteredProducts[i].image;

            productIteamContainer.append(productImage, productName);
            resultContainerTag.append(productIteamContainer);

        }
    }
});

const deselectProduct = () => {
  const productToDeselect = document.querySelectorAll(".selected");
  productToDeselect.forEach((product) => {
    product.style.backgroundColor = "white";
    product.classList.remove("selected");
  });
};

const selectedProduct = (index) => {
  const productIdToSelect = filteredProducts[index].id.toString()
  let productIteamContainerToSelect =document.getElementById(
    productIdToSelect
  );
  productIteamContainerToSelect.style.backgroundColor ="gray";
  return productIteamContainerToSelect
}

let indexToSelect = -1
const navigateAndSelectProduct = (key) => {
  if (key === "ArrowDown"){
    if (indexToSelect === filteredProducts.length -1){
      indexToSelect = -1;
      deselectProduct()
      console.log("indexToSelect before +1: ", indexToSelect)
      return
    }
    indexToSelect += 1;
    console.log('indexToSelect after +1', indexToSelect)
    let productIteamContainerToSelect = selectedProduct(indexToSelect)
    if (indexToSelect > 0){
      deselectProduct();
      console.log("passed");
    }
    productIteamContainerToSelect.classList.add('selected');
    //console.log(productIteamContainerToSelect)
    //console.log(productIdToSelect)
  }else if(key === "ArrowUp"){
    if (indexToSelect === -1){
      indexToSelect = filteredProducts.length - 1;
      const productItemContainerToSelect = selectedProduct(indexToSelect);
      productItemContainerToSelect.classList.add('selected');
      return
    }

    if (indexToSelect === 0) {
      deselectProduct()
      indexToSelect = -1
      console.log(indexToSelect)
      return
    }
    
    indexToSelect -=1;
    deselectProduct()
    const productIteamContainerToSelect =selectedProduct(indexToSelect)
    productIteamContainerToSelect.classList.add("selected")
    console.log("Arrow up indexToSelect value now : ",indexToSelect)
  } else {
    const enteredProduct = selectedProduct(indexToSelect)
    console.log("entered product", enteredProduct)
    resultContainerTag.innerHTML="";
    enteredProduct.style.backgroundColor = "lightBlue"
    enteredProductTag.classList.add("enteredProduct")
    enteredProductTag.append(enteredProduct)
    enteredProductTag.style.display = "block"
    indexToSelect = -1
    if (searchedText.length === 0){
      productIteamContainer.innerHTML ="";
      enteredProductTag.style.display = "none"
    }
  }
}

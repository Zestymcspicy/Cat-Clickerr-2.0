const model = {

  imageArray : [],
  currentCat : null,

  createNewCat : function (varName, name, imageLocation) {
    const varName = new AnimalImage(`${name}`, `${imageLocation}`)
  }
}
  class AnimalImage {
    constructor(name, imageLocation) {
      this.name = name;
      this.imageLocation = imageLocation;
      this.clickCount = 0;
      model.imageArray.push(this);
    };
  };

  const larry = new AnimalImage("Larry Shonsleberry", "images/IMG_1278.png");
  const chewie = new AnimalImage("Chewbacca", "images/chewie.png");
  const twoKitties = new AnimalImage("Cuddling Kittens", "images/twoKitties.png");
  const phil = new AnimalImage("Angry Phil", "images/philthemanx.png");
  const oscar = new AnimalImage("Oscar the Kitty", "images/oscar.png");
  const freak = new AnimalImage("Freak Show", "images/freakycat.jpg")



const octopus = {

  init: function() {
    model.currentCat = model.imageArray[0];

    listView.init();
    catView.init()
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats : function() {
    return model.imageArray;
  },

  setCurrentCat : function(catObj) {
    model.currentCat = catObj;
  },

  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  }
};

const catView = {

  init : function(){
    this.catSpace = document.getElementById('catContainer');
    this.catImage = document.getElementById("catImage");
    this.catName = document.getElementById("cat-name");
    this.clicks = document.getElementById("clicks");

    this.catImage.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    this.render();
  },

  render: function() {

    let currentCat = octopus.getCurrentCat();
    this.clicks.innerHTML = currentCat.clickCount;
    this.catImage.src = currentCat.imageLocation;
    this.catName.innerHTML = currentCat.name;
    }

}


const listView = {

  init : function() {
    this.adminButton = document.getElementById("adminButton");
    this.catList = document.getElementById("catList");
    this.adminButton.addEventListener("click", function () {
      admin.init();
    })
    this.render();
  },

  render : function () {

    let cats = octopus.getCats();
    for (let cat of cats) {
      let entry = document.createElement("li");
      entry.innerHTML=cat.name;
      this.catList.appendChild(entry);
      entry.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
          };
        })(cat));
    }
  }
}

const admin = {

  init : function () {
    this.adminModal = document.getElementById("adminModal");
    this.viewToggle();
    this.clickCount = document.getElementById("modalClick");
    this.newCatButton = document.getElementById("newCatButton");
    this.editCurrentButton = document.getElementById("editCurrentButton");
    this.newCatButton.addEventListener("click", function() {
      this.newCatForm();
    })
    this.editCurrentButton.addEventListener("click", function() {
      this.editCurrentForm();
    })
  },

  viewToggle : function() {
    if (this.adminModal.style.display==="block"){
      this.adminModal.style.display = "none";
    } else {this.adminModal.style.display = "block";
  }
},
  modalBox : function() {
}
}
octopus.init();

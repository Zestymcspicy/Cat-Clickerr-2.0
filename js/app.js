class AnimalImage {
  constructor(name, imageLocation) {
    this.name = name;
    this.imageLocation = imageLocation;
    this.clickCount = 0;
    model.imageArray.push(this);
  };
};

const model = {

  imageArray : [],
  currentCat : null,

  createNewCat : function (name, imageLocation) {
    new AnimalImage(`${name}`, `${imageLocation}`);
    octopus.init();
  },

  editCat : function (cat, editedName, editedImageLocation) {
    cat.imageLocation = editedImageLocation;
    cat.name = editedName;
    octopus.init();
  },
}

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
  },
  // TODO: fix this
  retrieveNew: function(newVarName, newName, newImageLocation) {
    model.createNewCat(newVarName, newName, newImageLocation);
  },

  retrieveEdited: function(cat, name, imageLocation) {
    model.editCat(cat, name, imageLocation);
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
    this.catList = document.getElementById("catList");
    this.catList.innerHTML = "";
    this.adminButton = document.getElementById("adminButton");
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
    this.submitButton = document.getElementById("submitButton");
    this.adminModal = document.getElementById("adminModal");
    this.viewToggle();
    this.clickCount = document.getElementById("modalClick");
    this.newCatButton = document.getElementById("newCatButton");
    this.editCurrentButton = document.getElementById("editCurrentButton");
    this.newCatButton.addEventListener("click", function() {
      admin.newCatForm();
    })
    this.editCurrentButton.addEventListener("click", function() {
      admin.editCurrentForm();
    })
    this.catForm = document.getElementById("catEditor");
    this.editorState = document.getElementById("editorState");
    },

  editCurrentForm : function () {
    let currentCat = octopus.getCurrentCat();
    let theForm = this;
    this.editorState.innerHTML = "Edit Current";
    this.catForm.style.display = "block";
    this.catForm["cname"].value = currentCat.name;
    this.catForm["imageLocation"].value = currentCat.imageLocation;
    this.clickCount.innerHTML = `Clicks = ${currentCat.clickCount}`;
    this.submitButton.addEventListener("click", function(e) {
      e.preventDefault();
      octopus.retrieveEdited(currentCat, theForm.catForm["cname"].value, theForm.catForm["imageLocation"].value);
      admin.viewToggle();
  })
},
//TODO: fix this.
  newCatForm : function () {
    this.editorState.innerHTML = "Create New";
    this.catForm.style.display = "block";
    this.newName = this.catForm["cname"].value;
    this.newImageLocation = this.catForm["imageLocation"].value;
    
    this.submitButton.addEventListener("click", function(e) {
      e.preventDefault();
      octopus.retrieveNew(admin.newVarName, admin.newName, admin.catForm["imageLocation"].value);
    })
  },

  viewToggle : function () {
    if (this.adminModal.style.display==="block"){
      this.adminModal.style.display = "none";
    } else {this.adminModal.style.display = "block";
    }
  },


}
octopus.init();

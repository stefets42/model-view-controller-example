/* ======= Model ======= */
var cat = { 
	currentCat: null,
	adminShow: false,
	cats: [
		{
			clickCount: 0, 
			name: "Marcel", 
			imgSrc: "img/maurice_the_cat.jpg" 
		},
		{
			clickCount: 0, 
			name: "Roger", 
			imgSrc: "img/roger_the_cat.jpg" 
		},
		{
			clickCount: 0, 
			name: "Félix", 
			imgSrc: "img/felix_the_cat.jpg" 
		},
		{
			clickCount: 0, 
			name: "Chanel", 
			imgSrc: "img/chanel_the_cat.jpg" 
		}, 
		{ 
			clickCount: 0, 
			name: "Coco", 
			imgSrc: "img/coco_the_cat.jpg" 
		}
	]
};

/* ======= View ======= */
var catDisplayView = {
    init: function() {
        this.catElement = document.getElementById('cat');
        this.catNameElement = document.getElementById('cat-name');
        this.catImageElement = document.getElementById('cat-img');
        this.catCountElement = document.getElementById('cat-count');
        this.catImageElement.addEventListener('click', function() { controller.incrementCounter(); });
        this.render();
    },

    render: function() {
        var currentCat = controller.getCurrentCat();
        this.catCountElement.textContent = currentCat.clickCount;
        this.catNameElement.textContent = "Click on " + currentCat.name + " to increase its counter";
        this.catImageElement.src = currentCat.imgSrc;
    }
};

var catListView = {
    init: function() {
        this.catListElement = document.getElementById('cat-list');
        this.render();
    },
    
    render: function() {
        var cat, element, i;
        var cats = controller.getCats();
        this.catListElement.innerHTML = '';
        for (i = 0; i < cats.length; i++) {
            cat = cats[i];
            element = document.createElement('div');
            element.textContent = cat.name;
            element.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catDisplayView.render();
                };
            })(cat));
            this.catListElement.appendChild(element);
        }
    }
};

var adminView = {
    init: function(){
        this.adminCatName = document.getElementById("adminCatName");
        this.adminCatURL = document.getElementById("adminCatURL");
        this.adminCatClicks = document.getElementById("adminCatClicks");
        var admin = document.getElementById("admin");
        
        this.adminBtn = document.getElementById("adminBtn");
        this.adminCancel = document.getElementById("adminCancel");
        this.adminSave = document.getElementById("adminSave");
        
        this.adminBtn.addEventListener('click', function(){
            controller.adminDisplay();
        });
        
        this.adminCancel.addEventListener('click', function(){
            controller.adminCancel();
        });
        
        this.adminSave.addEventListener('click', function(){
            controller.adminSave();
        });
        
        this.render();
    },
    
    render: function(){
        var currentCat = controller.getCurrentCat();
        this.adminCatName.value = currentCat.name;
        this.adminCatURL.value = currentCat.imgSrc;
        this.adminCatClicks.value = currentCat.clickCount;
    },
    
    show: function(){
            this.render();
            admin.style.display = 'block';
        },
        
    hide: function(){
        admin.style.display = 'none';
    }

};

/* ======= Controller ======= */
var controller = {
    init: function() {
        this.cats = controller.getCats();
        
        cat.currentCat = this.cats[0];
        catListView.init();
        catDisplayView.init();
        adminView.init();
        adminView.hide();
    },
    
    getCurrentCat: function() { 
    	return cat.currentCat;
    },
    
    getCats: function() { 
    	return cat.cats;
    },
    
    setCurrentCat: function(new_cat) { 
    	cat.currentCat = new_cat;
    },
    
    incrementCounter: function() {
        cat.currentCat.clickCount++;
        catDisplayView.render();
    },

    adminDisplay: function() {
        if (cat.adminShow == false) {
            cat.adminShow = true;
            adminView.show();
        }
        else if (cat.adminShow == true) {
            cat.adminShow = false;
            adminView.hide();
        }
    },
    
    adminCancel: function() {
        adminView.hide();
    },
    
    adminSave: function() {
        var new_cat = { 
            name: adminCatName.value,
            imgSrc: adminCatURL.value,
            clickCount: adminCatClicks.value,
        };
        this.cats.push(new_cat);
        controller.setCurrentCat(new_cat);

        catDisplayView.render();
        catListView.render();
        adminView.hide();
    }
};


// Make the cat clicker work
controller.init();

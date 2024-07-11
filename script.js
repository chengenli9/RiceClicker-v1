
//DOM elements
const grainCountDisplay = document.getElementById('grain-count'),
      perClickDisplay = document.getElementById('per-click'),
      incomeDisplay = document.querySelector('.income-display'),
      riceplantDisplay = document.querySelector('.rice-plant-count'),
      farmerDisplay = document.querySelector('.farmer-count'),
      hutDisplay = document.querySelector('.hut-count'),
      houseDisplay = document.querySelector('.house-count'),
      factoryDisplay = document.querySelector('.factory-count'),
      templeDisplay = document.querySelector('.temple-count'),
      riceButton = document.querySelector('#rice-btn'),
      upgradeButtons = document.querySelectorAll('.upgrades'),
      riceCookerBtn = document.querySelector('#rice-cooker-btn'),
      ricePlantBtn = document.querySelector('#rice-plant-btn'),
      farmerBtn = document.querySelector('#farmer-btn'),
      hutBtn = document.querySelector('#hut-btn'),
      houseBtn = document.querySelector('#house-btn'),
      factoryBtn = document.querySelector('#factory-btn'),
      templeBtn = document.querySelector('#temple-btn');


//grain, perclick, income
let grainCount = 0,
    perclickCount = 1,
    incomeCount = 0;


//values for each upgrade
const UPGRADE_VALUES = {
  riceCooker: {count: 0, cost: 10, income: 1},
  ricePlant: {count: 0, cost: 25, income: 5},
  farmer: {count: 0, cost: 100, income: 10},
  hut: {count: 0, cost: 2500, income: 50},
  house: {count: 0, cost: 10000, income: 100},
  factory: {count: 0, cost: 250000, income: 500},
  temple: {count: 0, cost: 1000000, income: 1000}
}




//rice bowl button
riceButton.addEventListener('click', ()=> {
  grainCount += perclickCount;
  updateDisplay();
});


//upgrade income buttons

//rice cooker upgrade
//increases grains perclick
riceCookerBtn.addEventListener('click', ()=> purchaseUpgrade('riceCooker'));

//rice plant upgrade
ricePlantBtn.addEventListener('click', ()=> purchaseUpgrade('ricePlant'));

//farmer button upgrade
farmerBtn.addEventListener('click', ()=> purchaseUpgrade('farmer'));

//hut button upgrade
hutBtn.addEventListener('click', ()=> purchaseUpgrade('hut'));

//house button upgrade
houseBtn.addEventListener('click', ()=> purchaseUpgrade('house'));

//factory button upgrade
factoryBtn.addEventListener('click', ()=> purchaseUpgrade('factory'));

//temple button upgrade
templeBtn.addEventListener('click', ()=> purchaseUpgrade('temple'));

//adds income to bank every second
setInterval(()=> {
  grainCount += incomeCount;
  updateDisplay();
}, 1000);


/*
  function purchaseUpgrade
  takes in a type, aka the type of upgrade
  checks if grains is greater than or equal to cost
  adds to the income with each upgrade
*/
function purchaseUpgrade(type) {
  let upgrade = UPGRADE_VALUES[type];
  
  if(grainCount >= upgrade.cost) {
    grainCount -= upgrade.cost; //subtract cost to grainCount
    upgrade.count++; //add to upgrade type count
    upgrade.cost += Math.floor(upgrade.cost / 2); //increase cost after each purchase

    if(type === 'riceCooker') {
      //rice bowl image
      const riceBowl = document.querySelector("#rice-btn-img");

      //keep track of the currect image size
      let currentWidth = parseInt(window.getComputedStyle(riceBowl).width); 
      //new image size, plus one px each purchase
      let newSize = currentWidth + 1;
      //set the new sizes to image
      riceBowl.style.width = `${newSize}px`;
      riceBowl.style.height = `${newSize}px`;
      //each purchase adds to perclick count
      perclickCount += upgrade.income;
      updateDisplay();
    } else {
      //any upgrade not riceCooker 
      //increase the income based on upgrade type
      incomeCount += upgrade.income;
      updateDisplay();
    }

    //buying upgrade adds image to the field
    if(type === 'ricePlant') {
      const plant = document.createElement("img");
      plant.src = 'images/field-rice.png';
      plant.style.width = '3.4vw';
      riceplantDisplay.appendChild(plant);
    } else if (type === 'farmer') {
      const farmer = document.createElement("img");
      farmer.src = 'images/field-farmer.png';
      farmer.style.width = '3.4vw';
      farmerDisplay.appendChild(farmer);
    } else if (type === 'hut') {
      const hut = document.createElement("img");
      hut.src = 'images/field-hut.png';
      hut.style.width = '3.4vw';
      hutDisplay.appendChild(hut);
    } else if (type === 'house') {
      const house = document.createElement("img");
      house.src = 'images/field-house.png';
      house.style.width = '3.4vw';
      houseDisplay.appendChild(house);
    } else if (type === 'factory') {
      const factory = document.createElement("img");
      factory.src = 'images/field-factory.png';
      factory.style.width = '3.4vw';
      factoryDisplay.appendChild(factory);
    } else if (type === 'temple') {
      const temple = document.createElement("img");
      temple.src = 'images/field-temple.png';
      temple.style.width = '3.4vw';
      templeDisplay.appendChild(temple);
    }
  } 
}

/*
  function updateDisplay
  changes the values on screen based on purchases or clicks
*/
function updateDisplay() {
  grainCountDisplay.innerHTML = `${grainCount.toLocaleString()} grains`;
  perClickDisplay.innerHTML = `${perclickCount.toLocaleString()} grains per click`;
  incomeDisplay.innerHTML = `Income: ${incomeCount.toLocaleString()} g/s`;

  updateButtonStyles();
}



/*
  function updateButtonStyles 
  updates the style of each upgrade button 
  if player has enough to purchase
*/
function updateButtonStyles() {
  //reference for each upgrade btn
  const buttons = [
    { id: 'rice-cooker-btn', cost: UPGRADE_VALUES.riceCooker.cost },
    { id: 'rice-plant-btn', cost: UPGRADE_VALUES.ricePlant.cost },
    { id: 'farmer-btn', cost: UPGRADE_VALUES.farmer.cost },
    { id: 'hut-btn', cost: UPGRADE_VALUES.hut.cost },
    { id: 'house-btn', cost: UPGRADE_VALUES.house.cost },
    { id: 'factory-btn', cost: UPGRADE_VALUES.factory.cost },
    { id: 'temple-btn', cost: UPGRADE_VALUES.temple.cost },
  ];


  //each button inside buttons[]
  buttons.forEach(button => {
    //get the id for each upgrade
    const btnElement = document.getElementById(button.id);
    //reference the span class within each btnElement
    const infoSpan = btnElement.querySelector('.upgrade-info');
    const costDisplay = btnElement.querySelector('.upgrade-cost');

    costDisplay.innerHTML = `cost: ${Math.floor(button.cost).toLocaleString()}`;
    
    //if enough grains to purchase upgrade
    //border changes to white
    //upgrade-info text changes
    if (grainCount >= button.cost) {
      btnElement.style.border = '0.7vh solid white'; 
      btnElement.style.boxShadow = '0px 0px 20px white';
      infoSpan.textContent = 'Purchase';
    } else {
      btnElement.style.border = '0.7vh solid rgb(0, 89, 58)';
      btnElement.style.boxShadow = '0px 0px 20px black';
      infoSpan.textContent = 'not enough';
    }
  });


}

'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const salesTable = document.getElementById('sales-table');
const tableHeader = document.getElementById('sales-table-header');
const tableBody = document.getElementById('sales-table-body');
const tableFooter = document.getElementById('sales-table-footer');
const stores = [];
const newStoreForm = document.getElementById('store-info-form');

//Render element helper function to create, give content and append to the DOM
function renderElement(elementToCreate, content, parentElement){
  const child = document.createElement(elementToCreate);
  child.textContent = content;
  parentElement.appendChild(child);
}

//Store class + constructor
class Store {
  constructor(name, min, max, average){
    this.name = name;
    this.min = min;
    this.max = max;
    this.average = average;
    this.hourlySales = [];
    this.dailyTotal = 0;
    stores.push(this);
  }

  getRandomNumber(){
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }

  calculateHourlySales(){
    for(let i = 0; i < hours.length; i++){
      const hourlyTotal = Math.ceil(this.getRandomNumber() * this.average);
      this.hourlySales[i] = hourlyTotal;
      this.dailyTotal += hourlyTotal;
    };
  }

  render(){
    this.calculateHourlySales(); //hourly sales data to populate
    const trElement = document.createElement('tr');
    salesTable.appendChild(trElement);
    renderElement('th', this.name, trElement);
    for(let i = 0; i < this.hourlySales.length; i++){
      renderElement('td', this.hourlySales[i], trElement);
    }
    renderElement('td', this.dailyTotal, trElement);
  }
}

function renderHeader(){
  const row = document.createElement('tr');
  tableHeader.appendChild(row);
  renderElement('th', 'Stores', row);
  for(let i = 0; i < hours.length; i++){
    renderElement('th', hours[i], row);
  }
  renderElement('th', 'Daily Location Total', row);
}

function renderFooter(){
  const footer = document.createElement('tr');
  tableFooter.appendChild(footer);
  renderElement('td', 'Totals', footer);
  let allSalesTotal = 0;
  for(let i = 0; i < hours.length; i++){
    let allStoresHourlyTotal = 0;
    for(let j = 0; j < stores.length; j++){
      allSalesTotal += stores[j].hourlySales[i];
      allStoresHourlyTotal += stores[j].hourlySales[i];
    }
    renderElement('td', allStoresHourlyTotal, footer);
  }
  renderElement('td', allSalesTotal, footer);
}

//Instantiate stores
const seattle = new Store('Seattle', 23, 65, 6.3);
const tokyo = new Store('Tokyo', 3, 24, 1.2);
const dubai = new Store('Dubai', 11, 38, 3.7);
const paris = new Store('Paris', 20, 38, 2.3);
const lima = new Store('Lima', 2, 16, 4.6);

//Render all stores to sales table
function renderAll(){
  for(let i = 0; i < stores.length; i++){
    stores[i].render();
  }
}

renderHeader();
renderAll();
renderFooter();

newStoreForm.addEventListener('click', handleSubmit);
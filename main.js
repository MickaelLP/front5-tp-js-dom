import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

function countNumberOfUser(){
  let nbUser = document.querySelectorAll('.row-user');
  document.querySelector('#nbMembre').innerHTML = nbUser.length;
}

getUserFromUrl();

function getUserFromUrl(){
    fetch("https://jsonplaceholder.typicode.com/users").then(function(response){
      if(response.ok){
        let data = response.json();
        return data;
      } else {
        return null;
      }
    }).then(function(data){
      // Amélioration : utiliser la méthode "map". 
      // @TODO : améliorer le code en implémentant dynamiquement les head du tableau.
      creeTable(data);
      countNumberOfUser();
    })
    .catch(error => console.log("Erreur " + + error));
}

function extractData(data){
  // Methode à apprendre 
  const extractedData = data.map(obj => {
    return {id: obj.id, name: obj.name,email: obj.email,companyName: obj.company.name}
  });

  return extractedData;
}

function creeTable(data){
  let app = document.querySelector('#app');
  const theads = extractData(data);
  const fieldsTh = Object.keys(theads[0]);
  console.log(data);
  app.innerHTML+= `
  <table>
    <thead>
      <tr id="thead_tr">
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="tbody-data">
    </tbody>
  </table>
  `;
  fieldsTh.forEach(field => {
    document.querySelector('#thead_tr').innerHTML += `
      <th>${field}</th>
    `
  });

  data.forEach(element => {
    document.querySelector('#tbody-data').innerHTML += `
      <tr class="row-user"> 
        <td id="${element.id}"><button>X</button></td>
        <td>${element.id}</td>
        <td>${element.name} </td>
        <td> ${element.email} </td>
        <td>${element.company.name}</td>
      </tr>`;
  });
}

function appStartOfVite(){
  document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
}

// setupCounter(document.querySelector('#counter'))

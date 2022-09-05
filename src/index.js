import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');


inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event){
    const inputText = event.target.value;
    if(inputText === ""){
        return;
    }
    
    fetchCountries(inputText.trim()).then(countries => checkingQuantityInAnswer(countries))
    .catch(error =>console.log(error), Notify.failure('Oops, there is no country with that name'));
    
    function checkingQuantityInAnswer(reply){
        console.log(reply)
        if(reply.length > 10){
            Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        };
        
        giveDataState(reply);
    };
    
    function giveDataState(data){
        console.log(data)
        if(data.length === 1){
            displayMarkup(data);
        }
        displayListMarkup(data);
    };
    
    function displayListMarkup(datas){
        const markup = datas.map(country => {
            return `<li class="country-list_item">
              <img src="${country.flags.svg}" alt="${country.name.official}" width="50" heigth ='50'>
                <b class="countryName">${country.name.official}</b>
              </li>`;
          }).join('');
    
        countryList.innerHTML = markup;
    };
    
    function displayMarkup(data){
        const language = countryLanguages(data.languages);
        const markup = data.map(country => {
            return `<div class="header-block">
            <img src="${country.flags.svg}" alt="flag of ${country.name.common}" class="header-block_img" width="50">
            <h1 class="header-block_text">${country.name.common}</h1>
          </div>
          <p><b>Name official</b>: ${country.name.official}</p>
          <p><b>Name</b>: ${country.name.common}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Languages</b>: ${language}</p>
          <p><b>Population</b>: ${country.population}</p>
          `;
          }).join('');
          console.log(language)
        countryInfo.innerHTML = markup;
    };
    
};
function countryLanguages(languages) {
    const langs = [];
    for (let key in languages) {
      langs.push(languages[key]);
    }
    console.log(langs);
    return langs;
  }

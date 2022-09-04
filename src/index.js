import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');



inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event){
    const inputText = event.target.value;
    if(inputText === ""){
        return
    }
    fetchCountries(inputText);
};


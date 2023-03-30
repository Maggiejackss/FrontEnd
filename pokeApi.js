const testBtn = document.getElementById('submit-game');
const testBtn2 = document.getElementById('start-game');
const img = document.getElementById('fetched-image');
const question = document.getElementById('question');
const hintBox = document.getElementById('hint-box');
const userInput = document.getElementById('user-input');
const instructionsDiv = document.getElementById('instructionsDiv');
const instructionsButton = document.getElementById('instructionsButton');
const instructionsPar = document.getElementById('instructionsPar');

let pokeArray = [];
let pos = 1;



const fetchPoke = async () => {
    const response = await fetch('https://api.pikaserve.xyz/pokemon/random');
    const data = await response.json();
    return data;
}

const gatherPoke = async () => {
    const data = await fetchPoke();
    const pokeArrayGather = [data.name.english, data.type, data.image.hires, data.species];
    pokeArray.push(pokeArrayGather);
    console.log(pokeArray);
}


const scrapeImg = () => {
    const pokeImgUrl = pokeArray[0][2];
    console.log(pokeImgUrl);
    img.src = pokeImgUrl;
}

const structureQuestion = () => {
    const question = `Which Pokemon is this?`;
    //same concept as the img in above function
    //use html structure to add hangman style blank spaces to allow guessing
    question.innerText = question;
}

const hintBoxStructure = () => {
    const pokeType = pokeArray[0][1];
    const pokeSpecies = pokeArray[0][3];
    const typeBox = document.createElement('div');
    const speciesBox = document.createElement('div');
    speciesBox.innerText = `species = ${pokeSpecies}`;
    typeBox.innerText = `type(s) = ${pokeType}`;
    hintBox.append(speciesBox, typeBox);
}

const answerBox = () => {
    const pokeName = pokeArray[0][0];
    for (let i = 1; i <= pokeName.length; i++) {
        const letterInput = document.createElement('input');
        const inputCont = document.createElement('div');
        inputCont.className = 'letterBox';
        letterInput.setAttribute('data-position', `${i}`);
        letterInput.maxLength = 1;
        inputCont.append(letterInput);
        userInput.append(letterInput);
    };
}
const getPokeDataTCG = async () => {
    // When the `pageSize` is 250, there are only 64 pages of data. 
    let page = Math.floor(Math.random() * 65);
    // console.log(page);
    const x = await fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=250`)
    const response = await x.json();
    // console.log(response);
    return response;
}
// getPokeDataTCG();

const getRandomPokemon = async () => {
    const imageLinks = [];

    const x = await getPokeDataTCG();
    // console.log(x);
    // get 1 random pokemon. 
    
    let randomIndex = Math.floor(Math.random() * x.data.length)
    console.log(randomIndex);
    
    // getRandomIndex();

    let pokemon = x.data[randomIndex];
        // console.log(pokemon);
           
    const pokemonImage1 = pokemon.images.small;
    imageLinks.push(pokemonImage1);
    // console.log(pokemonImage1);

    console.log(imageLinks);
    return imageLinks;
}
getRandomPokemon();

const createTest = () => {
    scrapeImg();
    structureQuestion();
    hintBoxStructure();
    answerBox();
}

const focusElement = (isFocus = true) => {
    const el = userInput.querySelector(`[data-position="${pos}"]`);
    if (isFocus) {
        window.setTimeout(() => el.focus(), 0);  //TODO see if we can remove this
      } else {
        window.setTimeout(() => el.blur(), 0);  //TODO see if we can remove this
      }
}

focusElement(0);


function aggPokeName () {
    document.querySelectorAll('input')
    .forEach(input=>pokeInput.push(input.value));
    console.log(pokeInput.length, 'help');
}

function handleKeypress (e) {
    let pokeName = pokeArray[0][0];
    if (pos === pokeName.length) {
        userInput.removeEventListener('keypress', handleKeypress);
        // aggPokeName();
        focusElement(false);
      } else {
        const el = userInput.querySelectorAll('input');
        // aggPokeName();
        el.innerText = '';
        pos += 1;
        focusElement();
      }
}






















const add3RandomPokemon = async () => {
    const addRandomPokemon1 = async () => {
        const x = await getRandomPokemon();
        console.log(x);
    
        const poke1 = document.getElementById("m-c-image");
        poke1.src = x[0];
    }
    addRandomPokemon1();
    
    const addRandomPokemon2 = async () => {
        const x = await getRandomPokemon();
        console.log(x);
    
        const poke1 = document.getElementById("m-v-image1");
        poke1.src = x[0];
    }
    addRandomPokemon2();
    
    const addRandomPokemon3 = async () => {
        const x = await getRandomPokemon();
        console.log(x);
    
        const poke1 = document.getElementById("m-v-image2");
        poke1.src = x[0];
    }
    addRandomPokemon3();
}
add3RandomPokemon();

//create html and js functions for populating info on currently legal cards based on loaded pokemon and the best cards based on popularity/price

testBtn2.addEventListener('click', gatherPoke);
testBtn.addEventListener('click', createTest);
userInput.addEventListener('keypress', handleKeypress);
instructionsButton.addEventListener('click', () => {
    if (instructionsPar.style.display === 'none') {
      instructionsPar.style.display = 'block';
      instructionsButton.textContent = 'Instructions';
    } else {
      instructionsPar.style.display = 'none';
      instructionsButton.textContent = 'Instructions';
    }
  });

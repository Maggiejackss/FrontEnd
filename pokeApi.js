// const testBtn = document.getElementById('submit-game');
// const testBtn2 = document.getElementById('start-game');
const img = document.getElementById('fetched-image');
// const question = document.getElementById('question');
const hintBox = document.getElementById('hint-box');
const userInput = document.getElementById('user-input');
const placeholder = document.getElementById('placeholder');

let pokeArray = [];
let pos = 0;

// pokeArray = [];
// pokeName = '';
// pokeArray[i].join


// const fetchPoke = async () => {
//     const response = await fetch('https://api.pikaserve.xyz/pokemon/random');
//     const data = await response.json();
//     return data;
// }

// const gatherPoke = async () => {
//     const data = await fetchPoke();
//     const pokeArrayGather = [data.name.english, data.type, data.image.hires, data.species];
//     pokeArray.push(pokeArrayGather);
//     console.log(pokeArray);
// }


// const scrapeImg = () => {
//     const pokeImgUrl = pokeArray[2];
//     const img = document.createElement('img');
//     img.src = pokeImgUrl;
//     // edit body later to say the container that holds the img
//     body.append(img);
// }

// const structureQuestion = () => {
//     const pokeName = pokeArray[0];
//     const question = `Which Pokemon is this?`;
//     //same concept as the img in above function
//     //use html structure to add hangman style blank spaces to allow guessing
//     body.append(question);
// }

// const hintBox = () => {
//     const pokeType = pokeArray[1];
//     const pokeSpecies = pokeArray[3];
//     const box = document.createElement('div');
//     box.append(pokeType, pokeSpecies);
//     body.append(box);
// }

// const createTest = () => {
//     scrapeImg();
//     structureQuestion();
//     hintBox();
// }

// const fake = () => {
//     box1.className = 'hidden';
//     restOfDom.className = 'xyz';
// }


// //create html and js functions for populating info on currently legal cards based on loaded pokemon and the best cards based on popularity/price

// testBtn2.addEventListener('click', fake);
// testBtn.addEventListener('click', createTest);












































































































































































































































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
    for (let i = 0; i < pokeName.length; i++) {
        const letterInput = document.createElement('input');
        const inputCont = document.createElement('div');
        placeholder.removeAttribute('data-position', '0');
        inputCont.className = 'letterBox';
        letterInput.setAttribute('data-position', `${i}`);
        letterInput.maxLength = 1;
        inputCont.append(letterInput);
        userInput.append(letterInput);
    };
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
    return imageLinks

const createTest = () => {
    scrapeImg();
    structureQuestion();
    hintBoxStructure();
    answerBox();
}

const focusElement = () => {
    const el = userInput.querySelector(`[data-position="${pos}"]`);
    console.log(el);
    window.setTimeout(() => el.focus(), 0);
}

// focusElement(0);

function handleKeypress (e) {
    pos += 1;
    focusElement();
}
getRandomPokemon();



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

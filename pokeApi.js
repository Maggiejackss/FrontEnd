const testBtn = document.getElementById('test');
const testBtn2 = document.getElementById('button2');
const body = document.getElementById('body');

pokeArray = [];
pokeName = '';
pokeArray[i].join


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
    const pokeImgUrl = pokeArray[2];
    const img = document.createElement('img');
    img.src = pokeImgUrl;
    // edit body later to say the container that holds the img
    body.append(img);
}

const structureQuestion = () => {
    const pokeName = pokeArray[0];
    const question = `Which Pokemon is this?`;
    //same concept as the img in above function
    //use html structure to add hangman style blank spaces to allow guessing
    body.append(question);
}

const hintBox = () => {
    const pokeType = pokeArray[1];
    const pokeSpecies = pokeArray[3];
    const box = document.createElement('div');
    box.append(pokeType, pokeSpecies);
    body.append(box);
}

const createTest = () => {
    scrapeImg();
    structureQuestion();
    hintBox();
}

const fake = () => {
    box1.className = 'hidden';
    restOfDom.className = 'xyz';
}


//create html and js functions for populating info on currently legal cards based on loaded pokemon and the best cards based on popularity/price

testBtn2.addEventListener('click', fake);
testBtn.addEventListener('click', createTest);
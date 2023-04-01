const testBtn = document.getElementById('start-game');
const testBtn2 = document.getElementById('transition-game');
const testBtn3 = document.getElementById('test');
const img = document.getElementById('fetched-image');
const question = document.getElementById('question');
const hintBox = document.getElementById('hint-box');
const userInput = document.getElementById('user-input');
const instructionsDiv = document.getElementById('instructionsDiv');
const instructionsButton = document.getElementById('instructionsButton');
const instructionsPar = document.getElementById('instructionsPar');
const gameArea = document.getElementById('mainCont');
const explanation = document.getElementById('explanation');


const price1 = document.getElementById('m-c-price');
const link1 = document.getElementById('m-c-link');


const price2 = document.getElementById('m-v-price');
const link2 = document.getElementById('m-v-link');

const price3 = document.getElementById('m-v-price2');
const link3 = document.getElementById('m-v-link2');




let pokeArray = [];
let pos = 1;
let userResponse = '';

// let isDisplayResultCards = false;







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
    add3RandomPokemon();
    clearExplanation();
}

const clearExplanation = () => {
    testBtn2.className = 'hidden';
    gameArea.className = ''; 
    explanation.className = 'hidden';
}


const scrapeImg = () => {
    const pokeImgUrl = pokeArray[0][2];
    // console.log(pokeImgUrl);
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


const createTest = () => {
    scrapeImg();
    structureQuestion();
    hintBoxStructure();
    answerBox();
    testBtn.className = 'hidden';
}

const focusElement = (isFocus = true) => {
    const el = userInput.querySelector(`[data-position="${pos}"]`);
    if (isFocus) {
        window.setTimeout(() => el.focus(), 0);  //TODO see if we can remove this
      } else {
        window.setTimeout(() => el.blur(), 0);  //TODO see if we can remove this
      }
}

// focusElement(0);


function aggUserInput () {
    let answer = userInput.querySelectorAll('input')
    .forEach(input=>userResponse += input.value);
}


function handleKeypress (e) {
    let pokeName = pokeArray[0][0].toLowerCase().toLowerCase();
    if (pos === pokeName.length) {
        guide();
      } else if (pos != pokeName.length) {
        pos += 1;
        focusElement();
      } 
}

function guide() {
    let pokeName = pokeArray[0][0].toLowerCase();
    aggUserInput();
    if (pokeName === userResponse) {
        userInput.removeEventListener('keypress', handleKeypress);
        focusElement(false);
        console.log('correct');
        add3RandomGamePokeCards();
    } else { 
        console.log(userResponse);
        userResponse = '';
        pos = 1;
        console.log('wrong');
        focusElement();
        userInput.querySelectorAll('input')
        .forEach(input=>input.value = '');
    }
}





// Copy From line 144 to 377.


let index = [];




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

const imageLinks = [];
const random3Indexes = []


const get3RandomPokemon = async () => {
    const x = await getPokeDataTCG();
    // console.log(x);
    // get 1 random pokemon. 
    function getRandomIndeces() {
        let randomIndex1 = Math.floor(Math.random() * x.data.length)
    
        let randomIndex2 = Math.floor(Math.random() * x.data.length)
        
        let randomIndex3 = Math.floor(Math.random() * x.data.length)
        random3Indexes.push(randomIndex1);
        random3Indexes.push(randomIndex2);
        random3Indexes.push(randomIndex3);
        // console.log(random3Indexes);
    };
    
    // getRandomIndex();
    function getPokeData () {

    getRandomIndeces();

    // console.log(random3Indexes);
    let pokemon1 = x.data[random3Indexes[0]];
        // console.log(pokemon1);   
    index.push(pokemon1);
    // console.log(index);    
    const pokemonImage1 = pokemon1.images.small;
    imageLinks.push(pokemonImage1);
    // console.log(pokemonImage1);


    let pokemon2 = x.data[random3Indexes[1]];
    index.push(pokemon2);
    const pokemonImage2 = pokemon2.images.small
    imageLinks.push(pokemonImage2);
    

    let pokemon3 = x.data[random3Indexes[2]];
    index.push(pokemon3)
    const pokemonImage3 = pokemon3.images.small;
    imageLinks.push(pokemonImage3);
    };
    getPokeData();
    
    const data = [imageLinks, index];
    // console.log(data);
    // console.log(imageLinks);
    // console.log(index);
    return data;
}


const randomPoke1 = document.getElementById("m-c-image");
const randomPoke2 = document.getElementById("m-v-image1");
const randomPoke3 = document.getElementById("m-v-image2");

const add3RandomPokemon = async () => {
    const data = await get3RandomPokemon(); 
    // console.log(data);
    randomPoke1.src = data[0][0];
    randomPoke2.src = data[0][1];
    randomPoke3.src = data[0][2];

    setPrices();
};



const setPrices = function () {
    // console.log(index)
    

    price1.innerText = `€${index[0].cardmarket.prices.averageSellPrice}`;
    link1.href = index[0].cardmarket.url
    
    price2.innerText = `€${index[1].cardmarket.prices.averageSellPrice}`;

    link2.href = index[1].cardmarket.url
    
    // console.log(index)
    
    price3.innerText = `€${index[2].cardmarket.prices.averageSellPrice}`;
    link3.href = index[2].cardmarket.url


};




const getGamePokeNameData = async () => {
    // await gatherPoke();
    // console.log(pokeArray);
    let x = pokeArray[0][0];
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/?q=name:${x};`)
    const data = await response.json();
    // console.log(data);
    return data;
};
// getGamePokeNameData();


const gameRandom3Indexes = [];
const gameImageLinks = [];
const gamePrice = [];
const gameUrl = []

const getRandomGamePokeCards = async () => {
    // for loop
    const x = await getGamePokeNameData();
    // console.log(x);
    // get 1 random pokemon. 
    
    function getRandomIndices() {
        const dope = function () {
            while(gameRandom3Indexes.length < 3){
                var r = Math.floor(Math.random() * 3) + 1;
                if(gameRandom3Indexes.indexOf(r) === -1) gameRandom3Indexes.push(r);
            }
            console.log(randomNumbers);
            
            };
    };
    
    function getPokeData () {
        getRandomIndices();

        let pokemon1 = x.data[gameRandom3Indexes[0]];
        // console.log(pokemon1);
        const pokeImgLink1 = pokemon1.images.small
        // console.log(pokeImgLink1);
        gameImageLinks.push(pokeImgLink1);
        
        const pokePrice1 = pokemon1.cardmarket.prices.averageSellPrice
        console.log(pokePrice1);
        gamePrice.push(pokePrice1);
        // console.log(gamePrice);

        const poke$Url1 = pokemon1.cardmarket.url
        gameUrl.push(poke$Url1);
        // console.log(gameUrl + 'game url');



        let pokemon2 = x.data[gameRandom3Indexes[1]];
        // console.log(pokemon2);
        const pokeImgLink2 = pokemon2.images.small;
        gameImageLinks.push(pokeImgLink2);

        const pokePrice2 = pokemon2.cardmarket.prices.averageSellPrice
        gamePrice.push(pokePrice2);

        const poke$Url2 = pokemon2.cardmarket.url
        gameUrl.push(poke$Url2);
        



        let pokemon3 = x.data[gameRandom3Indexes[2]];

        const pokeImgLink3 = pokemon3.images.small;
        gameImageLinks.push(pokeImgLink3);

        const pokePrice3 = pokemon3.cardmarket.prices.averageSellPrice
        gamePrice.push(pokePrice3);

        const poke$Url3 = pokemon3.cardmarket.url
        gameUrl.push(poke$Url3);
        // console.log(gameUrl); 
    };
    getPokeData();

    const data = [gameImageLinks, gamePrice, gameUrl];
    // console.log(data);
    return data;
};






// isDisplayResultCards = true;


const add3RandomGamePokeCards = async () => {

const data = await getRandomGamePokeCards();
console.log(data)
        randomPoke1.src = data[0][0];
        randomPoke2.src = data[0][1];
        randomPoke3.src = data[0][2];
        

        price1.innerText = data[1][0];
        price2.innerText = data[1][1];
        price3.innerText = data[1][2];

        link1.href = data[2][0];
        link2.href = data[2][1];
        link3.href = data[2][2];
} ;

// add3RandomGamePokeCards();








//create html and js functions for populating info on currently legal cards based on loaded pokemon and the best cards based on popularity/price

testBtn2.addEventListener('click', gatherPoke);
testBtn.addEventListener('click', createTest);
//change to keyup because it wasnt reading keydown
userInput.addEventListener('keyup', handleKeypress);
instructionsButton.addEventListener('click', () => {
    if (instructionsPar.style.display === 'none') {
      instructionsPar.style.display = 'block';
      instructionsButton.textContent = 'Instructions';
    } else {
      instructionsPar.style.display = 'none';
      instructionsButton.textContent = 'Instructions';
    }
  });

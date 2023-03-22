const fetchPoke = async () => {
    const response = await fetch('https://api.pikaserve.xyz/pokemon/random');
    const data = await response.json();
    console.log(data);
}
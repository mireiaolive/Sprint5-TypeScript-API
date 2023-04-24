let jokeHolder: HTMLElement | null = document.getElementById("joke");
let scoreBtns: HTMLElement | null = document.getElementById("score-btns");
let showWeather: HTMLElement | null = document.getElementById("show-weather")!;
let temperature: HTMLElement | null = document.getElementById("temperature")!;
let city: HTMLElement | null = document.getElementById("city")!;
let imageWeather: HTMLElement | null =
    document.getElementById("image-weather")!;
let background: HTMLElement | null = document.getElementById("background")!;

let header: object = {
    method: "GET",
    headers: { Accept: "application/json" },
};

let results: string;
let reportJokes: object[] = [];

async function getData() {
    let url: string = "https://icanhazdadjoke.com/";
    let urlChuck: string = "https://api.chucknorris.io/jokes/random";

    let jokes: any = await fetch(url, header);
    let result: any = await jokes.json();
    results = result.joke;
    //verificación de nulidad antes de modificar el contenido del elemento para evitar errores:
    if (jokeHolder) {
        jokeHolder.innerHTML = results;
    }
    //chaining operator ? is used to avoid a runtime when scoreBtns is undefined or null.
    scoreBtns?.classList.remove("notshow");
    generateBase();
}

function getReport(score: number) {
    reportJokes.push({
        joke: results,
        score: score,
        date: new Date().toISOString(),
    });
}

//retrieve the user's current location (latitude and longitude)
//using the browser's built-in geolocation service.
function getLocation() {
    navigator.geolocation.getCurrentPosition(getWeather);
}

async function getWeather(position: any) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let urlWeather: string = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin`;

    let result: any = await fetch(urlWeather, header);
    let data: any = await result.json();
    console.log(data.current_weather);
    //set the src attribute of an HTML img element.
    imageWeather!.setAttribute(
        "src",
        `img/${data.current_weather.weathercode}.svg`
    );
    temperature!.innerHTML = data.current_weather.temperature;
    city!.innerHTML = data.current_weather.city;
}

getLocation();

function generateBase() {
    const randomNum = Math.floor(Math.random() * 11) + 1;
    if (background) {
        background.style.backgroundImage = `url('./img/waves-${randomNum}.svg')`;
    }
}

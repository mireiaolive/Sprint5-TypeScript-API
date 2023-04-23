let jokeHolder: HTMLElement | null = document.getElementById("joke");
let scoreBtns: HTMLElement | null = document.getElementById("score-btns");
let showWeather: HTMLElement | null = document.getElementById("show-weather")!;
let temperature: HTMLElement | null = document.getElementById("temperature")!;
let imageWeather: HTMLElement | null =
    document.getElementById("image-weather")!;

const header: object = {
    method: "GET",
    headers: { Accept: "application/json" },
};

let results: string;
let reportJokes: object[] = [];

async function getData() {
    const url: string = "https://icanhazdadjoke.com/";

    const jokes: any = await fetch(url, header);
    const result: any = await jokes.json();
    results = result.joke;
    jokeHolder.innerHTML = results;
    //chaining operator ? is used to avoid a runtime when scoreBtns is undefined or null.
    scoreBtns?.classList.remove("notshow");
}

function getReport(score: number) {
    reportJokes.push({
        joke: results,
        score: score,
        date: new Date().toISOString(),
    });

    console.log(reportJokes);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(getWeather);
}

async function getWeather(position: any) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    const urlWeather: string = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin`;

    const result: any = await fetch(urlWeather, header);
    const data: any = await result.json();
    console.log(data.current_weather);
    imageWeather!.setAttribute(
        "src",
        `img/${data.current_weather.weathercode}.png`
    );
    temperature!.innerHTML = data.current_weather.temperature;
}

getLocation();

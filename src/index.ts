let jokeHolder: HTMLElement | null = document.getElementById("joke");
let scoreBtns: HTMLElement | null = document.getElementById("score-btns");

let results: string;
let reportJokes: object[] = [];

async function getData() {
    const url: string = "https://icanhazdadjoke.com/";
    const header: object = {
        method: "GET",
        headers: { Accept: "application/json" },
    };
    const jokes: any = await fetch(url, header);
    const result: any = await jokes.json();
    results = result.joke;
    jokeHolder.innerHTML = results;
}

function getReport(score: number) {
    reportJokes.push({
        joke: results,
        score: score,
        date: new Date().toISOString(),
    });

    console.log(reportJokes);
}

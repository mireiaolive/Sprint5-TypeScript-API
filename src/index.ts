let jokeHolder: HTMLElement | null = document.getElementById("joke");
let jokeButton: HTMLElement | null = document.querySelector("getJoke");

let reportJokes: object[] = [];

async function getData() {
    const url: string = "https://icanhazdadjoke.com/";
    const header: object = {
        method: "GET",
        headers: { Accept: "application/json" },
    };
    const jokes: any = await fetch(url, header);
    const result: any = await jokes.json();
    jokeHolder.innerHTML = result.joke;
    console.log(result);
}

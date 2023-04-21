const jokeButton: HTMLButtonElement = document.querySelector("getJoke")!;
jokeButton.addEventListener("click", nextJoke);

async function getData() {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });
    const data = await response.json();
    return data;
}

function nextJoke(): void {
    getData()
        .then((data: { joke: string }) => {
            const joke: string = data.joke;
            const jokeHolder: HTMLElement = document.getElementById("joke")!;
            jokeHolder.textContent = joke;
            // Guardar el chiste actual
            let currentJoke: string;
            currentJoke = joke;
        })
        .catch((error) => {
            console.error(error);
        });
}

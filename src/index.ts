const jokeButton = document.querySelector(".getJoke");
const jokeHolder = document.querySelector(".joke");

const getData = async (url: string): Promise<T> => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
};

getData();

jokeButton.addEventListener("click", handleClick);

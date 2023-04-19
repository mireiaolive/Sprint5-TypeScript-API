const jokeButton = document.querySelector(".getJoke");
const jokeHolder = document.querySelector(".joke");

const getData = async <T>(url: string): Promise<T> => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
};

getData("https://icanhazdadjoke.com/")
    .then((data: any) => {
        // manejar los datos aqui
    })
    .catch((error) => {
        console.error(error);
    });

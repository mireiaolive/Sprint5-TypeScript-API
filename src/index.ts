const jokeButton = document.querySelector(".getJoke");
const jokeHolder = document.querySelector(".joke");

//the API is telling us we need to pass an Accept Header
//a header is some additional info that comes along w/ a request
//you can see the ones were passed along w/ the response
//the way you do that you pass a second object to fetch

async function getData() {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });
    console.log(response);
    //response.json() make the info readable
    const data = await response.json();
    console.log(data);
    return data;
}

getData()
    .then((data: any) => {
        // manejar los datos aqui
    })
    .catch((error) => {
        console.error(error);
    });

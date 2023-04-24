"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var jokeHolder = document.getElementById("joke");
var scoreBtns = document.getElementById("score-btns");
var showWeather = document.getElementById("show-weather");
var temperature = document.getElementById("temperature");
var city = document.getElementById("city");
var imageWeather = document.getElementById("image-weather");
var background = document.getElementById("background");
var header = {
    method: "GET",
    headers: { Accept: "application/json" },
};
var results;
var reportJokes = [];
function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var url, urlChuck, jokes, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://icanhazdadjoke.com/";
                    urlChuck = "https://api.chucknorris.io/jokes/random";
                    return [4 /*yield*/, fetch(url, header)];
                case 1:
                    jokes = _a.sent();
                    return [4 /*yield*/, jokes.json()];
                case 2:
                    result = _a.sent();
                    results = result.joke;
                    //verificación de nulidad antes de modificar el contenido del elemento para evitar errores:
                    if (jokeHolder) {
                        jokeHolder.innerHTML = results;
                    }
                    //chaining operator ? is used to avoid a runtime when scoreBtns is undefined or null.
                    scoreBtns === null || scoreBtns === void 0 ? void 0 : scoreBtns.classList.remove("notshow");
                    generateBase();
                    return [2 /*return*/];
            }
        });
    });
}
function getReport(score) {
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
function getWeather(position) {
    return __awaiter(this, void 0, void 0, function () {
        var lat, lon, urlWeather, result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    urlWeather = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin";
                    return [4 /*yield*/, fetch(urlWeather, header)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    data = _a.sent();
                    console.log(data.current_weather);
                    //set the src attribute of an HTML img element.
                    imageWeather.setAttribute("src", "img/" + data.current_weather.weathercode + ".svg");
                    temperature.innerHTML = data.current_weather.temperature;
                    city.innerHTML = data.current_weather.city;
                    return [2 /*return*/];
            }
        });
    });
}
getLocation();
function generateBase() {
    var randomNum = Math.floor(Math.random() * 11) + 1;
    if (background) {
        background.style.backgroundImage = "url('./img/waves-" + randomNum + ".svg')";
    }
}

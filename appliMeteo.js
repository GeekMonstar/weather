let villeRequest = 'Nantes';
const form = document.querySelector('form');
const ville = document.querySelector('#ville');
const pays = document.querySelector('#pays');
const temp = document.querySelector('#temp');
const tempMin = document.querySelector('#min-temp');
const tempMax = document.querySelector('#max-temp');
const latitude = document.querySelector('#lat');
const longitude = document.querySelector('#lon');
const hum = document.querySelector('#hum');
const pre = document.querySelector('#pre');
const wind = document.querySelector('#wind');
const windDegree = document.querySelector('#wind-temp');
const uv = document.querySelector('#uv')
const dayPeriodImg = document.querySelector('#day-period');
let appid = '142241b72cb61b0e44cfbe4c5d335d6f';


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        Start(lat, lon)
        console.log(lon, lat)
    }, (() => MeteoQuery('Yaounde')))
}
else {
    MeteoQuery('Yaounde');
}
async function Start(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
    let request = await fetch(url, { method: 'GET' })
        .then((response) => {
            if (response.ok) {
                response.json().then((myJson) => {
                    let datas = myJson;
                    console.log(myJson);
                    datasFill(datas);
                })
            }
        })
        .catch((e) => {
            console.log(e.message);
        })
}
async function MeteoQuery(ville) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${appid}&units=metric`;
    let request = await fetch(url, { method: 'GET' })
        .then((response) => {
            if (response.ok) {
                response.json().then((myJson) => {
                    let datas = myJson;
                    console.log(datas);
                    datasFill(datas);
                })
            }
        })
        .catch((e) => {
            console.log(e.message);
        })
}

const datasFill = (datas) => {
    ville.textContent = datas.name;
    pays.textContent = datas.sys.country;
    latitude.textContent = datas.coord.lat;
    longitude.textContent = datas.coord.lon;
    temp.textContent = datas.main.temp;
    tempMin.textContent = datas.main.temp_min;
    tempMax.textContent = datas.main.temp_max;
    hum.textContent = datas.main.humidity;
    pre.textContent = datas.main.pressure;
    wind.textContent = datas.wind.speed;
    windDegree.textContent = datas.wind.deg;
    let date = new Date();
    console.log(date.getDate)
    //uv.textContent = datas;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
});

const handleSubmit = e => {
    // e.preventDefault();
    // e.stopPropagation();
    villeRequest = document.querySelector('.ville-input').value;
    document.querySelector('.ville-input').value = "";
    MeteoQuery(villeRequest);
    console.log(villeRequest);

}

document.querySelector(".form-city").addEventListener("submit", function(e){
    e.preventDefault();

    let city = document.querySelector(".city").value;

    fetchCity(city);
});

async function fetchCity(cityName){

    const key = "ce5db2f0f4a2dc4ed7734ed23cc9f179";
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&APPID='+key;
    const URLForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&APPID='+key;
    const myHeaders = new Headers();

    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' 
    };

    try {
        let dados = Promise.all([

            fetch(URL, myInit)
            .then((resp) => resp.json())
            .then(function (data) {
                manipularDados(data);
            }),

            fetch(URLForecast, myInit)
            .then((resp) => resp.json())
            .then(function (data) {
                //manipularDados(data);
                forecast(data);
            })
        ])
    
}catch(error) {
        
   
        console.log(error);
        alert("you've met with a terrible Error, haven't you?");
        
    }
}

function manipularDados(data){

    console.log(data);

    document.querySelector(".temperature").textContent = ((data.main.temp - 273).toFixed(0));
    console.log((data.main.temp - 273).toFixed(1));

    weatherId(data.weather[0].id);

}


function weatherId (id) {

    let weather = document.querySelectorAll(".weather");
    console.log(weather);

    let weatherConditions = {
    
        200: 'Trovoada com chuva leve',
        201: 'Trovoada com chuva',
        202: 'Trovoada com chuva pesada',
        210: 'Trovoada leve',
        211: 'Trovoada',
        212: 'Trovoada pesada',
        221: 'Tempestade Irregular',
        230: 'Tempestade Leve',
        231: 'Chuvisco com trovoadas',
        232: 'Tempestade pesada',

        300: 'Chuvisco leve',
        301: 'Chuvisco',
        302: 'Chuvisco mais intenso',
        310: 'Chuvisco mais leve',
        311: 'Pancadas de chuva',
        312: 'Pancadas de chuva intensa',
        313: 'Pancadas de chuva intensa',
        314: 'Pancadas de chuva intensa',
        321: 'Pancadas de chuva leve',

        500: 'Chuva leve',
        501: 'Chuva Moderada',
        502: 'Chuva Intensa',
        503: 'Chuva muito intensa',
        504: 'Chuva pesada',
        511: 'Chuva com risco de neve',
        520: 'Chuva de leve intensidade',
        521: 'Chuva rápida',
        522: 'Chuva rápida e intensa',
        531: 'Chuva rápida',

        600: 'Pouca neve',
        601: 'Neve',
        602: 'Neve pesada',
        611: 'Granizo',
        612: 'Granizo',
        615: 'Chuva rápida e neve',
        616: 'Chuva e neve',
        620: 'Risco de neve',
        621: 'Neve rápida',
        622: 'Neve Pesada',

        701: 'Névoa',
        711: 'Fumaça',
        721: 'Neblina',
        731: 'Redemoinho de poeira',
        741: 'Névoa',
        751: 'Areia',
        761: 'Poeira',
        762: 'Cinza Vulcânica',
        771: 'Rajadas de vento',
        781: 'Tornado',

        800: 'Céu limpo',
        801: 'Poucas nuvens',
        802: 'Nuvens dispersas',
        803: 'Nuvens quebradas',
        804: 'Nublado',

        900: 'Tornado',
        901: 'Chuva Tropical',
        902: 'Furacão',
        903: 'Frio',
        904: 'Calor',
        905: 'Ventania',
        906: 'Granizo',
        951: 'Calmo',
        952: 'Brisa leve',
        953: 'Brisa suave',
        954: 'Brisa moderada',
        955: 'Brisa fresca',
        956: 'Ventania forte',
        957: 'Ventania muito forte',
        958: 'Vendaval',
        959: 'Vendaval forte',
        960: 'Tempestade',
        961: 'Tempestade violenta',
        962: 'Furacão'

        }
       
        weather.textContent = weatherConditions[id];
        return weatherConditions[id];
       }
       
function forecast(arrayForecast){

    console.log(arrayForecast);

    const weekDays = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
    const firstForecastSpan = document.querySelector(".first-forecast-day");
    const lastForecastSpan = document.querySelector(".last-forecast-day");

    const firstTempForecast = document.querySelector(".first-temp-forecast");
    const lastTempForecast = document.querySelector(".last-temp-forecast");
    const firstWeatherForecast = document.querySelector(".first-weather-forecast");
    const lastWeatherForecast = document.querySelector(".last-weather-forecast");
    let currentDay = new Date().getDay();


    switch(currentDay){

        case 5:
            firstForecastSpan.innerHTML = weekDays[currentDay+1];
            lastForecastSpan.innerHTML = weekDays[0];
            break;

        case 6:
            firstForecastSpan.innerHTML = weekDays[0];
            lastForecastSpan.innerHTML = weekDays[1];
            break;

        default:
            firstForecastSpan.innerHTML = weekDays[currentDay+1];
            lastForecastSpan.innerHTML = weekDays[currentDay+2];
    }

    firstTempForecast.innerHTML = ((arrayForecast.list[4].main.temp - 273).toFixed(0));
    firstWeatherForecast.innerHTML  = weatherId(arrayForecast.list[4].weather["0"].id);
    
    lastTempForecast.innerHTML = ((arrayForecast.list[12].main.temp - 273).toFixed(0));
    lastWeatherForecast.innerHTML  = weatherId(arrayForecast.list[12].weather["0"].id);

}
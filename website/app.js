/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// personal API key for the OpenWeatherMap API

let Url = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let Key = '&appid=9dc57ceb7533c7ecf4b3dbb71bbc5c96&units=metric';

// Event listener to genereate element
document.getElementById('generate-button').addEventListener('click', actionPer);


//function called by event lkistner

function actionPer(e) {
    
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feeling').value;
    
    getApiData (Url, zip, Key)

        .then(function(data) {
            // add data to POST request 
            console.log(data) 
            postRoute('/add', {date:d , temp:data.list[0].main.temp, content:feeling})
            UiUpdate();
        })
            
                
};



const getApiData = async (baseURL, zip, key) => {

    const res = await fetch(baseURL+zip+key)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}


const postRoute = async (url = '', data= {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        Credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

const UiUpdate = async () => {
    const request = await fetch('/all');

    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperatuer: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;
    } catch(error){
        console.log("error", error);
    }


}
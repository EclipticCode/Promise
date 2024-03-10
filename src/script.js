async function loadCountries(){
    let response = await fetch("https://restcountries.com/v3.1/all")
    let countries = await response.json()
    let countriesContainer = document.getElementById('countries')
    countries.forEach(country =>{
        const card = document.createElement('div')
        card.classList.add('col-lg-4' , 'col-md-6' , 'col-sm-12')
        
        const cardInner = document.createElement('div')
        cardInner.classList.add('card','mb-3')
       
        const cardHeader= document.createElement('div')
        cardHeader.classList.add('card-header')
        
        let name = country.name.common
        let capital = country.capital
        let region = country.region
        let code = country.cca2 
        let flags = country.flags.svg

        const cardBody= document.createElement('div')
        cardBody.classList.add('card-body')
       
      
        
        const img = document.createElement('img')
        img.src = flags
        cardHeader.textContent = name

        const p = document.createElement('p')
        p.innerHTML = `Capital: ${capital} <br>
        Region: ${region} <br>
        Country code: ${code}`
   
       const btn = document.createElement('button')
       btn.textContent = "Click for Weather"


       const weatherInfo = document.createElement('p')
       weatherInfo.classList.add('d-none','weather-info')

       btn.addEventListener('click', async (e)=>{
        toggleWeather(country,e,weatherInfo)
       })

        cardBody.append(img,p,btn,weatherInfo)
      
        cardInner.append(cardHeader,cardBody);
        card.append(cardInner);
        
        countriesContainer.append(card)
        

    })
}

loadCountries()

async function toggleWeather(country,e,weatherInfo ){

     let lat = country.latlng[0]
     let lon = country.latlng[1]
    
     
     weatherInfo.classList.remove('d-none')
     e.target.classList.add('d-none')

     let weather = await getWeather(lat,lon)

     weatherInfo.textContent=`Weather: ${weather.weather[0].description}`

    }

async function getWeather(lat,lon){

     let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'15a113140e263d540be83916bf767349'}`)

     let weather = await response.json()
     
     return weather;
  }
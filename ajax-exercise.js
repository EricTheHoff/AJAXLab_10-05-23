import axios from 'axios';

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  const url = 'https://dog.ceo/api/breeds/image/random'
  const res = await axios.get(url)
  const result = res.data.message
  document.querySelector("#dog-image").innerHTML = `<img src=${result} alt="Random dog image"/>`
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value
  const url = `/weather.txt?zipcode=${zipcode}`
  const res = await axios.get(url)
  document.querySelector("#weather-info").innerText = res.data
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault()
  const cookieType = document.querySelector("#cookie-type-field").value
  const qty = document.querySelector("#qty-field").value

  const res = await axios.post("/order-cookies.json", {
    cookieType: cookieType,
    qty: qty
  })

  document.querySelector("#order-status").innerText = res.data.message
  // console.log(res.data)
  const orderStatus = document.querySelector("#order-status")
  if(res.data.resultCode === "ERROR") {
    orderStatus.classList = "order-error"
  }
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value

  const songData = {"term": searchTerm}
  const queryString = new URLSearchParams(songData).toString()
  const url = `https://itunes.apple.com/search?${queryString}&limit=10`

  const res = await axios.get(url)

  console.log(res.data)

  let artistString = ""
  for(const result of res.data.results) {
    artistString += `<li>Artist: ${result.artistName} | Song: ${result.trackName}</li>`
  }
  document.querySelector("#itunes-results").innerHTML = artistString
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);

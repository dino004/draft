const search = document.querySelector(".js-search");
const list = document.querySelector(".js-list");

search.addEventListener("submit", onSearch);

function onSearch(evt) {
  evt.preventDefault();
  const { query, days } = evt.currentTarget.elements;

  getWeather(query.value, days.value)
    .then((data) => (list.innerHTML = creatMarkup(data)))
    .catch((err) => console.log(err));
}

function getWeather(city, days) {
  const BASE_URL = "https://api.weatherbit.io/v2.0";
  const API_KEY = "e66ac0e12fa24438b89821262383a62f";
  const params = new URLSearchParams({
    city: city,
    key: API_KEY,
    lang: "uk",
    units: "M",
    days: days,
  });

  return fetch(`${BASE_URL}/forecast/daily.json?${params}`, {
    mode: "no-cors",
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function creatMarkup(arr) {
  return arr
    .map(
      ({
        data: {
          datetime,
          temp,
          weather: { description, icon },
        },
      }) => `<li>
    <img src="${icon}" alt="${description}" />
    <p>${description}</p>
    <h2>${datetime}</h2>
    <h3>${temp}</h3>
  </li>`
    )
    .join("");
}

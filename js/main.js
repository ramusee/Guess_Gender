import { countries } from './country.js'
import { UI_ELEMENTS } from './view.js'

UI_ELEMENTS.BTN.addEventListener('click', checkName)
function checkName() {
  if (UI_ELEMENTS.NAME.value.trim() !== '') {
    const firstName = UI_ELEMENTS.NAME.value.trim()
    const currentName = firstName[0].toUpperCase() + firstName.slice(1)
    const serverNameUrl = 'https://api.genderize.io'
    const serverCountryUrl = 'https://api.nationalize.io'
    const urlName = `${serverNameUrl}?name=${firstName}`
    const urlCountry = `${serverCountryUrl}?name=${firstName}`
    fetch(urlName)
      .then((response) => response.json())
      .then((data) => {
        !data.gender
          ? (UI_ELEMENTS.GENDER.textContent = `${currentName} not found`)
          : (UI_ELEMENTS.GENDER.textContent = `${currentName} is ${data.gender}`)
      })
      .then(
        fetch(urlCountry)
          .then((response) => response.json())
          .then((data) => {
            const country = countries[data.country[0].country_id]
            UI_ELEMENTS.COUNTRY.textContent = `Country: ${country}`
            console.log(country)
          })

          .catch(() => (UI_ELEMENTS.COUNTRY.textContent = 'Сountry not found'))
      )
  }
  UI_ELEMENTS.FORM.reset()
}

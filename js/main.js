import { countries } from './country.js'
import { UI_ELEMENTS } from './view.js'

UI_ELEMENTS.BTN.addEventListener('click', checkName)
function checkName() {
  if (UI_ELEMENTS.NAME.value.trim() !== '') {
    const firstName = UI_ELEMENTS.NAME.value.trim()
    const serverNameUrl = 'https://api.genderize.io'
    const serverCountryUrl = 'https://api.nationalize.io'
    const urlName = `${serverNameUrl}?name=${firstName}`
    const urlCountry = `${serverCountryUrl}?name=${firstName}`
    fetch(urlName)
      .then((response) => response.json())
      .then((data) => {
        data.gender === null
          ? (UI_ELEMENTS.RESULT.textContent = `${firstName} is not found`)
          : (UI_ELEMENTS.RESULT.textContent = `${firstName} is ${data.gender}`)
      })
      .catch(() => (UI_ELEMENTS.RESULT.textContent = 'Server error'))
    fetch(urlCountry)
      .then((response) => response.json())
      .then((data) => {
        const country = countries[data.country[0].country_id]
        UI_ELEMENTS.RESULT.textContent = `${UI_ELEMENTS.RESULT.textContent} from ${country}`
      })
      .catch(
        () =>
          (UI_ELEMENTS.RESULT.textContent = `${UI_ELEMENTS.RESULT.textContent}. Сountry not found.`)
      )
  }
  UI_ELEMENTS.FORM.reset()
}

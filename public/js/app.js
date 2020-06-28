console.log("JAVASCRIPT FILE ACCESSED")


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    console.log('search')
    msg1.textContent = 'Loading....'
    msg2.textContent = ''

    fetch('/weather?address='+ search.value).then((response) => {
    response.json().then(({error,location,forecast}) => {
        if(error) {
            console.log(error)
            msg1.textContent = error
        } else {
        console.log(location)
        console.log(forecast)
        msg1.textContent = location
        msg2.textContent = forecast
        }
    })
})
})

function updateCount() {
    const now = Date.now()
    const endDate = new Date("2024, 01, 01")
    const timeLeftMS = endDate - now
    
    const daysLeft = timeLeftMS / (1000*60*60*24)
    const hoursLeft = (daysLeft-Math.floor(daysLeft))*24
    const minutesLeft = (hoursLeft-Math.floor(hoursLeft))*60
    const secondsLeft = Math.floor((minutesLeft-Math.floor(minutesLeft))*60)
    
    const days = document.getElementById("days")
    const hours = document.getElementById("hours")
    const minutes = document.getElementById("minutes")
    const seconds = document.getElementById("seconds")

    days.innerText = Math.floor(daysLeft)
    hours.innerText = Math.floor(hoursLeft)
    minutes.innerText = Math.floor(minutesLeft)
    seconds.innerText = secondsLeft
    
    const countDiv = document.querySelectorAll(".countDiv")
    countDiv.forEach(count => {
        if (count.textContent.length < 2) {
            count.innerText = "0" + count.textContent
        }
    })
}
setInterval(updateCount, 1000)

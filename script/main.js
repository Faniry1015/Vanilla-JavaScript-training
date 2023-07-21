function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(duration)
        }, duration)
    })
}

function waitAndFail(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(duration)
        }, duration)
    })
}

async function waitAsync(duration, msg) {
    try {
        await wait(1000)
        console.log("1:", msg, "1s")
        await waitAndFail(duration)
        console.log(msg, duration)
        await wait(1000)
        console.log("2:", msg, "1s")
    } catch(e) {
        console.log("Erreur:", e)
    }

}

waitAsync(2000, "message")
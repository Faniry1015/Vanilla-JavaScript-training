const observer1 = new IntersectionObserver((entries) => {
    for (entry of entries) {
        console.log(
            entry.target,    //.target : l'élément observer actuel
            entry.isIntersecting //Visible à l'écran ou non (booléen)
        )
    }
})

const btn1  = document.querySelector(".btn1")
const btn2  = document.querySelector(".btn2")
observer1.observe(btn1)
observer1.observe(btn2)

//Pour chaque élément observé, lorsqu'elle apparait à l'écran, réalisé l'animation suivante

const observer = new IntersectionObserver((entries) => { // ce sera un tableau de tous les élément qu'on observe
    for (entry of entries) {
        if (entry.isIntersecting) {             //isIntersecting: apparait à l'écran
            entry.target.animate([              
                { transform: "translateX(-50px)", opacity: 0 },
                { transform: "translateX(0)", opacity: 1 }
            ], {
                duration: 500
            })
            observer.unobserve(entry.target)   //L'animation ne se fait qu'une fois lors du défilement
        }
    }
}, {
    threshold: .2  //20% de l'élément est visible pour considérer qu'il y ai une intersection
})
//rootMargin s'utilise comme threshold pour augmenter les marges à partir desquels l'élément est considéré comme visible (donc visible plus tôt)

observer.observe(btn1)
observer.observe(btn2)
// observer.disconnect() //Arrête tout observation (déconnecte tous les observations)

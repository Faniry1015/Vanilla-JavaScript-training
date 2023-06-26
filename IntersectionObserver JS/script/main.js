//Pour chaque élément observé, lorsqu'elle apparait à l'écran, réalisé l'animation suivante

const observer = new IntersectionObserver((entries) => {
    for (entry of entries) {
        if (entry.isIntersecting) {             //isIntersecting: apparait à l'écran
            entry.target.animate([              //target : l'élément actuel
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
//root margin s'utilise comme threshold pour augmenter les marges à partir desquels l'élément est considéré comme visible

observer.observe(document.querySelector(".btn1"))
observer.observe(document.querySelector(".btn2"))
observer.disconnect() //Arrête tout observation (déconnecte tous les observations)

const observer = new IntersectionObserver((sections) => {

for (let section of sections) {
    if (section.isIntersecting) {
        console.log(section.isIntersecting)
        let x = document.getElementById(`liSection${sections.indexOf(section) + 1}`)
        console.log(sections.indexOf(section) + 1)
    }
}
})

const section1 = document.getElementById("section1")
const section2 = document.getElementById("section2")
const section3 = document.getElementById("section3")
const section4 = document.getElementById("section4")

observer.observe(section1)
observer.observe(section2)
observer.observe(section3)
observer.observe(section4)
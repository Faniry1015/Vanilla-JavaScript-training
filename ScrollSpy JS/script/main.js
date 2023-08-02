/**
 * 
 * @param {string} section 
 * @param {string} navElement 
 */
function observer(section, navElement) {
    const currentSection = document.getElementById(section)
    const correspondantNav = document.getElementById(navElement)

    const obs = new IntersectionObserver((sections) => {
        for (let sect of sections) {
            if (sect.isIntersecting) {
                correspondantNav.classList.add("observed")
            } else {
                correspondantNav.classList.remove("observed")
            }
        }
    }, {
        threshold: 0.7
    })
    obs.observe(currentSection)
}

observer("section1", "liSection1")
observer("section2", "liSection2")
observer("section3", "liSection3")
observer("section4", "liSection4")
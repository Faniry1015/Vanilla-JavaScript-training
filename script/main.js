class Carousel {

    /**
     * This callback type is called "requestCallback" and is displayed as a global symbol.
     *
     * @callback moveCallback
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} [options.slidesToScroll=1] Nombre d'éléments à faire défiler
     * @param {Object} [options.slidesToScroll=1] Nombre d'éléments visible dans un slide
     * @param {boolean} [options.loop = false]  Doit-t-on bouclé en fin de carousel
     * @param {boolean} [options.pagination = false]
     * @param {boolean} [options.navigation = true]
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {      //options par défaut si on en entre pas
            slidesToScroll: 1,                  //Un seul élément scroller
            slidesVisible: 1,                    //Un seul élément visible
            loop: false,
            pagination: false,
            navigation: true,
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallbacks = []

        //Modification du DOM
        this.root = this.createDivWithClass("carousel")
        this.container = this.createDivWithClass("carousel__container")
        this.root.setAttribute("tabindex", "0")
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map(child => {
            let item = this.createDivWithClass("carousel__item")
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        });
        this.setStyle()
        if (this.options.navigation === true) {
            this.createNavigation()
        }
        if (this.options.pagination === true) {
            this.createPagination()
        }
        this.createNavigation()

        //Evenements
        this.moveCallbacks.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener("resize",this.onWindowResize.bind(this))
        this.root.addEventListener("keyup", e => {
            if (e.key === "ArrowRight" || e.key === "Right") {
                this.next()
            } else if (e.key === "ArrowLeft" || e.key === "Left") {
                this.prev()
            }
        })
    }


    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%");
    }

    /**
     * 
     * Crée les flèches e navigation
     */
    createNavigation() {
        let nextButton = this.createDivWithClass("carousel__next")
        let prevButton = this.createDivWithClass("carousel__prev")
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener("click", this.next.bind(this))
        prevButton.addEventListener("click", this.prev.bind(this))
        if (this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add("carousel__prev--hidden")
            } else {
                prevButton.classList.remove("carousel__prev--hidden")
            }
            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add("carousel__next--hidden")
            } else {
                nextButton.classList.remove("carousel__next--hidden")
            }
        })
    }

    /**
     * 
     * Crée la pagination dans le DOM
     */
    createPagination() {
        let pagination = this.createDivWithClass("carousel__pagination")
        let buttons = []
        this.root.appendChild(pagination)
        for (let i =  0 ; i< this.items.length ; i = i + this.options.slidesToScroll) {
            let button = this.createDivWithClass("carousel__pagination__button")
            button.addEventListener("click", () => this.gotoItem(i))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
           let activeButton = buttons[Math.floor(index / this.options.slidesToScroll)] 
           if (activeButton) {
            buttons.forEach(button => button.classList.remove("carousel__pagination__button--active"))
            activeButton.classList.add("carousel__pagination__button--active")
           }
        })
    }

    next() {
        this.gotoItem(this.currentItem + this.slidesToScroll)
    }

    prev() {
        this.gotoItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index 
     */
    gotoItem(index) {
        if (index < 0) {
            if (this.options.loop) {
                index = this.items.length - this.slidesVisible
            } else {
                return
            }
        } else if (index >= this.items.length || this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem) {
            if (this.options.loop) {
                index = 0
            } else {
                return
            }
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)"
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    } 


    /**
     * 
     * @param {Carousel- moveCallback} cb 
     */
    onMove(cb) {
        this.moveCallbacks.push(cb)
    }

    onWindowResize() {
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
        }
    }

    /**
    *@param {string} className
    *@returns {HTMLElement}
    */
    createDivWithClass(className) {
        let div = document.createElement("div")
        div.setAttribute("class", className)
        return div
    }

    /**
    * @returns {Number}
     */
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

        /**
    * @returns {Number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}

// document.addEventListener("DOMContentLoaded", function () {
// })

let onReady = function () {

    new Carousel(document.querySelector("#carousel1"), {
        slidesToScroll: 1,         //Nombre de scroll par click
        slidesVisible: 3,           //Nombre d'élément visible à l'écran
        loop: true,              //Si true permet de faire une boucle avec la carousel (revient au début ou à la fin)
        pagination: true
    })

}

if (document.readyState !== "loading") {
    onReady()
}
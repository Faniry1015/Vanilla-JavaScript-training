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
     * @param {boolean} [options.infinite = false]  Effet de défilement infini
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
            infinite: false,
        }, options)
        if(this.options.loop && this.options.infinite) {
            throw new Error("Un carousel ne peut être à la fois en boucle et en infini")
        }
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallbacks = []
        this.offset = 0

        //Modification du DOM
        this.root = this.createDivWithClass("carousel")
        this.container = this.createDivWithClass("carousel__container")
        this.root.setAttribute("tabindex", "0")
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map(child => {
            let item = this.createDivWithClass("carousel__item")
            item.appendChild(child)
            return item
        });
        if (this.options.infinite) {
            this.offset = this.slidesVisible + this.slidesToScroll
            if (this.offset > children.length) {
                console.error("vous n'avez pas assez d'élément dans le carousel", element) // Ne bloque pas l'exécution du script
            }
            this.items =  [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true))
            ]
            this.gotoItem(this.offset, false)
        }
        this.items.forEach(item => this.container.appendChild(item))
        this.setStyle()
        if (this.options.navigation === true) {
            this.createNavigation()
        }
        if (this.options.pagination === true) {
            this.createPagination()
        }
        this.createNavigation()

        //Evenements
        this.moveCallbacks.forEach(cb => cb(this.currentItem))
        this.onWindowResize()
        window.addEventListener("resize",this.onWindowResize.bind(this))
        this.root.addEventListener("keyup", e => {
            if (e.key === "ArrowRight" || e.key === "Right") {
                this.next()
            } else if (e.key === "ArrowLeft" || e.key === "Left") {
                this.prev()
            }
        })
        if(this.options.infinite) {
            this.container.addEventListener("transitionend", this.resetInfinite.bind(this))
        }
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
        for (let i =  0 ; i< (this.items.length - 2 * this.offset) ; i = i + this.options.slidesToScroll) {
            let button = this.createDivWithClass("carousel__pagination__button")
            button.addEventListener("click", () => this.gotoItem(i + this.offset))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let count = this.items.length - 2 * this.offset
           let activeButton = buttons[Math.floor(((index - this.offset) % count) / this.options.slidesToScroll)] 
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
     * @param {boolean} [animation = true] 
     */
    gotoItem(index, animation = true ) {
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
        if (animation === false) {
            this.container.style.transition = "none" 
        }
        this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)"
        this.container.offsetHeight     //force le navigateur à faire un repaint
        if (animation === false) {
            this.container.style.transition = "" 
        }
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    } 

    /**
     * Déplacé le container pour donner l'impression d'un slide infini
     */
    resetInfinite() {
        if (this.currentItem <= this.options.slidesToScroll) {
            this.gotoItem(this.currentItem + (this.items.length - 2 * this.offset), false)
            /**
             *1 2 3 4 5 6 7
             *  3 4 5 6 7 | 1 2 3 4 5 6 7 | 1 2 3 4 5
             */
        } else if (this.currentItem >= this.items.length - this.offset) {
            this.gotoItem(this.currentItem - (this.items.length - 2 * this.offset), false)
        }
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
        loop: false,              //En début ou fin de slide passer en fin ou en début avec une animation inverser
        infinite: true,            // NB: Désactiver le loop / Effet de défilement infini
        pagination: true,
        navigation: true        //Affichage des boutons de navigation
    })

}

if (document.readyState !== "loading") {
    onReady()
}
class Book {
    constructor(title, pages) {
        this.title = title
        this.pages = pages
    }

    #page = 1
    
    get page() {
        return this.#page
    }

    nextPage() {
        if (this.#page < this.pages) {
            return this.#page++
        }
    }

    closeBook() {
        return this.#page = 1
    }
}

class Library {
    books = []
    addBook(book) {
        this.books.push(book)
    }

    addBooks(b) {
        b.forEach(element => {
            this.books.push(element)
        });
    }


    findBooksByLetter(letter) {
        return this.books.filter((book) => {
            return book.title[0].toLowerCase() === letter.toLowerCase()
        })
    }
}

const b = new Book("Le seigneur des anneaux", 200)
b.nextPage()
console.log(b.page)

const l = new Library()
l.addBook(b)
l.addBooks([
    new Book("Peter Pan", 100),
    new Book("Batman", 175),
    new Book("Super Man", 200),
    new Book("Salope", 250),
]
)
console.log(l)
console.log(l.findBooksByLetter("S"))
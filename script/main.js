class Rectangle {
    constructor(width, length) {
        this.width = width
        this.length = length
    }

    get perimeter() {
        return (this.width + this.length) * 2
    }

    get isValid() {
        return this.width > 0 && this.length > 0
    }

    isBiggerThan(rect) {
        return this.perimeter > rect.perimeter
    }
}

const r = new Rectangle(10, 20)
console.log(r.perimeter)
const r1 = new Rectangle(-10, 30)
console.log(r1.isValid)

class Square extends Rectangle {
    constructor(width) {
        super(width, width)
    }
}

const c = new Square(10)
console.log(c.perimeter)

console.log(r.isBiggerThan(c))
class Rectangle {
    constructor(length, width) {
        if (length <=0 || width <=0) {
            throw new Error("Les côtés d'un rectangle ne peuvent être négatives")
        }
        this.length = length
        this.width = width
    }

    get  perimeter() {
        return (this.length + this.width)*2
    } 

    set notes(n) {
        if(Array.isArray(n)) {  //doit être un tableau
            this._notes = n
        } else {
            throw new Error("Tableau obligatoire")
        }
    }

    static color = "blue"  // ne peut s'appeler qu'appartir de la classe

    static fonctionStat() {
        console.log("Ne s'appel qu'avec \"Rectangle")
    }
    
    size = "big"
}

try {
    const r1 = new Rectangle(6, 2)
    console.log(r1)
    console.log(r1.perimeter) // pas de () avec les get ni set
    r1.notes = [12, 16] 
    console.log(r1)
    console.log(Rectangle.color)
    console.log(r1.size)
} catch(e) {
    console.log(e)
}
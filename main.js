/**
 * 
 * @param {number} age 
 * @param {string} country Code pays sur 2 caractères
 * @returns {boolean}
 */
function canDrive(age, country) {
    if ((age >= 18) || (age >= 16 && country === "FR")) {
        return true
    } else {
        return false
    }
}

/**
 * @returns {Array<string>}  //tableau de chaines de caractères
 */
function myArray () {

}
const b = myArray()

/**
 * @returns {{id: number, title: string, body: string}}
 */
function ObjCreate(id, title, body) {
        this.id = id
        this.title = title
        this.body = body
}

const c = new ObjCreate(1, "Salutation", "Salut tout le monde")
console.log(c)
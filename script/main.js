function decompte(n) {
    console.log(n)
    if (n <= 0 ) {
        return
    }
    setTimeout(() => decompte(n - 1), 1000)
}

decompte(4)
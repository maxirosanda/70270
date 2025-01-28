const listNumbers = (...numbers) => {
    const types = numbers.map(number => typeof number);
    const isValid = types.every(type => type === 'number');
    if (!isValid) {
        console.error("Invalid parameters",types)
        process.exit(-4)
    }
    console.log(numbers)
}

process.on("exit",code => {
    if(code === -4) {
        console.log("Server is stopping : Invalid parameters")
        return
    }
    console.log(`Server is stopping with code ${code}`)
})
listNumbers(1,2,3,4,5,6,7,8,9,10) // [1,2,3,4,5,6,7,8,9,10]
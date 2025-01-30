const login = (userName, password) => {
    if (!password) return "No se ha proporcionado un password";
    if (!userName) return "No se ha proporcionado un usuario";
    if (password !== '123') return "Contraseña incorrecta";
    if (userName !== 'coderUser') return "Credenciales incorrectas";
}

let testsPassed = 0;
let totalTests = 4;

console.log("Test 1: La función debe devolver 'No se ha proporcionado un password' si no se proporciona un password");
const resultOne = login('coderUser', "");

if (resultOne === "No se ha proporcionado un password") {
    console.log("Test 1 pasado");
    testsPassed++;
} else {
    console.log("Test 1 no pasado");
}

console.log("Test 2: La función debe devolver 'No se ha proporcionado un usuario' si no se proporciona un usuario");
const resultTwo = login("", '123');
if (resultTwo === "No se ha proporcionado un usuario") {
    console.log("Test 2 pasado");
    testsPassed++;
} else {
    console.log("Test 2 no pasado");
}

console.log("Test 3: La función debe devolver 'Contraseña incorrecta' si la contraseña no es 123");

const resultThree = login('coderUser', '1234');

if (resultThree === "Contraseña incorrecta") {
    console.log("Test 3 pasado");
    testsPassed++;
} else {
    console.log("Test 3 no pasado");
}

console.log("Test 4: La función debe devolver 'Credenciales incorrectas' si el usuario no coderUser");
const resultFour = login('maxiUser', '123');

if (resultFour === "Credenciales incorrectas") {
    console.log("Test 4 pasado");
    testsPassed++;
} else {
    console.log("Test 4 no pasado");
}

console.log(`El número total de tests pasados fue de ${testsPassed} de un total de ${totalTests}`);

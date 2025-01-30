import { faker } from '@faker-js/faker';

const generateRandomProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        code: faker.string.alphanumeric(10),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        department: faker.commerce.department(),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: faker.image.url()
    }
}

export const generateRandomUser = () => {

    const numOfProducts = faker.number.int({min: 1, max: 7})
    const products = []
    for(let i = 0; i < numOfProducts; i++) {

        const newProduct = generateRandomProduct()
        products.push(newProduct)
    }


  return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(["buyer", "seller"]),
        isPremium: faker.datatype.boolean(),
        occupation: faker.person.jobTitle(),
        products
  }
}


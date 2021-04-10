const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomCategoriesList = (n) => {
  if (n <= 0) return [];

  const categoriesList = [];


  Array.from(new Array(n)).forEach(() => {
    const categories = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoriesList.push(categories);
  });

  return categoriesList;
}

const randomProductList = (categoriesList, numberProduct) => {
  if (numberProduct <= 0) return;

  const productList = [];
categoriesList.forEach((category) => {
  Array.from(new Array(numberProduct)).forEach(() => {
    const product = {
      categoryId: category.id,
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: Number.parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      thumbnailUrl: faker.image.imageUrl(400, 400),
    };

    productList.push(product);
  })
})


  return productList;
}

(() => {
  // random data
  const categoriesList = randomCategoriesList(4);
  const productList = randomProductList(categoriesList, 5);

  // data object
  const db = {
    categories: categoriesList,
    products: productList,
    profiles: {
      name: 'TEST'
    }
  }
  // write db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log("Generate data successfully");
  })
})();

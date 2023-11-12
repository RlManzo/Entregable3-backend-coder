const fs = require('fs');


class ProductManager {

    constructor() {

        this.products = [];

        this.path = "./products.json";

    };


    async addProduct(title, description, price, thumbnail, code, stock) {

        const existingProduct = this.products.find((product) => product.code === code); 

        if (existingProduct) {

            console.log("Código repetido");

            return;

        };

        const product = {

            title,

            description,

            price,

            thumbnail,

            code,

            stock,

        };



        if (this.products.length === 0) {

            product.id = 1;

        } else {

            product.id = this.products[this.products.length - 1].id + 1;

        };



        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    };



    // Modificaciones de convención.

    async getProducts() {

        const products = await fs.promises.readFile(this.path, "utf-8");

        // Modificaciones de convención. Por un lado, una variable que no se modifica se declara constante "const". Por el otro, las variables suelen funcionar como contenedores de datos, por lo que suelen nombrarse con los datos establecidos y no como la funcionalidad para arribar a ellos.

        const parsedProducts = await JSON.parse(products); // Cambio de "let" a "const" y de "parseProducts" a "parsedProducts"

        console.log(parsedProducts);

        return parsedProducts;

    };

//metodo para obtener id
    async getProductById(productId) {

        const products = await this.getProducts(); // Cambio de "productsByID" a "products"

        const product = products.find((product) => product.id == productId); // Cambio de "byId" a "product"

        if (product) {

            console.log(product);

        } else {

            console.log("Producto no encontrado");

        };

    };

//metodo update producto    
    async updateProduct(id, updatedProduct) {

        const products = await this.getProducts();

        const index = products.findIndex((product) => product.id == id);

        if (index === -1) {

            console.log("Producto no encontrado");
             return;

        };
         products[index] = updatedProduct;
          await fs.promises.writeFile(this.path, JSON.stringify(products));

    };


//metodo delete
    async deleteProduct(productId) {

        const products = await this.getProducts(); 
       const index = products.findIndex((product) => product.id === productId); 

        if (index === -1) {
            console.log("Producto no encontrado");
            return;
        };
        products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
              console.log("Producto eliminado");
    };

};



module.exports.ProductManager = ProductManager

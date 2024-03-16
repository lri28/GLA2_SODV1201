document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const sortSelect = document.getElementById('sortPrice');
    const categorySelect = document.getElementById('productCategory');

    //Fetch products from the API
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    //Display products
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    //Sort products by price
    function sortProducts(products, order) {
        if (order === 'asc') {
            return products.sort((a, b) => a.price - b.price);
        } else {
            return products.sort((a, b) => b.price - a.price);
        }
    }

    //Filter products by category
    function filterProducts(products, category) {
        if (category === 'all') {
            return products;
        } else {
            return products.filter(product => product.category === category);
        }
    }

    //Event listener for sort select
    sortSelect.addEventListener('change', async function () {
        const products = await fetchProducts();
        const sortedProducts = sortProducts(products, this.value);
        const filteredProducts = filterProducts(sortedProducts, categorySelect.value);
        displayProducts(filteredProducts);
    });

    //Event listener for category select
    categorySelect.addEventListener('change', async function () {
        const products = await fetchProducts();
        const sortedProducts = sortProducts(products, sortSelect.value);
        const filteredProducts = filterProducts(sortedProducts, this.value);
        displayProducts(filteredProducts);
    });

    //Initial fetch and display of products
    (async function () {
        const products = await fetchProducts();
        displayProducts(products);
    })();
});

const API_URL = "https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('highest_price').addEventListener('click', getHighestPrice);
    document.getElementById('sum_test_bundle').addEventListener('click', sumTestBundle);
    document.getElementById('sold_out').addEventListener('click', soldOut);
    document.getElementById('size10').addEventListener('click', size10);
});

async function getHighestPrice() {
    // try {
        const res = await fetch(API_URL);
        const resData = await res.json();

        const items = resData.data.items;

        let highestPrice = 0;
        let productHighestPrice = null;

        items.forEach(item => {
            console.log(item);
            item.variants.forEach(variant => {
                if (variant.price > highestPrice) {
                    highestPrice = variant.price;
                    productHighestPrice = {
                        img: item.images && item.images[0] ? item.images[0].url : '',
                        title: item.title,
                        variant: variant 
                    };
                }
            });
        });

        const result = document.querySelector('.bai1 .result');
        if (productHighestPrice) {
            let optionsList = '';
            for (let option of productHighestPrice.variant.options) {
                optionsList += `<li>${option.name} - ${option.values.join(', ')}</li>`;
            }
            result.innerHTML = `
                <p>Name: ${productHighestPrice.title}</p>
                <p>Price: $${productHighestPrice.variant.price} USD</p>
                <p>Options:</p>
                <ul>
                    ${optionsList}
                </ul>
            `;
        } else {
            result.innerHTML = "Không tìm thấy sản phẩm nào.";
        }

    // } 
    // catch (error) {
    //     console.error("Error fetch data:", error);
    //     const resultHighestPrice = document.querySelector('.bai1 .result');
    //     resultHighestPrice.innerHTML = "Error";
    // }
}

async function sumTestBundle() {
    // try {
        const res = await fetch(API_URL);
        const resData = await res.json();

        const items = resData.data.items;

        let totalPrice = 0;
        let testBundle = items.find(item => item.title === "Test bundle");
        const result = document.querySelector('.bai2 .result');

        if(testBundle) {
            totalPrice = testBundle.variants.reduce((sum, cur) => sum + cur.price, 0)
            result.innerHTML = `
                <p>${testBundle.title}</p>
                <p>${testBundle.variants.length} variants</p>
                <p>Total price: $${totalPrice} USD</p>
                `;
        } else {
            result.innerHTML = "Not found 'Test bundle'";
        }



    // } 
    // catch (error) {
    //     console.error("Error fetch data:", error);
    //     const resultHighestPrice = document.querySelector('.bai1 .result');
    //     resultHighestPrice.innerHTML = "Error";
    // }
}

async function soldOut() {
    // try {
        const res = await fetch(API_URL);
        const resData = await res.json();

        const items = resData.data.items;

        let productSoldOut = items.filter(item => {
            return item.variants.some(variant => variant.available === 0);
        });
        
        const result = document.querySelector('.bai3 .result');
        
        if (productSoldOut.length > 0) {
            const listItems = productSoldOut.reduce((acc, product) => {
                return acc + `<li>${product.title}</li>`;
            }, '');
            result.innerHTML = `
                <p>Sold out: </p>
                <ul>${listItems}</ul>
            `;
        } else {
            result.innerHTML = "Not found product sold out";
        }

    // } 
    // catch (error) {
    //     console.error("Error fetch data:", error);
    //     const resultHighestPrice = document.querySelector('.bai1 .result');
    //     resultHighestPrice.innerHTML = "Error";
    // }
}

async function size10() {
    // try {
        const res = await fetch(API_URL);
        const resData = await res.json();

        const items = resData.data.items;

        let productsSize10 = items.filter(item => {
            return item.variants.some(variant => {
                variant.options.some((indexValue, indexName) => {
                    return (item.options[indexName].name == "Size" && item.options[indexName].values[indexValue] == "10")
                })
            });
        });
        
        const result = document.querySelector('.bai4 .result');
        
        if (productsSize10.length > 0) {
            let listItems = '';

            // productsSize10.forEach(product => {
            //     let productColor = product.options.
            //     product.variants.forEach(variant => {
            //             if (variant.options.some((indexValue, indexName) => {
            //                  (product.options[indexName].name == "Size" && product.options[indexName].values[indexValue] == "10")
            //             })) {
            //                 listItems += `<li>${product.title} 
            //                 <p> Color: ${optionValue}, Price: ${variant.price}</p></li>`;
            //             }
                    
            //     });
            // });
            result.innerHTML = `<ul>${listItems}</ul>`;
        } else {
            result.innerHTML = "Not found product with size 10";
        }

    // } 
    // catch (error) {
    //     console.error("Error fetch data:", error);
    //     const resultHighestPrice = document.querySelector('.bai1 .result');
    //     resultHighestPrice.innerHTML = "Error";
    // }
}
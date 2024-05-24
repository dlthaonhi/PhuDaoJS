const API_URL = "https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('highest_price').addEventListener('click', getHighestPrice);
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

        const resultHighestPrice = document.querySelector('.bai1 .result');
        if (productHighestPrice) {
            let optionsList = '';
            for (let option of productHighestPrice.variant.options) {
                optionsList += `<li>${option.name} - ${option.values.join(', ')}</li>`;
            }
            resultHighestPrice.innerHTML = `
                <p>Name: ${productHighestPrice.title}</p>
                <p>Price: $${productHighestPrice.variant.price} USD</p>
                <p>Options:</p>
                <ul>
                    ${optionsList}
                </ul>
            `;
        } else {
            resultHighestPrice.innerHTML = "Không tìm thấy sản phẩm nào.";
        }

    // } 
    // catch (error) {
    //     console.error("Error fetch data:", error);
    //     const resultHighestPrice = document.querySelector('.bai1 .result');
    //     resultHighestPrice.innerHTML = "Error";
    // }
}

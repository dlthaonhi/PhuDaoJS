const app = {

    API_URL: 'https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83',
    async fetchData() {
        const response = await fetch(this.API_URL);
        const { data } = await response.json();
        return data;
    },

    handleEvent(btnClass, callback) {
        const button = document.querySelector(btnClass);
        const result = document.querySelector('.result');
        button.addEventListener('click', async function() {
            result.innerHTML = await callback();
        })
    },

    // Bai 1
    async getMostExpensiveProduct() {
        const data = await app.fetchData();
        let maxProduct = data.items[0];
        let maxVariant = data.items[0].variants[0];

        data.items.forEach(product => {
            product.variants.forEach(variant => {
                if (variant.price > maxVariant.price) {
                    maxProduct = product;
                    maxVariant = variant;
                }
            })
        })

        return `
            <h2>${maxProduct.title}</h2>
            <p>Price: ${data.currency.longFormat.replace('{0}', maxVariant.price)}</p>
            <div>Option:</div>
            ${
                maxVariant.options.map((options, index) => {
                    return `<p>${index}: ${options}</p>`
                })
                .join('')
            }
        `
    },

    bai1() {
        app.handleEvent('.button-1', app.getMostExpensiveProduct)
    },


    // Bai 2
    async getTotalVariantPrice() {
        const data = await app.fetchData();
        const product = data.items.find(product => product.title === 'Test bundle');
        if (product) {
            let totalPrice = product.variants.reduce((total, variant) => total + variant.price, 0)

            return `
                <h2>${product.title}</h2>
                <p>${product.variants.length} variant${product.variants.length > 1 ? 's' : ''}</p>
                <p>Price: ${data.currency.longFormat.replace('{0}', totalPrice)}</p>
            `
        }
        return 'Khong tim thay Test bundle'
    },
    bai2() {
        app.handleEvent('.button-2', app.getTotalVariantPrice)
    },

    // Bai 3
    async getSoldOutProduct() {
        const data = await app.fetchData();
        const soldOutProducts = data.items.filter(product => product.variants.every(variant => variant.available === 0));

        if (soldOutProducts.length === 0) return 'Khong co san pham nao het hang'

        return soldOutProducts.map(product => {
            return `
                <h2>${product.title}</h2>
            `
        }).join('')
    },
    bai3() {
        app.handleEvent('.button-3', app.getSoldOutProduct)
    },
    
    // Bài 4
    async getProductWithOption(option, value) {
        if (!option || !value) return `Vui long nhap gia tri cho option/value`
        option = option.toLowerCase()
        value = value.toLowerCase()
        
        const data = await app.fetchData();
        const products = data.items.filter(product => {
            const hasOption = product.options.find(opt => opt.name.toLowerCase() === option)
            if (!hasOption) return false
            const hasValue = hasOption.values.find(val => val.toLowerCase() === value)
            return hasValue
        })

        if (!products.length) return 'Khong tim thay san pham nao'

        return products.map(product => {

            const optionIndex = product.options.findIndex(opt => opt.name.toLowerCase() === option)
            const valueIndex = product.options[optionIndex].values.findIndex(val => val.toLowerCase() === value)

            const productOptions = product.options

            let variants = product.variants.filter(variant => variant.options[optionIndex] === valueIndex)

            variants = variants.map(variant => {
                let option = variant.options.map((val, index) => {
                    if (index === optionIndex) return ''
                    return productOptions[index].name + ': ' + productOptions[index].values[val]
                }).join('')

                return `<div>${option} | ${data.currency.longFormat.replace('{0}', variant.price)}</div>`
            }).join('')

            return `
                <h2>${product.title}</h2>
                <div>${variants}</div>
            `   
        }).join('')
    },
    bai4() {
        const button = document.querySelector('.button-4')
        const optionInput = document.querySelector('#optionInput')
        const optionInputValue = document.querySelector('#optionInputValue')
        const result = document.querySelector('.result')
        button.addEventListener('click', async function() {
            result.innerHTML = await app.getProductWithOption(optionInput.value, optionInputValue.value)
        })
    },

    async getProductWithPrice(minPrice, maxPrice) {
        if (!(minPrice - 0) || !(maxPrice - 0)) return 'Vui long nhap so cho price'

        const data = await app.fetchData();
        const products = data.items.filter(product => {
            product.variants = product.variants.filter(variant => variant.price >= minPrice && variant.price <= maxPrice)
            return product.variants.length
        })

        if (!products.length) return 'Khong tim thay san pham nao'

        return products.map(product => {
            const productOptions = product.options

            const HTML =  product.variants.map(variant => {
                let option = variant.options.map((val, index) => {
                    return productOptions[index].name + ': ' + productOptions[index].values[val]
                }).join('')

                return `<div>${option} | ${data.currency.longFormat.replace('{0}', variant.price)}</div>`
            }).join('')

            return `
                <h2>${product.title}</h2>
                <div>${HTML}</div>
            ` 
        }).join('') 
    },
    bai5() {
        const button = document.querySelector('.button-5')
        const minPrice = document.querySelector('#minPrice')
        const maxPrice = document.querySelector('#maxPrice')
        const result = document.querySelector('.result')
        button.addEventListener('click', async function() {
            result.innerHTML = await app.getProductWithPrice(minPrice.value, maxPrice.value)
        })
    },

    init() {
        app.bai1();
        app.bai2();
        app.bai3();
        app.bai4();
        app.bai5();
    }
}

app.init()
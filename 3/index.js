const app = {
    API_URL: "https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83",

    async fetchData() {
        const response = await fetch(this.API_URL);
        const { data } = await response.json();
        return data;
    },

    
    handleEventChild(btnClass, callback) {
        const button = document.querySelector(btnClass);
        const result = document.querySelector('.result');
        button.addEventListener('click', async function() {
            result.innerHTML = await callback();
        })
    },

    async pending(button) {
        button.disabled = true;
        button.textContent = 'Đang tải sản phẩm…';

        try {
            const data = await this.fetchData();
            button.textContent = `Đã tải xong ${data.items.length} sản phẩm.`;
            // console.log(data);
            console.log(data.items);
            // console.log(typeof(data.items));
            this.done();
        } catch (error) {
            console.error('Error loading products:', error);
            button.textContent = 'Lỗi khi tải sản phẩm';
        } finally {
            button.disabled = false;
        }
    },

    done() {
        const result = document.querySelector('.result');
        result.style.display = 'block';
    },


    bai1() {
        const button = document.querySelector('.download');
        button.addEventListener('click', async function() {
            await app.pending(button);
            app.done();
        })
    },

    async renderListProduct(){
        const data = await app.fetchData();
        const products = data.items;

        return products.map((product,index) => {
            const productOptions = product.options;

            let optionHTML = '';
            // let discount = 0;
            if (productOptions.length == 0) optionHTML = '';
            else {
                optionHTML = productOptions.map((option, index) => {
                    const values = option.values.join(', ');
                    return `${option.name}: ${values}`;
                }).join('')
                // console.log(productOptions);
                
            }

            const variant = product.variants[0];
                
            // if(variant.compareAtPrice == 0) discount = 'No discount yet';
            // else {
            //     discount = ((variant.compareAtPrice - variant.price)/variant.compareAtPrice)*100;
            //     discount = discount.toFixed(0) + '%';
            // }
            const discount = variant.compareAtPrice ? ((variant.compareAtPrice - variant.price) / variant.compareAtPrice * 100).toFixed(0) + '%' : 'No discount yet';
            return `
                <h2>${index+1}. ${product.title}</h2>
                <div>${optionHTML}</div>
                <div>Price:  ${data.currency.longFormat.replace('{0}', variant.price)}</div>
                <div>Discount: ${discount}</div>
            `
            
        }).join('');
    },

    bai2() {
        const button = document.querySelector('.list-product');
        const result = document.querySelector('.result');
        button.addEventListener('click', async function() {
            result.innerHTML = await app.renderListProduct();
        })
    },

    renderProducts(products,result) {
        const productHTML = products.map((product, index) => {
            const productOptions = product.options;

            let optionHTML = '';
            if (productOptions.length == 0) optionHTML = '';
            else {
                optionHTML = productOptions.map((option, index) => {
                    const values = option.values.join(', ');
                    return `${option.name}: ${values}`;
                }).join('')
                // console.log(productOptions);
            }
            
            const variant = product.variants[0];
            const discount = variant.compareAtPrice ? ((variant.compareAtPrice - variant.price) / variant.compareAtPrice * 100).toFixed(0) + '%' : 'No discount yet';
            return `
                <div class="product">
                    <h2>${index + 1}. ${product.title}</h2>
                    <div>${optionHTML}</div>
                    <div>Price: ${variant.price}</div>
                    <div>Discount: ${discount}%</div>
                </div>
            `;
        }).join('');
        result.innerHTML = productHTML || '<div>No products found</div>';
    },

    
    async searchProduct (searchInput,result) {
        const query = searchInput.value.toLowerCase();
        const data = await app.fetchData(query);
        const products = data.items;
        const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            result.innerHTML = 'Không có sản phẩm nào khớp với từ khoá cần tìm';
        } else {
            app.renderProducts(filteredProducts,result);
        }
    },

    async bai3 () {
        const searchInput = document.querySelector('.search-input');
        const result = document.querySelector('.show-result');

        let timeout = null;
        searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            result.innerHTML = '<div>Đang tìm kiếm…</div>';
            result.style.display = 'block';
            timeout = setTimeout(this.searchProduct(searchInput,result), 500);
        });
        // app.debounce(app.searchProduct(searchInput,result));
    },


    // debounce(callback) {
    //     let timer
    //     return function() {
    //         clearTimeout(timer)
    //         result.innerHTML = '<div>Đang tìm kiếm…</div>';
    //         result.style.display = 'block';
    //         timer = setTimeout(() => {
    //             callback();
    //         }, 300)
    //     }
    // },

    async renderOptions() {
        const data = await this.fetchData();
        const products = data.items;
        const optionList = new Set();
        products.forEach(product => {
            const productOptions = product.options;
            productOptions.forEach(option => {
                optionList.add(option.name);
            });
        });
        const select = document.querySelector('.option-select');
        optionList.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    },

    async handleOptionChange() {
        const data = await this.fetchData();
        const select = document.querySelector('.option-select');
        let selectedOption = select.value;
        console.log(selectedOption);
        selectedOption = selectedOption.toLowerCase()
        const filteredProducts = data.items.filter(product => {
            const hasOption = product.options.find(opt => opt.name.toLowerCase() === selectedOption)
            if (hasOption) return true   
        })
        const result = document.querySelector('.show-result');
        this.renderProducts(filteredProducts,result);
    },
    
    
    bai4 () {
        this.renderOptions();
        const select = document.querySelector('.option-select');
        select.addEventListener('change', () => this.handleOptionChange());
    },


    init() {
        this.bai1();
        this.bai2();
        this.bai3();
        this.bai4();
    },
};

app.init()
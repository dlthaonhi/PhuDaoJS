const app = {
    API_URL: "https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83",

    async fetchData() {
        const response = await fetch(this.API_URL);
        const { data } = await response.json();
        return data;
    },

    handleEvent(btnClass) {
        const button = document.querySelector(btnClass);
        button.addEventListener('click', async function() {
            await app.pending(button);
        })

    },

    async pending(button) {
        button.disabled = true;
        button.textContent = 'Đang tải sản phẩm…';

        try {
            const data = await this.fetchData();
            button.textContent = `Đã tải xong ${data.items.length} sản phẩm.`;
            console.log(data.items);
            console.log(typeof(data.items));
            this.done(data);
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
        this.handleEvent('.download')
    },



    init() {
        this.bai1()
    },
};

app.init()
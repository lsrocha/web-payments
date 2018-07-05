(function() {
    let button = document.querySelector('#buy-now');
    if (!button) return;

    button.addEventListener('click', buy);

    function buy() {
        console.log('BUYING A PRODUCT');

        const details = {
            id: 'venda-000000000001',
            displayItems: [
                {
                    label: 'Sorvete Casquinha',
                    amount: {
                        currency: 'BRL',
                        value: '2.00'
                    }
                }
            ],
            total: {
                label: 'Total',
                amount: {
                    currency: 'BRL',
                    value: '2.00'
                }
            }
        };

        requestPayment(details);        
    }

    async function requestPayment(items) {
        const method = [
            {
                supportedMethods: "basic-card",
                data: {
                    supportedNetworks: ['visa', 'mastercard'],
                    supportedTypes: ['credit', 'debit']
                }
            }
        ];

        const options = {
            requestPayerEmail: true,
            requestPayerName: true,
            requestPayerPhone: false,
            requestShipping: false
        };

        const request = new PaymentRequest(method, items, options);
        const response = await request.show();

        await processPaymentResponse(response);
    }

    async function processPaymentResponse(response) {
        console.log(response);
        response.complete('success');
    }
})();
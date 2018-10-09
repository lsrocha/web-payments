(function() {
	const Product = function(code, name, price) {
        this.code = code;
        this.name = name;
        this.price = price;
	};

	Product.prototype.name = null;
    Product.prototype.code = null;
	Product.prototype.price = 0.0;
    Product.prototype.quantity = 0;

    Product.prototype.isInStock = function() {
        return (this.quantity > 0);
    };

    Product.prototype.isQuantityAvailable = function(qty) {
        return (qty <= this.quantity);
    };

    Product.prototype.setStock = function(qty) {
        if (qty < 0) {
            return 0;
        }

        this.quantity = qty;

        return this;
    };

	const CartItem = function(product, quantity) {
        if (!(product instanceof Product)) {
            // throw exception
        }

        this.product = product;
        this.increment(quantity);
    };

	CartItem.prototype.product = null;
	CartItem.prototype.quantity = 0;
	CartItem.prototype.total = 0;

    CartItem.prototype.increment = function(quantity) {
        if (!quantity) quantity = 1;

        let newQuantity = this.quantity + quantity;

        if (!this.product.isQuantityAvailable(newQuantity)) {
            // throw exception
        }

        this.quantity = newQuantity;
        this.calculateTotal();

        return this;
    };

    CartItem.prototype.calculateTotal = function() {
        this.total = this.quantity * this.product.price;

        return this;
    };

	const Cart = function() {};
	Cart.prototype.items = {};
    Cart.prototype.subTotal = 0;

    Cart.prototype.add = function(product, quantity) {
        if (!(product instanceof Product)) {
            // throw exception
        }

        let code = product.code;

        if (this.items.hasOwnProperty(code)) {
            let item = this.items[code];
            let additionalQuantity = quantity - item.quantity;

            item.increment(additionalQuantity);
        } else {
            this.items[code] = new CartItem(product, quantity);
        }

        this.calculateTotal();

        return this;
    };

    Cart.prototype.calculateTotal = function() {
        let amount = 0;
        let codes = Object.getOwnPropertyNames(this.items);

        for (let i = 0; i < codes.length; i++) {
            let itemCode = codes[i];
            let item = this.items[itemCode];

            amount += item.total;
        }

        this.subTotal = amount;

        return this;
    };

	const Checkout = function() {};
    Checkout.prototype.cart = new Cart();

	// Checkout.prototype.pay = function () {};

	window.Cart = Cart;
    window.Product = Product;
})();

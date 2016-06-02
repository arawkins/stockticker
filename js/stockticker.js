var stockMarket = {

    stocks : [],
    newsFeed : [],
    cash : 0,
    messageClearCounter:0,

    init: function () {

        this.stocks = [
            {name: "Gold", price: 100, shares:0},
            {name: "Silver", price: 100, shares:0},
            {name: "Bonds", price: 100, shares:0},
            {name: "Oil", price: 100, shares:0},
            {name: "Industrials", price: 100, shares:0},
            {name: "Grain", price: 100, shares:0}
        ];

        this.newsFeed = [];
        this.cash = 1000;
        this.messageClearCounter = 0
    },

    broadcast:function (message) {
        this.newsFeed.unshift(message);
    },

    update: function() {


        var roll1 = Math.floor(Math.random() * 3 + 1); // action
        var roll2 = Math.floor(Math.random() * 3 + 1) * 5; // amount
        var roll3 = Math.floor(Math.random() * this.stocks.length); // stock choice

        var affectedStock = this.stocks[roll3];

        switch(roll1) {

            case 1:
            if (affectedStock.price >= 100 && affectedStock.shares > 0) {
                var dividend = affectedStock.shares * roll2;
                this.broadcast(affectedStock.name + " pays dividend of " + dividend);
                this.cash += dividend;
            }
            break;

            case 2:
            affectedStock.price += roll2;
            this.broadcast(affectedStock.name + " goes up " + roll2);
            break;

            case 3:
            affectedStock.price -= roll2;
            this.broadcast(affectedStock.name + " goes down " + roll2);
            break;

        }

        if (affectedStock.price >= 200) {

            affectedStock.shares *= 2;
            affectedStock.price = 100;
            this.broadcast(affectedStock.name + " has split, shares have doubled!");

        } else if (affectedStock.price <= 0) {

            affectedStock.shares = 0;
            affectedStock.price = 100;
            this.broadcast(affectedStock.name + " has crashed, shares are gone :(");

        }

        if (this.newsFeed.length > 25) {
            this.newsFeed.pop();
        }
    },

    getStockPrice(stockName) {

        for(var i=0;i < this.stocks.length; i++) {
            if (this.stocks[i].name == stockName) {
                return this.stocks[i].price;
            }
        }

        return -1;
    },

    getStockByName(stockName) {
        for(var i=0;i < this.stocks.length; i++) {
            if (this.stocks[i].name == stockName) {
                return this.stocks[i];
            }
        }
        return null;
    },

    buyShare(stockName) {

        //get price
        var thisStock = this.getStockByName(stockName);
        var price = thisStock.price;

        if (this.cash >= price) {
            thisStock.shares += 1;
            this.cash -= price;
            this.broadcast("Bought a share of  " + stockName + " for " + price);
        } else {
            console.log("You can't afford that stock");
        }

    },

    sellShare(stockName) {

        var thisStock = this.getStockByName(stockName);

        if (thisStock.shares > 0) {
            this.cash += thisStock.price;
            thisStock.shares -= 1;
            this.broadcast("Sold a share of  " + stockName + " for " + thisStock.price);
        }

    }
};

stockMarket.init();
stockMarket.interval = setInterval(function() { stockMarket.update()}, 2000);

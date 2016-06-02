var stockMarket = {

    stocks : [],
    newsFeed : [],
    cash : 0,

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
    },

    broadcast:function (message) {
        this.newsFeed.unshift(message);
    },

    update: function() {

        for(var i=0;i < this.stocks.length; i++) {

            var thisStock = this.stocks[i];
            var deltaPrice = 5;

            var roll1 = Math.floor(Math.random() * 3 + 1);
            var roll2 = Math.floor(Math.random() * 3 + 1) * 5;


            if (Math.floor((Math.random() * 10) + 1) > 5)  {
                deltaPrice *= -1;
            }

            thisStock.price += deltaPrice;

            if (thisStock.price >= 200) {

                thisStock.shares *= 2;
                thisStock.price = 100;

                var splitEvent = new Event('stockSplit');
                splitEvent.stockName = thisStock.name;
                window.dispatchEvent(splitEvent);

            } else if (thisStock.price <= 0) {

                thisStock.shares = 0;
                thisStock.price = 100;

                var crashEvent = new Event('stockCrash');
                splitEvent.stockName = thisStock.name;
                window.dispatchEvent(crashEvent);

            }

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
stockMarket.broadcast("Welcome to React Stock Ticker!!!");
stockMarket.interval = setInterval(function() { stockMarket.update()}, 2000);

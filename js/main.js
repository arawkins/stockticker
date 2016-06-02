var Stock = React.createClass({

    handleBuy: function(e) {

        var stockName = $(e.target).attr('data-stock');
        this.props.onBuy(stockName);

    },

    handleSell: function(e) {

        var stockName = $(e.target).attr('data-stock');
        this.props.onSell(stockName);

    },

    render: function() {

        return (

            <article className="stock">
                <h3>{this.props.name}</h3>
                <p className="price">${this.props.price} / share</p>
                <button data-stock={this.props.name} className="buy" onClick={this.handleBuy}>Buy</button>
                <button data-stock={this.props.name} className="sell" onClick={this.handleSell}>Sell</button>
            </article>

        );

    }
});

var Shares = React.createClass({

    render: function() {
        return (
            <p className="share">Shares: {this.props.count}</p>
        );
    }

});

var NewsItem = React.createClass({

    render: function() {
        return (
            <article className="newsItem">{this.props.message}</article>
        )
    }

})

var NewsFeed = React.createClass({

    render: function () {
        var newsItems = this.props.data.map(function(item) {
            return (
                <NewsItem message={item} />
            );
        }, this);

        return (
            <div className="newsFeed">
                <h2>News</h2>
                {newsItems}
            </div>
        )
    }

})

var Cash = React.createClass({

    render: function() {
        return (
            <p className="cash">Cash: ${this.props.amount}</p>
        )
    }

})

var StockView = React.createClass({

    propTypes: {
        cash: React.PropTypes.number,
        data: React.PropTypes.array,
        newsFeed: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            cash: stockMarket.cash
        }
    },

    updateStocks: function () {
        this.setState({data: stockMarket.stocks, cash:stockMarket.cash, newsFeed: stockMarket.newsFeed});
    },

    onBuy: function(stockName) {
        stockMarket.buyShare(stockName);
        this.setState({data:stockMarket.stocks, cash:stockMarket.cash, newsFeed: stockMarket.newsFeed});
    },

    onSell: function(stockName) {
        stockMarket.sellShare(stockName);
        this.setState({data:stockMarket.stocks, cash:stockMarket.cash, newsFeed: stockMarket.newsFeed});
    },

    componentDidMount() {
        this.updateStocks();
        setInterval(this.updateStocks, 100);
    },

    render : function () {

        var stockNodes = this.props.data.map(function(stock) {

            return (
                <div className="stockNode">
                <Stock id={stock.id} name={stock.name} price={stock.price} onBuy={this.onBuy} onSell={this.onSell} />
                <Shares name={stock.name} count={stock.shares} />
                </div>
            );
        }, this);


        return (

            <div id="game">
            <h1>React Stock Ticker</h1>
            <Cash amount={this.state.cash} />

            <div className="stocks">
                <h2>Stocks</h2>
                {stockNodes}
            </div>

            <NewsFeed data={this.props.newsFeed} />

            </div>

        );

    }

});

ReactDOM.render(
    <StockView data={stockMarket.stocks} newsFeed={stockMarket.newsFeed} />,
    document.getElementById('content')
);

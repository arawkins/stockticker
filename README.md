# React Stock Ticker

React Stock Ticker is a basic single player web based re-creation of the classic board game [Stock Ticker](https://en.wikipedia.org/wiki/Stock_Ticker). I built it to get some hands on time with [React](https://facebook.github.io/react/) and learn how it works.

## How to Play

Play it here: http://arawkins.github.io/stockticker/

The rules of the game are pretty simple. Stock prices go up and down randomly every few seconds, by 5, 10, or 15 dollars per share. If a stock is valued at $100 or more per share, it will sometimes pay you dividends. The more shares you own, the bigger the dividends you can earn.

If a stock hits $200 / share, the stock will split. Your shares will double, and the price per share will be reset to $100.

If a stock hits $0 / share, it will crash and be taken off the market. All your shares in that stock are lost, and the price per share will be reset to $100.

I don't actually recall how you would win the board game. I just remember endlessly playing it with my friends and then getting really angry about the dice rolls :)

## How it's built

(js/stockticker.js) is the basic game engine. It updates the stocks, tracks dividends, and responds to request to buy or sell shares. It's plain javascript, no React. This could in theory be placed on a server and could allow for multiplayer play without too much fuss. Perhaps another day!

main.js is the React front end. It polls for stock data from the game engine and updates the view when stock prices change. It also updates a realtime log of events that are broadcasted from the game, and displays/updates the players cash and shares.

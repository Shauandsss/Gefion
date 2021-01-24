module.import('db.js')
    (async () => {
        const db = require("./db")
        console.log("Começou")

        const stocks = await db.selectStocks('IBOV');
        console.log('Select')
        console.log(stocks)
    })();
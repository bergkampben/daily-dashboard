import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

var stocks_symbols = ["SPY", "DOW", "GOOGL", "GBTC"];

const StockPrice = () => {

const [stock_prices, set_stock_prices] = useState([]);
const [isLoading, setIsLoading ] = useState(true);

const getTopics = async (symbol) => {
    const response = await fetch('/api/stock-price?symbol=' + symbol);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const loadingMessage = () => {
      const message = {
          title: "Loading Topics",
          detail: "..."
      }

      if (isLoading) {
          return (
              <React.Fragment>
                  <div>
                      <ErrorMessage
                          key={message.title}
                          error={message}
                          styleType="success"
                      />
                  </div>
                  <Spinner />
              </React.Fragment>
          );
      }
  };

    const getStockData = async () => {
        var tmp_stock_prices = [];
        for (var symbol of stocks_symbols) {
            var price = await getTopics(symbol);
            price["Symbol"] = symbol;
            tmp_stock_prices.push(price);
        }
        set_stock_prices(tmp_stock_prices);
        setIsLoading(false);
    }

    useEffect(() => {
      getStockData();
      const interval = setInterval(() => getStockData(), 60000);
     return () => {
         clearTimeout(interval);
     }

  }, []);
  
  const get_price_diff = (px) => {
    var px_diff_pct = (px.c - px.pc).toFixed(2);
    if (px_diff_pct < 0) {
        return (
            <div className="stock-down stock-pc-diff-element">
                {px_diff_pct}
            </div>
        )
    } else {
        return (
            <div className="stock-up stock-pc-diff-element">
                +{px_diff_pct}
            </div>
        )
    }
  }

  const get_px_pct_diff = (px) => {
      var px_diff = (((px.c - px.pc) / px.pc) * 100).toFixed(2);
      if (px_diff < 0) {
          return (
              <div className="stock-down stock-pc-diff-element">
                  {px_diff}
              </div>
          )
      } else {
          return (
              <div className="stock-up stock-pc-diff-element">
                  +{px_diff}
              </div>
          )
      }
  }

  const displayFeed = () => {

          return (
            <div style={{"margin-top": "20px"}}>
                <table style={{"table-layout":"fixed", width: "100%", "font-size": "20px"}}>
                    <thead>
                        <tr>
                            <th>
                                Symbol
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                &Delta;
                            </th>
                            <th>
                                % &Delta;
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <React.Fragment>
                            {stock_prices.map((x) => (
                                <tr className="stock-element">
                                    <td style={{"text-align":"left"}}>
                                        {x.Symbol}
                                    </td>
                                    <td style={{"text-align":"left"}}>
                                        {x.c.toFixed(2)}
                                    </td>
                                    <td>
                                        {get_price_diff(x)}
                                    </td>
                                    <td>
                                        {get_px_pct_diff(x)}
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    </tbody>
                </table>
            </div>
          )
  }

  return (
      <div>
          {loadingMessage()}
          {displayFeed()}
      </div>
  )
}


  export default StockPrice;
import React, { useState } from "react";

import useContracts from "../hooks/useContracts";
import styles from "./css/buy-pkr.module.css";

function BuyPKRRoute(props) {
  const { pkr, pkrCrowdsale } = useContracts();
  const [pkrAmount, setPkrAmount] = useState(0);
  const handleBuyPKR = async () => {
    const unitInLowest = 100;
    const exchangeRate = 100;
    console.log("Buying...", pkrAmount);
    const result = await pkrCrowdsale.buyTokens(pkrAmount * unitInLowest, {
      value: pkrAmount * unitInLowest * exchangeRate,
    });
    console.log(result);
  };
  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleBuyPKR();
        }}
      >
        <div className={styles.formInput}>
          <input
            type="number"
            placeholder="Number of PKR"
            value={pkrAmount || ""}
            onChange={({ target }) =>
              setPkrAmount(target.value >= 0 ? target.value : 0)
            }
          />
        </div>
        <div className={styles.formInput}>
          <input type="submit" value="Buy!" />
        </div>
      </form>
    </div>
  );
}

export default BuyPKRRoute;

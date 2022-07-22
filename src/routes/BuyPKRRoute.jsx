import React, { useState } from "react";

import useContracts from "../hooks/useContracts";
import useAccounts from "../hooks/useAccounts";

import styles from "./css/buy-pkr.module.css";

function BuyPKRRoute(props) {
  const { loadBalances } = useAccounts();

  const { pkrCrowdsale } = useContracts();
  const [pkrAmount, setPkrAmount] = useState(0);

  const handleBuyPKR = async () => {
    const unitInLowest = 100;
    const exchangeRate = 100;

    console.log(parseInt(pkrAmount * unitInLowest));

    await (
      await pkrCrowdsale.buyTokens(parseInt(pkrAmount * unitInLowest), {
        value: parseInt(pkrAmount * unitInLowest) * exchangeRate,
      })
    ).wait();

    loadBalances();
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

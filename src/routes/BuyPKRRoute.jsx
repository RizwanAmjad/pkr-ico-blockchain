import React, { useState } from "react";

import useContracts from "../hooks/useContracts";
import styles from "./css/buy-pkr.module.css";

function BuyPKRRoute(props) {
  const { pkr, pkrCrowdsale } = useContracts();
  const [pkrAmount, setPkrAmount] = useState(0);
  const handleBuyPKR = () => {
    console.log("Buying...", pkrAmount);
    console.log(pkr);
    console.log(pkrCrowdsale);
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

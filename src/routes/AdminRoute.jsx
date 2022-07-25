import React, { useState } from "react";

import useContracts from "../hooks/useContracts";
import useAccounts from "../hooks/useAccounts";

import styles from "./css/buy-pkr.module.css";

function AdminRoute(props) {
  const [pkrAmount, setPkrAmount] = useState(0);

  const { pkr, pkrCrowdsale } = useContracts();
  const { loadBalances } = useAccounts();

  const handleImportPKR = async () => {
    const lowestInUnit = 100;
    await (
      await pkr.transfer(
        pkrCrowdsale.address,
        parseInt(pkrAmount * lowestInUnit)
      )
    ).wait();
    loadBalances();
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleImportPKR();
        }}
      >
        <div className={styles.formInput}>
          <input
            type="number"
            placeholder="Number of PKR"
            value={pkrAmount || ""}
            onChange={({ target }) =>
              setPkrAmount(target.value > 0 ? target.value : 0)
            }
          />
        </div>
        <div className={styles.formInput}>
          <input type="submit" value="Crowdsale!" />
        </div>
      </form>
    </div>
  );
}

export default AdminRoute;

import React, { useState } from "react";

import useContracts from "../hooks/useContracts";
import useAccounts from "../hooks/useAccounts";

import styles from "./css/buy-pkr.module.css";

function SendPKRRoute(props) {
  const { loadBalances } = useAccounts();
  const { pkr } = useContracts();
  const [pkrAmount, setPkrAmount] = useState(0);
  const [receiverAccount, setReceiverAccount] = useState("");

  const handleSendPKR = async () => {
    const lowestInUnit = 100;
    await (
      await pkr.transfer(receiverAccount, parseInt(pkrAmount * lowestInUnit))
    ).wait();
    loadBalances();
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPKR();
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
          <input
            type="text"
            placeholder="Receiver Account"
            value={receiverAccount}
            onChange={({ target }) => setReceiverAccount(target.value)}
          />
        </div>
        <div className={styles.formInput}>
          <input type="submit" value="Send!" />
        </div>
      </form>
    </div>
  );
}

export default SendPKRRoute;

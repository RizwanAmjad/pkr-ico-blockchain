import React, { useState, useEffect } from "react";

import CountDownComponent from "../components/CountDownComponent";

import useContracts from "../hooks/useContracts";

function HomeRoute(props) {
  const [times, setTimes] = useState({});
  const { pkrCrowdsale } = useContracts();

  useEffect(() => {
    (async () => {
      if (!pkrCrowdsale) return;
      const openingTime = (await pkrCrowdsale.openingTime()).toNumber();
      const closingTime = (await pkrCrowdsale.closingTime()).toNumber();

      setTimes({ openingTime, closingTime });
    })();
  }, []);

  return (
    <div>
      <CountDownComponent
        openingTime={times.openingTime}
        closingTime={times.closingTime}
      />
    </div>
  );
}

export default HomeRoute;

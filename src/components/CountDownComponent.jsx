import React, { useEffect, useState } from "react";

const remainingTimeString = (time) => {
  const days = parseInt(time / 60 / 60 / 24) % 24;
  const hours = parseInt(time / 60 / 60) % 60;
  const secs = time % 60;
  return `${days}days ${hours}hours ${secs}sec`;
};

function CountDownComponent({ openingTime, closingTime }) {
  const [currentTime, setCurrentTime] = useState(parseInt(Date.now() / 1000));

  useEffect(() => {
    setTimeout(() => setCurrentTime(parseInt(Date.now()) / 1000), 1000);
  }, [currentTime]);

  return (
    <div>
      <div>
        Opening Time {new Date(openingTime * 1000).toLocaleDateString("en-US")}{" "}
        {new Date(openingTime * 1000).toLocaleTimeString("en-US")}
      </div>
      <div>
        Closing Time {new Date(closingTime * 1000).toLocaleDateString("en-US")}{" "}
        {new Date(closingTime * 1000).toLocaleTimeString("en-US")}
      </div>
      {openingTime > currentTime && (
        <div>
          Opening In {remainingTimeString(parseInt(openingTime - currentTime))}
        </div>
      )}
      {closingTime > currentTime && openingTime < currentTime && (
        <div>
          Closing In {remainingTimeString(parseInt(closingTime - currentTime))}
        </div>
      )}
      {closingTime < currentTime && <div>Closed</div>}
    </div>
  );
}

export default CountDownComponent;

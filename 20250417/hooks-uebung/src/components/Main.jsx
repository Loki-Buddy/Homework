import React, { useState, useEffect } from "react";

function Main() {
  const [colorChangeCount, setColorChangeCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorChangeCount((prevCount) => prevCount + 1);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <main>
      <h2>So oft wurde schon die Farbe gewechselt:</h2>
      <p>{colorChangeCount}</p>
    </main>
  );
}

export default Main;
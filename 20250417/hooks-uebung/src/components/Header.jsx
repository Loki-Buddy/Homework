import React, { useState, useEffect } from "react";

function Header() {
  const [color, setColor] = useState("purple");

  useEffect(() => {
    const colors = ["white", "blue", "red", "green", "purple"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setColor(colors[index]);
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <header>
      <h1>Hausaufgaben</h1>
      <h5 style={{ color: color }}>"hooks-uebung"</h5>
    </header>
  );
}

export default Header;

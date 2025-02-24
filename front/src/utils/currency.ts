const EUR_RATE = 390; // 1 EUR = 390 HUF

export const formatPrice = (priceInHUF: number): string => {
  const currency = localStorage.getItem("currency") || "HUF";

  if (currency === "EUR") {
    const priceInEUR = priceInHUF / EUR_RATE;
    return `€${priceInEUR.toFixed(2)}`;
  }

  return `${priceInHUF.toLocaleString()} Ft`;
};

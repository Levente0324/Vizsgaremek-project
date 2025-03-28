let EUR_RATE: number = 390; // Default value

const fetchExchangeRate = async () => {
  try {
    const response = await fetch("https://api.frankfurter.dev/v1/latest");
    const data = await response.json();
    if (data.rates.HUF) {
      EUR_RATE = data.rates.HUF;
      console.log("Exchange rate updated:", EUR_RATE);
    }
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
  }
};

if (typeof window !== "undefined") {
  console.log("Fetching exchange rate on client side...");
  fetchExchangeRate();
}

export const formatPrice = (priceInHUF: number): string => {
  const currency = localStorage.getItem("currency") || "HUF";

  if (currency === "EUR") {
    const priceInEUR = priceInHUF / EUR_RATE;
    return `€${priceInEUR.toFixed(2)}`;
  }

  return `${priceInHUF.toLocaleString()} Ft`;
};

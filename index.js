import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import Chart from "react-apexcharts";

export default function DexInterface() {
  const [price, setPrice] = useState(0);
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("tokenA");

  useEffect(() => {
    fetchPrice();
    fetchHistory();
  }, []);

  async function fetchPrice() {
    const response = await fetch("/api/price");
    const data = await response.json();
    setPrice(data.price);
  }

  async function fetchHistory() {
    const response = await fetch("/api/history");
    const data = await response.json();
    setHistory(data);
  }

  async function handleSwap() {
    alert(`Swap simulado: ${amount} de ${selectedToken}`);
  }

  return (
    <div className="p-6 grid gap-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">ARGswap Dashboard</h2>
          <p>Precio actual: {price} ARGCOIN</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Swap de Tokens</h2>
          <Input 
            type="number" 
            placeholder="Cantidad" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="border p-2"
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <option value="tokenA">Token A</option>
            <option value="tokenB">Token B</option>
          </select>
          <Button onClick={handleSwap}>Simular Swap</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold">Historial de Precio</h2>
          <Chart 
            options={{ chart: { id: "price-chart" }, xaxis: { categories: history.map(h => h.timestamp) } }}
            series={[{ name: "Precio", data: history.map(h => h.tokenAReserve / h.tokenBReserve) }]}
            type="line"
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
}
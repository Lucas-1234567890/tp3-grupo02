import { useEffect, useState } from "react";

const BASE_URL = "http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000";

export default function LeilaoList({ token, onSelect, onData }) {
  const [leiloes, setLeiloes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${BASE_URL}/leiloes/72/lotes`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        setLeiloes(d);
        onData && onData(d);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading || !leiloes) {
    // skeleton screen
    return (
      <div className="container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 80 }} />
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      {console.log(leiloes)}
      {leiloes.map((l, idx) => (
        <div key={l.id || idx} className="card" onClick={() => onSelect(idx)}>
          {/* <h3>{l.titulo || `Lote ${idx + 1}`}</h3> */}
          <h3>{`Veículo ${idx + 1}`}</h3>
          <p>Valor Inicial: R$ {l.valor_inicial || "0"}</p>
          <p>Marca: {l.marca || "sem marca"}</p>
          <p>Modelo: {l.modelo || "sem modelo"}</p>
          <p>Ano: {l.ano_modelo || "sem ano"}</p>

        </div>
      ))}
    </div>
  );
}

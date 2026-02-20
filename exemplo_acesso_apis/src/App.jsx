import { useState } from "react";
import Login from "./components/Login";
import LeilaoList from "./components/LeilaoList";
import LeilaoDetail from "./components/LeilaoDetail";
import ImovelForm from "./components/ImovelForm";
import { useToast } from "./components/Toast";

function App() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState("list"); // list, detail, new
  const [leiloes, setLeiloes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const toast = useToast();

  const handleSelect = (i) => {
    setCurrentIndex(i);
    setView("detail");
  };

  const handleSaveImovel = (imovel) => {
    // just show toast and log, real implementation would post to API
    console.log("Móvel salvo", imovel);
    toast.show("Móvel salvo com sucesso");
    setView("list");
  };

  return (
    <div>
        {!token && <Login onToken={setToken} />}
        {token && view === "list" && (
          <>
            <button onClick={() => setView("new")}>Novo Móvel</button>
            <LeilaoList
              token={token}
              onSelect={handleSelect}
              onData={(data) => setLeiloes(data)}
            />
          </>
        )}
        {token && view === "detail" && (
          <LeilaoDetail
            lote={leiloes[currentIndex]}
            index={currentIndex}
            token={token}
            total={leiloes.length}
            onChangeIndex={(i) => {
              if (i < 0 || i >= leiloes.length) return;
              setCurrentIndex(i);
            }}
          />
        )}
        {token && view === "new" && <ImovelForm onSave={handleSaveImovel} />}
      </div>
  );
}

export default App

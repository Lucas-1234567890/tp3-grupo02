import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const BASE_URL = "http://ec2-3-20-227-42.us-east-2.compute.amazonaws.com:3000";

export default function LeilaoDetail({ lote, index, total, onChangeIndex}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lotes, setLotes] = useState(null);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  const [rubber, setRubber] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (eventData.absX > window.innerWidth * 0.15) {
        if (index + 1 >= total) {
          // elastic effect
          setRubber(true);
          setTimeout(() => setRubber(false), 200);
        } else {
          onChangeIndex(index + 1);
        }
      }
    },
    onSwipedRight: (eventData) => {
      if (eventData.absX > window.innerWidth * 0.15) {
        if (index - 1 < 0) {
          setRubber(true);
          setTimeout(() => setRubber(false), 200);
        } else {
          onChangeIndex(index - 1);
        }
      }
    },
    delta: 10, // minimum distance
    preventScrollOnSwipe: true,
    trackMouse: true,
  });


  if (!lote) return null;

  return (
    <div {...handlers} className={"container" + (rubber ? " rubber" : "")}>
      <div className="card">
        <h2>{`Veículo ${index + 1}`}</h2>
        <p>{'Alagamento: ' + (lote.alagamento || "Não informado")}</p>
        <p>{'Ano de Fabricação: ' + (lote.ano_fabricacao || "Não informado")}</p>
        <p>{'Ano do Modelo: ' + (lote.ano_modelo || "Não informado")}</p>
        <p>{'AR: ' + (lote.ar ? "Sim" : "Não")}</p>
        <p>{'Automático: ' + (lote.automatico ? "Sim" : "Não")}</p>
        <p>{'Blindagem: ' + (lote.blindagem ? "Sim" : "Não")}</p>
        <p>{'Câmbio Obstruído: ' + (lote.cambio_obstruido ? "Sim" : "Não")}</p>
        <p>{'Câmbio Periciado: ' + (lote.cambio_periciado ? "Sim" : "Não")}</p>
        <p>{'Chassi Oxidação: ' + (lote.chassi_oxidacao ? "Sim" : "Não")}</p>
        <p>{'Chave: ' + (lote.chave || "Não informado")}</p>
        <p>{'Cidade Documento: ' + (lote.cidade_documento || "Não informado")}</p>
        <p>{'Combustível: ' + (lote.combustivel || "Não informado")}</p>
        <p>{'Consta Blindagem: ' + (lote.consta_blindagem ? "Sim" : "Não")}</p>
        <p>{'Consta CRLVE: ' + (lote.consta_crlve ? "Sim" : "Não")}</p>
        <p>{'Consta Sinistro Documento: ' + (lote.consta_sinistro_documento ? "Sim" : "Não")}</p>
        <p>{'Direção: ' + (lote.direcao || "Não informado")}</p>
        <p>{'Doc Blindagem: ' + (lote.doc_blindagem || "Não informado")}</p>
        <p>{'Documento GNV: ' + (lote.documento_gnv || "Não informado")}</p>
        <p>{'Emissão Laudo CSV: ' + (lote.emissao_laudo_csv || "Não informado")}</p>
        <p>{'Estepe: ' + (lote.estepe ? "Sim" : "Não")}</p>
        <p>{'ID: ' + (lote.id || "Não informado")}</p>
        <p>{'IPVA Pago: ' + (lote.ipva_pago ? "Sim" : "Não")}</p>
        <p>{'Kit Gás: ' + (lote.kit_gas ? "Sim" : "Não")}</p>
        <p>{'KM: ' + (lote.km || "Não informado")}</p>
        <p>{'Lance: ' + (lote.lance || "Não informado")}</p>
        <p>{'Leilão ID: ' + (lote.leilao_id || "Não informado")}</p>
        <p>{'Ligando: ' + (lote.ligando ? "Sim" : "Não")}</p>
        <p>{'Manual Proprietário: ' + (lote.manual_proprietario || "Não informado")}</p>
        <p>{'Marca: ' + (lote.marca || "Não informado")}</p>
        <p>{'Modelo: ' + (lote.modelo || "Não informado")}</p>
        <p>{'Outro Estado Documento: ' + (lote.outro_estado_documento || "Não informado")}</p>
        <p>{'Parabrisa Original: ' + (lote.parabrisa_original ? "Sim" : "Não")}</p>
        <p>{'Placa Diverge Documento: ' + (lote.placa_diverge_documento ? "Sim" : "Não")}</p>
        <p>{'Tipo: ' + (lote.tipo || "Não informado")}</p>
        <p>{'Tipo Veículo: ' + (lote.tipo_veiculo || "Não informado")}</p>
        <p>{'Valor Inicial: R$ ' + (lote.valor_inicial || "0")}</p>
        <p>{'Vidro Elétrico: ' + (lote.vidro_eletrico ? "Sim" : "Não")}</p>
        <p>{'Vidro Traseiro Original: ' + (lote.vidro_traseiro_original ? "Sim" : "Não")}</p>

        <p>{`Data: ${lote.data || "Data: sem informação"}`}</p>
        <p>Valor atual: R$ {lote.valor_atual || "0"}</p>
        <div className="sticky-footer">
          <button disabled={!isOnline} onClick={() => alert("Lance registrado")}>Dar Lance</button>
          {!isOnline && <p style={{color:'#888', marginTop:'4px'}}>Conexão necessária para lances</p>}
        </div>
      </div>
      <p>{index + 1} de {total}</p>
    </div>
  );
}

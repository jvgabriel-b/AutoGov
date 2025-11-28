import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, GeoJSON, Circle, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Map as MapIcon,
  Layers,
  AlertTriangle,
  Home,
  Construction
} from 'lucide-react';

// --- CONFIGURAÇÃO DE ÍCONES (FIX DO LEAFLET) ---
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Ícone Padrão (Azul - Obras)
const ConstructionIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Ícone de Alerta (Vermelho - Risco)
const RiskIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// --- MOCK DATA GENERATOR (GERADOR DE DADOS SIMULADOS) ---
// Gera pontos aleatórios ao redor de um centro para simular manchas (favelas/núcleos)
const generateCluster = (centerLat: number, centerLng: number, count: number, radius: number) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      lat: centerLat + (Math.random() - 0.5) * radius,
      lng: centerLng + (Math.random() - 0.5) * radius,
      intensity: Math.random()
    });
  }
  return points;
};

// 1. Dados de Déficit Habitacional (Favelas/Núcleos) - Zonas densas
const deficitPoints = [
  ...generateCluster(-23.6149, -46.7325, 40, 0.02), // Paraisópolis
  ...generateCluster(-23.6000, -46.5800, 50, 0.025), // Heliópolis
  ...generateCluster(-23.5915, -46.4012, 30, 0.03), // Cid Tiradentes
  ...generateCluster(-23.6968, -46.7684, 35, 0.03), // Jd Angela
  ...generateCluster(-23.4500, -46.6000, 25, 0.02), // Brasilândia/Norte
];

// 2. Projetos de Habitação (Obras Reais)
const housingProjects = [
  { id: 1, lat: -23.5489, lng: -46.6388, name: 'Retrofit Centro (Ed. Prestes Maia)', status: '85% Concluído', units: 120 },
  { id: 2, lat: -23.5915, lng: -46.4012, name: 'Cj. Habitacional Tiradentes IV', status: 'Terraplanagem', units: 450 },
  { id: 3, lat: -23.6500, lng: -46.7000, name: 'Urbanização Cantinho do Céu', status: 'Em Andamento', units: 800 },
  { id: 4, lat: -23.5200, lng: -46.3800, name: 'MCMV Itaquera - Gleba A', status: 'Licitação', units: 1200 },
];

// 3. Pontos de Risco Geológico (Críticos)
const riskSpots = [
  { id: 1, lat: -23.7200, lng: -46.7500, level: 'R4 - Muito Alto', type: 'Deslizamento' },
  { id: 2, lat: -23.4300, lng: -46.7000, level: 'R3 - Alto', type: 'Deslizamento' },
  { id: 3, lat: -23.5000, lng: -46.4500, level: 'R3 - Alto', type: 'Enchente/Várzea' },
];

export function Territorial() {
  const [macrozoneData, setMacrozoneData] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState(true);
  
  // Controle de Camadas (Todas ativas por padrão)
  const [layers, setLayers] = useState({
    macrozona: true,
    deficit: true, // Heatmap
    risco: true,
    obras: true
  });

  useEffect(() => {
    // Fetch do GeoJSON que você forneceu
    fetch('http://nucleo-digital.github.io/sp-mapas/01_Macrozona_Estruturacao_Qualificacao_Urbana.geojson')
      .then(response => response.json())
      .then(data => {
        setMacrozoneData(data);
        setLoadingMap(false);
      })
      .catch(err => console.error("Erro GeoJSON:", err));
  }, []);

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-teal-600" />
            Mapeamento Habitacional
          </h2>
          <p className="text-sm text-slate-500">Contexto: Macrozonas e Assentamentos Precários</p>
        </div>
        
        {/* CONTROLE DE CAMADAS */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          
          <button 
            onClick={() => toggleLayer('macrozona')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 border ${layers.macrozona ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
          >
            <Layers className="w-3 h-3" /> Macrozonas (Zoneamento)
          </button>

          <button 
            onClick={() => toggleLayer('deficit')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 border ${layers.deficit ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
          >
            <Home className="w-3 h-3" /> Assentamentos Precários
          </button>

          <button 
            onClick={() => toggleLayer('risco')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 border ${layers.risco ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
          >
            <AlertTriangle className="w-3 h-3" /> Risco (R3/R4)
          </button>

          <button 
            onClick={() => toggleLayer('obras')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 border ${layers.obras ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
          >
            <Construction className="w-3 h-3" /> Obras
          </button>

        </div>
      </div>

      {/* --- MAPA --- */}
      <div className="relative flex-1 rounded-xl overflow-hidden border border-slate-300 shadow-2xl z-0 bg-slate-900">
        
        <MapContainer 
          center={[-23.62, -46.63]} // Foco levemente na Zona Sul (mais dados)
          zoom={11} 
          scrollWheelZoom={true} 
          className="h-full w-full z-0"
        >
          {/* BASE ESCURA (Dark Matter) - Melhor para contrastar com os dados coloridos */}
          <TileLayer
            attribution='&copy; CartoDB'
            url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/*  CAMADA: MACROZONAS (GeoJSON do Usuário) */}
          {!loadingMap && macrozoneData && layers.macrozona && (
            <GeoJSON 
              data={macrozoneData}
              style={() => ({
                color: '#2dd4bf',       
                weight: 1,              
                fillColor: '#2dd4bf',
                fillOpacity: 0.05,      
                dashArray: '4, 4'
              })}
              onEachFeature={(feature, layer) => {
                // Tenta pegar o nome da zona se existir nas properties
                const nome = feature.properties?.nome || feature.properties?.NAME || "Macrozona de Estruturação";
                layer.bindPopup(`<strong>Zoneamento:</strong><br/>${nome}`);
              }}
            />
          )}

          {/*  CAMADA: HEATMAP DE DÉFICIT (Assentamentos Precários) */}
          {layers.deficit && deficitPoints.map((pt, idx) => (
            <Circle
              key={`def-${idx}`}
              center={[pt.lat, pt.lng]}
              radius={300 + (pt.intensity * 200)} 
              pathOptions={{ 
                color: 'transparent', 
                fillColor: '#f97316', 
                fillOpacity: 0.3     
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span className="text-xs font-bold text-orange-600">Alta Densidade Habitacional</span>
              </Tooltip>
            </Circle>
          ))}

          {/*  CAMADA: ÁREAS DE RISCO (Pulsando) */}
          {layers.risco && riskSpots.map((risk) => (
            <Marker 
              key={`risk-${risk.id}`} 
              position={[risk.lat, risk.lng]}
              icon={RiskIcon}
            >
              <Popup>
                <div className="p-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    Área de Risco
                  </div>
                  <div className="text-sm text-slate-700">
                    <strong>Grau:</strong> {risk.level}<br/>
                    <strong>Tipo:</strong> {risk.type}<br/>
                    <button className="mt-2 text-xs bg-red-100 text-blue-700 px-2 py-1 rounded w-full hover:bg-blue-200">
                      Ver Laudo Defesa Civil
                    </button>
                  </div>
                </div>
              </Popup>
              {/* Círculo de alerta em volta */}
              <Circle 
                center={[risk.lat, risk.lng]} 
                radius={500} 
                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.1 }} 
              />
            </Marker>
          ))}

          {/*  CAMADA: OBRAS E PROJETOS */}
          {layers.obras && housingProjects.map((proj) => (
            <Marker 
              key={`proj-${proj.id}`} 
              position={[proj.lat, proj.lng]}
              icon={ConstructionIcon}
            >
              <Popup>
                <div className="p-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                    <Construction className="w-4 h-4" />
                    Empreendimento Social
                  </div>
                  <div className="text-sm text-slate-700 space-y-1">
                    <div className="font-medium text-slate-900">{proj.name}</div>
                    <div><strong>Status:</strong> {proj.status}</div>
                    <div><strong>Unidades:</strong> {proj.units} UH</div>
                    <div className="h-1 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
        
        {/* LOADING SPINNER */}
        {loadingMap && (
          <div className="absolute inset-0 z-[500] bg-slate-900/50 backdrop-blur flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium text-slate-800">
              <div className="w-4 h-4 border-2 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>
              Processando GeoJSON...
            </div>
          </div>
        )}

        {/* LEGENDA FLUTUANTE */}
        <div className="absolute bottom-6 right-6 z-[400] bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-700 w-64">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-700 pb-2">Indicadores Territoriais</h4>
          <div className="space-y-3">
            
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-4 h-4 mt-0.5 border border-teal-500 bg-teal-500/20 rounded-sm shrink-0"></div>
              <div>
                <span className="font-bold text-teal-400 block">Macrozonas</span>
                <span className="text-slate-500 text-[10px]">Áreas de qualificação urbana (GeoJSON)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-4 h-4 mt-0.5 bg-orange-500/50 rounded-full blur-[1px] shrink-0"></div>
              <div>
                <span className="font-bold text-orange-400 block">Assentamentos Precários</span>
                <span className="text-slate-500 text-[10px]">Alta vulnerabilidade social</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <AlertTriangle className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="font-bold text-red-400 block">Risco Geológico</span>
                <span className="text-slate-500 text-[10px]">Áreas R3 e R4 (Monitoradas)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <Construction className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="font-bold text-blue-400 block">Obras Públicas</span>
                <span className="text-slate-500 text-[10px]">HIS e Urbanização</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
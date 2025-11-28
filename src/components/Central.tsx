import {
  Server,
  ShieldCheck,
  Activity,
  HardDrive,
  Globe,
  Database,
  Router,
  Terminal,
  MoreHorizontal
} from 'lucide-react';

// Dados simulados das máquinas específicas do seu contexto
const machines = [
  { 
    id: 'srv-01', 
    name: 'SRV-CORE-01 (Principal)', 
    role: 'Orquestrador & API', 
    icon: Server,
    status: 'online', 
    uptime: '45d 12h',
    cpu: 42, 
    ram: 64,
    disk: 55,
    ip: '10.0.1.15'
  },
  { 
    id: 'db-01', 
    name: 'SRV-DATA-01 (Dados)', 
    role: 'PostgreSQL Cluster', 
    icon: Database, 
    status: 'online', 
    uptime: '120d 04h',
    cpu: 28, 
    ram: 88, // Banco de dados consome muita RAM
    disk: 72,
    ip: '10.0.1.20'
  },
  {
    id: 'gw-01',
    name: 'SRV-SEC-01 (Segurança)',
    role: 'Firewall & Gateway',
    icon: ShieldCheck,
    status: 'warning', // Simulando um alerta visual
    uptime: '12d 01h',
    cpu: 85, // Carga alta simulada
    ram: 32,
    disk: 15,
    ip: '192.168.0.1'
  },
  { 
    id: 'gis-01', 
    name: 'SRV-GIS-WORKER', 
    role: 'Processamento Territorial', 
    icon: Globe, 
    status: 'online', 
    uptime: '05d 22h',
    cpu: 12, 
    ram: 45,
    disk: 30,
    ip: '10.0.2.55'
  }
];

// Componente auxiliar para barra de progresso colorida
const ProgressBar = ({ value, colorClass }: { value: number, colorClass?: string }) => {
  // Define cor baseada no valor se não for passada uma classe
  let bgClass = 'bg-teal-500';
  if (!colorClass) {
    if (value > 80) bgClass = 'bg-blue-500';
    else if (value > 60) bgClass = 'bg-yellow-500';
  } else {
    bgClass = colorClass;
  }

  return (
    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
      <div 
        className={`${bgClass} h-full rounded-full transition-all duration-1000`} 
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export function Central() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Topo: Cards KPI (Mantive pois dão um resumo excelente) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 h-full w-1 bg-teal-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Saúde do Cluster</p>
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                Estável
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
              </h3>
            </div>
            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Requisições/seg</p>
              <h3 className="text-2xl font-bold text-slate-800">2.4k</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Router className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-purple-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Storage Total</p>
              <h3 className="text-2xl font-bold text-slate-800">12TB / 50TB</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <HardDrive className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Lista de Máquinas (NOVO) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" />
            Infraestrutura de Servidores (Nodes)
          </h3>
          <button className="text-xs font-medium text-teal-600 hover:underline">Gerenciar Cluster →</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-medium">Máquina / Host</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium w-32">CPU</th>
                <th className="px-6 py-3 font-medium w-32">Memória</th>
                <th className="px-6 py-3 font-medium w-32">Disco</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {machines.map((machine) => (
                <tr key={machine.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${machine.status === 'online' ? 'bg-slate-100 text-slate-600' : 'bg-yellow-50 text-yellow-600'}`}>
                        <machine.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{machine.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{machine.ip} • {machine.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {machine.status === 'online' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Online
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                        Carga Alta
                      </span>
                    )}
                    <div className="text-[10px] text-slate-400 mt-1 pl-2">Up: {machine.uptime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="text-slate-600 font-medium">{machine.cpu}%</span>
                    </div>
                    <ProgressBar value={machine.cpu} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="text-slate-600 font-medium">{machine.ram}%</span>
                    </div>
                    <ProgressBar value={machine.ram} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="text-slate-600 font-medium">{machine.disk}%</span>
                    </div>
                    <ProgressBar value={machine.disk} colorClass="bg-slate-400" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Terminal de Logs (Live) */}
      <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-800">
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-500" />
            <span className="text-xs font-mono font-bold text-slate-300 tracking-wider">SYSTEM_LOGS // ANGERONA-GATEWAY</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20 border border-blue-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>
        <div className="p-4 font-mono text-xs space-y-1.5 overflow-y-auto h-48 text-slate-400 bg-slate-900/50">
          <div className="flex gap-2">
            <span className="text-slate-600">[14:00:01]</span>
            <span className="text-blue-400">INFO</span>
            <span>SRV-CORE-01 health check passed (2ms).</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-600">[14:00:45]</span>
            <span className="text-teal-400">SUCCESS</span>
            <span>Backup routine started on SRV-DATA-01. Target: AWS S3.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-600">[14:01:22]</span>
            <span className="text-yellow-500">WARN</span>
            <span className="text-yellow-100">SRV-SEC-01 (Segurança) high CPU usage detected (85%). Throttling non-essential packets.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-600">[14:02:10]</span>
            <span className="text-blue-400">AUTH</span>
            <span>User 'admin' failed login attempt from 192.168.1.55 (Bad Credentials).</span>
          </div>
          <div className="flex gap-2 animate-pulse">
            <span className="text-teal-500">➜</span>
            <span className="text-slate-200">Monitoring active connections...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
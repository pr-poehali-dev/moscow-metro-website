import { useState } from 'react';
import { metroLines, metroStations } from '@/lib/metro-data';
import { Card } from '@/components/ui/card';

interface InteractiveMetroMapProps {
  selectedFrom?: string;
  selectedTo?: string;
  onStationClick: (stationId: string) => void;
  routePath?: string[];
}

export default function InteractiveMetroMap({ 
  selectedFrom, 
  selectedTo, 
  onStationClick,
  routePath = []
}: InteractiveMetroMapProps) {
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  const stationPositions: Record<string, { x: number; y: number }> = {
    'sokolnicheskaya-1': { x: 300, y: 200 },
    'sokolnicheskaya-2': { x: 350, y: 200 },
    'sokolnicheskaya-3': { x: 400, y: 200 },
    'sokolnicheskaya-4': { x: 450, y: 200 },
    
    'zamoskvoretskaya-1': { x: 400, y: 100 },
    'zamoskvoretskaya-2': { x: 400, y: 150 },
    'zamoskvoretskaya-3': { x: 400, y: 200 },
    'zamoskvoretskaya-4': { x: 400, y: 250 },
    'zamoskvoretskaya-5': { x: 400, y: 300 },
    
    'arbatsko-pokrovskaya-1': { x: 200, y: 200 },
    'arbatsko-pokrovskaya-2': { x: 250, y: 200 },
    'arbatsko-pokrovskaya-3': { x: 300, y: 200 },
    'arbatsko-pokrovskaya-4': { x: 350, y: 200 },
    'arbatsko-pokrovskaya-5': { x: 500, y: 200 },
    
    'filevskaya-1': { x: 150, y: 250 },
    'filevskaya-2': { x: 200, y: 250 },
    'filevskaya-3': { x: 250, y: 250 },
    'filevskaya-4': { x: 300, y: 250 },
    
    'koltsevaya-1': { x: 350, y: 150 },
    'koltsevaya-2': { x: 450, y: 150 },
    'koltsevaya-3': { x: 450, y: 250 },
    'koltsevaya-4': { x: 350, y: 250 },
    
    'kaluzhsko-rizhskaya-1': { x: 350, y: 100 },
    'kaluzhsko-rizhskaya-2': { x: 350, y: 150 },
    'kaluzhsko-rizhskaya-3': { x: 350, y: 200 },
    'kaluzhsko-rizhskaya-4': { x: 350, y: 300 },
    
    'tagansko-krasnopresnenskaya-1': { x: 300, y: 150 },
    'tagansko-krasnopresnenskaya-2': { x: 350, y: 150 },
    'tagansko-krasnopresnenskaya-3': { x: 400, y: 150 },
    'tagansko-krasnopresnenskaya-4': { x: 450, y: 150 },
    'tagansko-krasnopresnenskaya-5': { x: 500, y: 150 },
    
    'kalininskaya-1': { x: 450, y: 250 },
    'kalininskaya-2': { x: 500, y: 250 },
  };

  const getStationColor = (stationId: string) => {
    const station = metroStations.find(s => s.id === stationId);
    if (!station) return '#666';
    const line = metroLines.find(l => l.id === station.lineId);
    return line?.color || '#666';
  };

  const isStationInRoute = (stationId: string) => {
    return routePath.includes(stationId);
  };

  const isStationSelected = (stationId: string) => {
    return stationId === selectedFrom || stationId === selectedTo;
  };

  return (
    <Card className="p-6 bg-white">
      <div className="relative overflow-auto">
        <svg 
          viewBox="0 0 650 400" 
          className="w-full h-auto min-h-[400px]"
          style={{ maxWidth: '100%' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {metroLines.map(line => {
            const lineStations = metroStations
              .filter(s => s.lineId === line.id)
              .map(s => stationPositions[s.id])
              .filter(Boolean);

            if (lineStations.length < 2) return null;

            return (
              <g key={line.id}>
                {lineStations.map((pos, idx) => {
                  if (idx === lineStations.length - 1) return null;
                  const nextPos = lineStations[idx + 1];
                  return (
                    <line
                      key={`${line.id}-${idx}`}
                      x1={pos.x}
                      y1={pos.y}
                      x2={nextPos.x}
                      y2={nextPos.y}
                      stroke={line.color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  );
                })}
              </g>
            );
          })}

          {routePath.length > 1 && routePath.map((stationId, idx) => {
            if (idx === routePath.length - 1) return null;
            const currentPos = stationPositions[stationId];
            const nextPos = stationPositions[routePath[idx + 1]];
            
            if (!currentPos || !nextPos) return null;

            return (
              <line
                key={`route-${idx}`}
                x1={currentPos.x}
                y1={currentPos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke="#DC2626"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8,4"
                opacity="0.9"
                className="animate-pulse"
                filter="url(#glow)"
              />
            );
          })}

          {metroStations.map(station => {
            const pos = stationPositions[station.id];
            if (!pos) return null;

            const isHovered = hoveredStation === station.id;
            const isSelected = isStationSelected(station.id);
            const isInRoute = isStationInRoute(station.id);

            return (
              <g 
                key={station.id}
                onMouseEnter={() => setHoveredStation(station.id)}
                onMouseLeave={() => setHoveredStation(null)}
                onClick={() => onStationClick(station.id)}
                className="cursor-pointer transition-all"
                style={{ transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}
              >
                {isInRoute && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="14"
                    fill="#DC2626"
                    opacity="0.3"
                    className="animate-ping"
                  />
                )}
                
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? "12" : isInRoute ? "10" : "8"}
                  fill={isSelected ? "#DC2626" : "white"}
                  stroke={getStationColor(station.id)}
                  strokeWidth={isSelected || isInRoute ? "4" : "3"}
                  filter={isSelected || isInRoute ? "url(#glow)" : undefined}
                />

                {station.hasTransfer && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    fill="white"
                    stroke={getStationColor(station.id)}
                    strokeWidth="2"
                  />
                )}

                {(isHovered || isSelected) && (
                  <g>
                    <rect
                      x={pos.x - 60}
                      y={pos.y - 40}
                      width="120"
                      height="30"
                      rx="4"
                      fill="white"
                      stroke={getStationColor(station.id)}
                      strokeWidth="2"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 20}
                      textAnchor="middle"
                      className="text-xs font-medium"
                      fill="#1f2937"
                    >
                      {station.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {metroLines.map(line => (
          <div key={line.id} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: line.color }}
            />
            <span className="text-xs text-gray-700">{line.number} {line.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Кликните на станцию, чтобы выбрать её в маршруте</p>
        {selectedFrom && selectedTo && routePath.length > 0 && (
          <p className="mt-2 text-red-600 font-medium animate-fade-in">
            Построен маршрут через {routePath.length} станций
          </p>
        )}
      </div>
    </Card>
  );
}

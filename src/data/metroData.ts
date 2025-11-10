import { metroLines as allMetroLines, metroStations as allMetroStations } from '@/lib/metro-data';
import type { MetroLine, MetroStation } from '@/lib/metro-data';

export interface Station {
  id: string;
  name: string;
  lineId: string;
  order: number;
  openTime: string;
  closeTime: string;
  hasTransfer: boolean;
  transferTo?: string[];
}

export interface Line {
  id: string;
  name: string;
  color: string;
  number: string;
}

export const metroLines: Line[] = allMetroLines;

export const stations: Station[] = allMetroStations.map(station => ({
  ...station,
  openTime: '05:30',
  closeTime: '01:00'
}));

export interface Route {
  stations: Station[];
  totalTime: number;
  transfers: number;
}

interface GraphNode {
  stationId: string;
  distance: number;
  path: Station[];
  transfers: number;
}

export const calculateRoute = (fromStationId: string, toStationId: string): Route | null => {
  const fromStation = stations.find(s => s.id === fromStationId);
  const toStation = stations.find(s => s.id === toStationId);
  
  if (!fromStation || !toStation) return null;
  
  if (fromStation.id === toStation.id) {
    return {
      stations: [fromStation],
      totalTime: 0,
      transfers: 0
    };
  }

  if (fromStation.lineId === toStation.lineId) {
    const lineStations = stations
      .filter(s => s.lineId === fromStation.lineId)
      .sort((a, b) => a.order - b.order);
    
    const fromIndex = lineStations.findIndex(s => s.id === fromStationId);
    const toIndex = lineStations.findIndex(s => s.id === toStationId);
    
    if (fromIndex === -1 || toIndex === -1) return null;
    
    const routeStations = fromIndex < toIndex 
      ? lineStations.slice(fromIndex, toIndex + 1)
      : lineStations.slice(toIndex, fromIndex + 1).reverse();
    
    return {
      stations: routeStations,
      totalTime: Math.abs(toIndex - fromIndex) * 2,
      transfers: 0
    };
  }

  const visited = new Set<string>();
  const queue: GraphNode[] = [{
    stationId: fromStationId,
    distance: 0,
    path: [fromStation],
    transfers: 0
  }];

  while (queue.length > 0) {
    queue.sort((a, b) => {
      if (a.transfers !== b.transfers) return a.transfers - b.transfers;
      return a.distance - b.distance;
    });

    const current = queue.shift()!;
    
    if (current.stationId === toStationId) {
      return {
        stations: current.path,
        totalTime: current.distance,
        transfers: current.transfers
      };
    }

    if (visited.has(current.stationId)) continue;
    visited.add(current.stationId);

    const currentStation = stations.find(s => s.id === current.stationId)!;
    
    const lineStations = stations
      .filter(s => s.lineId === currentStation.lineId)
      .sort((a, b) => a.order - b.order);
    
    const currentIndex = lineStations.findIndex(s => s.id === current.stationId);
    
    if (currentIndex > 0) {
      const prevStation = lineStations[currentIndex - 1];
      if (!visited.has(prevStation.id)) {
        queue.push({
          stationId: prevStation.id,
          distance: current.distance + 2,
          path: [...current.path, prevStation],
          transfers: current.transfers
        });
      }
    }
    
    if (currentIndex < lineStations.length - 1) {
      const nextStation = lineStations[currentIndex + 1];
      if (!visited.has(nextStation.id)) {
        queue.push({
          stationId: nextStation.id,
          distance: current.distance + 2,
          path: [...current.path, nextStation],
          transfers: current.transfers
        });
      }
    }

    if (currentStation.hasTransfer && currentStation.transferTo) {
      for (const transferLineId of currentStation.transferTo) {
        const transferStations = stations.filter(s => 
          s.lineId === transferLineId && 
          (s.name === currentStation.name || 
           (s.hasTransfer && s.transferTo?.includes(currentStation.lineId)))
        );
        
        for (const transferStation of transferStations) {
          if (!visited.has(transferStation.id)) {
            queue.push({
              stationId: transferStation.id,
              distance: current.distance + 5,
              path: [...current.path, transferStation],
              transfers: current.transfers + 1
            });
          }
        }
      }
    }
  }

  return {
    stations: [fromStation, toStation],
    totalTime: 30,
    transfers: 2
  };
};

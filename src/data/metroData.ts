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

export const metroLines: Line[] = [
  { id: 'red', name: 'Сокольническая', color: '#E4002B', number: '1' },
  { id: 'green', name: 'Замоскворецкая', color: '#2DBE2C', number: '2' },
  { id: 'blue', name: 'Арбатско-Покровская', color: '#0078C9', number: '3' },
  { id: 'lightblue', name: 'Филёвская', color: '#19C1F3', number: '4' },
  { id: 'brown', name: 'Кольцевая', color: '#894E35', number: '5' },
  { id: 'orange', name: 'Калужско-Рижская', color: '#F58631', number: '6' },
  { id: 'purple', name: 'Таганско-Краснопресненская', color: '#8E479C', number: '7' },
  { id: 'yellow', name: 'Калининская', color: '#FFCD1C', number: '8' },
  { id: 'grey', name: 'Серпуховско-Тимирязевская', color: '#A1A2A3', number: '9' },
  { id: 'lime', name: 'Люблинско-Дмитровская', color: '#B3D445', number: '10' },
  { id: 'turquoise', name: 'Большая кольцевая', color: '#79CDCD', number: '11' },
  { id: 'pink', name: 'Некрасовская', color: '#DE64A1', number: '15' }
];

export const stations: Station[] = [
  { id: 's1', name: 'Охотный ряд', lineId: 'red', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown', 'green'] },
  { id: 's2', name: 'Библиотека имени Ленина', lineId: 'red', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['blue', 'grey'] },
  { id: 's3', name: 'Кропоткинская', lineId: 'red', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's4', name: 'Парк культуры', lineId: 'red', order: 4, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown'] },
  { id: 's5', name: 'Фрунзенская', lineId: 'red', order: 5, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  
  { id: 's6', name: 'Театральная', lineId: 'green', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['red', 'brown'] },
  { id: 's7', name: 'Новокузнецкая', lineId: 'green', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown'] },
  { id: 's8', name: 'Павелецкая', lineId: 'green', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown'] },
  { id: 's9', name: 'Автозаводская', lineId: 'green', order: 4, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  
  { id: 's10', name: 'Площадь Революции', lineId: 'blue', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['red', 'brown'] },
  { id: 's11', name: 'Курская', lineId: 'blue', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown'] },
  { id: 's12', name: 'Бауманская', lineId: 'blue', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's13', name: 'Электрозаводская', lineId: 'blue', order: 4, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  
  { id: 's14', name: 'Киевская', lineId: 'lightblue', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown', 'blue'] },
  { id: 's15', name: 'Смоленская', lineId: 'lightblue', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['blue'] },
  { id: 's16', name: 'Арбатская', lineId: 'lightblue', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['blue', 'grey'] },
  
  { id: 's17', name: 'Комсомольская', lineId: 'brown', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['red'] },
  { id: 's18', name: 'Курская', lineId: 'brown', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['blue'] },
  { id: 's19', name: 'Таганская', lineId: 'brown', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['purple'] },
  { id: 's20', name: 'Павелецкая', lineId: 'brown', order: 4, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['green'] },
  { id: 's21', name: 'Добрынинская', lineId: 'brown', order: 5, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['grey'] },
  { id: 's22', name: 'Октябрьская', lineId: 'brown', order: 6, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['orange'] },
  { id: 's23', name: 'Парк культуры', lineId: 'brown', order: 7, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['red'] },
  { id: 's24', name: 'Киевская', lineId: 'brown', order: 8, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['lightblue'] },
  
  { id: 's25', name: 'Медведково', lineId: 'orange', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's26', name: 'Бабушкинская', lineId: 'orange', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's27', name: 'ВДНХ', lineId: 'orange', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's28', name: 'Проспект Мира', lineId: 'orange', order: 4, openTime: '05:30', closeTime: '01:00', hasTransfer: true, transferTo: ['brown'] },
  
  { id: 's29', name: 'Планерная', lineId: 'purple', order: 1, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's30', name: 'Сходненская', lineId: 'purple', order: 2, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's31', name: 'Тушинская', lineId: 'purple', order: 3, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
  { id: 's32', name: 'Щукинская', lineId: 'purple', order: 4, openTime: '05:30', closeTime: '01:00', hasTransfer: false },
];

export interface Route {
  stations: Station[];
  totalTime: number;
  transfers: number;
}

export const calculateRoute = (fromStationId: string, toStationId: string): Route | null => {
  const fromStation = stations.find(s => s.id === fromStationId);
  const toStation = stations.find(s => s.id === toStationId);
  
  if (!fromStation || !toStation) return null;
  
  if (fromStation.lineId === toStation.lineId) {
    const lineStations = stations
      .filter(s => s.lineId === fromStation.lineId)
      .sort((a, b) => a.order - b.order);
    
    const fromIndex = lineStations.findIndex(s => s.id === fromStationId);
    const toIndex = lineStations.findIndex(s => s.id === toStationId);
    
    const routeStations = fromIndex < toIndex 
      ? lineStations.slice(fromIndex, toIndex + 1)
      : lineStations.slice(toIndex, fromIndex + 1).reverse();
    
    return {
      stations: routeStations,
      totalTime: Math.abs(toIndex - fromIndex) * 2,
      transfers: 0
    };
  }
  
  const transferStation = stations.find(s => 
    s.lineId === fromStation.lineId && 
    s.hasTransfer && 
    s.transferTo?.includes(toStation.lineId)
  );
  
  if (transferStation) {
    const line1Stations = stations
      .filter(s => s.lineId === fromStation.lineId)
      .sort((a, b) => a.order - b.order);
    
    const line2Stations = stations
      .filter(s => s.lineId === toStation.lineId)
      .sort((a, b) => a.order - b.order);
    
    const fromIndex = line1Stations.findIndex(s => s.id === fromStationId);
    const transferIndex = line1Stations.findIndex(s => s.id === transferStation.id);
    const toIndex = line2Stations.findIndex(s => s.id === toStationId);
    const transferIndex2 = line2Stations.findIndex(s => s.name === transferStation.name);
    
    const segment1 = fromIndex < transferIndex
      ? line1Stations.slice(fromIndex, transferIndex + 1)
      : line1Stations.slice(transferIndex, fromIndex + 1).reverse();
    
    const segment2 = transferIndex2 < toIndex
      ? line2Stations.slice(transferIndex2 + 1, toIndex + 1)
      : line2Stations.slice(toIndex, transferIndex2).reverse();
    
    return {
      stations: [...segment1, ...segment2],
      totalTime: (segment1.length + segment2.length) * 2 + 5,
      transfers: 1
    };
  }
  
  return {
    stations: [fromStation, toStation],
    totalTime: 15,
    transfers: 1
  };
};

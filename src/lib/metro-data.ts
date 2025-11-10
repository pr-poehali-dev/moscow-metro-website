export interface MetroStation {
  id: string;
  name: string;
  lineId: string;
  hasTransfer: boolean;
  transferTo?: string[];
}

export interface MetroLine {
  id: string;
  name: string;
  color: string;
  number: string;
}

export const metroLines: MetroLine[] = [
  { id: 'sokolnicheskaya', name: 'Сокольническая', color: '#E4002B', number: '1' },
  { id: 'zamoskvoretskaya', name: 'Замоскворецкая', color: '#2DBE2C', number: '2' },
  { id: 'arbatsko-pokrovskaya', name: 'Арбатско-Покровская', color: '#0078C9', number: '3' },
  { id: 'filevskaya', name: 'Филёвская', color: '#19C1F3', number: '4' },
  { id: 'koltsevaya', name: 'Кольцевая', color: '#894E35', number: '5' },
  { id: 'kaluzhsko-rizhskaya', name: 'Калужско-Рижская', color: '#F58631', number: '6' },
  { id: 'tagansko-krasnopresnenskaya', name: 'Таганско-Краснопресненская', color: '#8E479C', number: '7' },
  { id: 'kalininskaya', name: 'Калининская', color: '#FFCD1C', number: '8' },
];

export const metroStations: MetroStation[] = [
  { id: 'sokolnicheskaya-1', name: 'Охотный ряд', lineId: 'sokolnicheskaya', hasTransfer: true, transferTo: ['zamoskvoretskaya', 'koltsevaya'] },
  { id: 'sokolnicheskaya-2', name: 'Библиотека им. Ленина', lineId: 'sokolnicheskaya', hasTransfer: true, transferTo: ['arbatsko-pokrovskaya'] },
  { id: 'sokolnicheskaya-3', name: 'Кропоткинская', lineId: 'sokolnicheskaya', hasTransfer: false },
  { id: 'sokolnicheskaya-4', name: 'Парк культуры', lineId: 'sokolnicheskaya', hasTransfer: true, transferTo: ['koltsevaya'] },
  
  { id: 'zamoskvoretskaya-1', name: 'Белорусская', lineId: 'zamoskvoretskaya', hasTransfer: true, transferTo: ['koltsevaya'] },
  { id: 'zamoskvoretskaya-2', name: 'Маяковская', lineId: 'zamoskvoretskaya', hasTransfer: false },
  { id: 'zamoskvoretskaya-3', name: 'Театральная', lineId: 'zamoskvoretskaya', hasTransfer: true, transferTo: ['sokolnicheskaya'] },
  { id: 'zamoskvoretskaya-4', name: 'Новокузнецкая', lineId: 'zamoskvoretskaya', hasTransfer: false },
  { id: 'zamoskvoretskaya-5', name: 'Павелецкая', lineId: 'zamoskvoretskaya', hasTransfer: true, transferTo: ['koltsevaya'] },
  
  { id: 'arbatsko-pokrovskaya-1', name: 'Пятницкое шоссе', lineId: 'arbatsko-pokrovskaya', hasTransfer: false },
  { id: 'arbatsko-pokrovskaya-2', name: 'Митино', lineId: 'arbatsko-pokrovskaya', hasTransfer: false },
  { id: 'arbatsko-pokrovskaya-3', name: 'Арбатская', lineId: 'arbatsko-pokrovskaya', hasTransfer: true, transferTo: ['filevskaya'] },
  { id: 'arbatsko-pokrovskaya-4', name: 'Площадь Революции', lineId: 'arbatsko-pokrovskaya', hasTransfer: true, transferTo: ['sokolnicheskaya'] },
  { id: 'arbatsko-pokrovskaya-5', name: 'Курская', lineId: 'arbatsko-pokrovskaya', hasTransfer: true, transferTo: ['koltsevaya'] },
  
  { id: 'filevskaya-1', name: 'Кунцевская', lineId: 'filevskaya', hasTransfer: false },
  { id: 'filevskaya-2', name: 'Пионерская', lineId: 'filevskaya', hasTransfer: false },
  { id: 'filevskaya-3', name: 'Филёвский парк', lineId: 'filevskaya', hasTransfer: false },
  { id: 'filevskaya-4', name: 'Смоленская', lineId: 'filevskaya', hasTransfer: true, transferTo: ['arbatsko-pokrovskaya'] },
  
  { id: 'koltsevaya-1', name: 'Киевская', lineId: 'koltsevaya', hasTransfer: true, transferTo: ['arbatsko-pokrovskaya'] },
  { id: 'koltsevaya-2', name: 'Краснопресненская', lineId: 'koltsevaya', hasTransfer: false },
  { id: 'koltsevaya-3', name: 'Комсомольская', lineId: 'koltsevaya', hasTransfer: false },
  { id: 'koltsevaya-4', name: 'Курская', lineId: 'koltsevaya', hasTransfer: true, transferTo: ['arbatsko-pokrovskaya'] },
  
  { id: 'kaluzhsko-rizhskaya-1', name: 'ВДНХ', lineId: 'kaluzhsko-rizhskaya', hasTransfer: false },
  { id: 'kaluzhsko-rizhskaya-2', name: 'Алексеевская', lineId: 'kaluzhsko-rizhskaya', hasTransfer: false },
  { id: 'kaluzhsko-rizhskaya-3', name: 'Третьяковская', lineId: 'kaluzhsko-rizhskaya', hasTransfer: false },
  { id: 'kaluzhsko-rizhskaya-4', name: 'Октябрьская', lineId: 'kaluzhsko-rizhskaya', hasTransfer: true, transferTo: ['koltsevaya'] },
  
  { id: 'tagansko-krasnopresnenskaya-1', name: 'Планерная', lineId: 'tagansko-krasnopresnenskaya', hasTransfer: false },
  { id: 'tagansko-krasnopresnenskaya-2', name: 'Сходненская', lineId: 'tagansko-krasnopresnenskaya', hasTransfer: false },
  { id: 'tagansko-krasnopresnenskaya-3', name: 'Пушкинская', lineId: 'tagansko-krasnopresnenskaya', hasTransfer: true, transferTo: ['zamoskvoretskaya'] },
  { id: 'tagansko-krasnopresnenskaya-4', name: 'Кузнецкий мост', lineId: 'tagansko-krasnopresnenskaya', hasTransfer: false },
  { id: 'tagansko-krasnopresnenskaya-5', name: 'Таганская', lineId: 'tagansko-krasnopresnenskaya', hasTransfer: true, transferTo: ['koltsevaya'] },
  
  { id: 'kalininskaya-1', name: 'Новокосино', lineId: 'kalininskaya', hasTransfer: false },
  { id: 'kalininskaya-2', name: 'Третьяковская', lineId: 'kalininskaya', hasTransfer: true, transferTo: ['kaluzhsko-rizhskaya'] },
];

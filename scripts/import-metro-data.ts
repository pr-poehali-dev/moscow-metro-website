import { metroLines, metroStations } from '../src/lib/metro-data';

const API_URL = 'https://functions.poehali.dev/9ec91258-742b-41c4-9735-af020ee61843';

async function importMetroData() {
  console.log('Starting metro data import...');
  
  const transfers = metroStations
    .filter(station => station.hasTransfer && station.transferTo)
    .map(station => ({
      stationId: station.id,
      transferTo: station.transferTo || []
    }));

  const payload = {
    lines: metroLines.map(line => ({
      id: line.id,
      name: line.name,
      number: line.number,
      color: line.color
    })),
    stations: metroStations.map(station => ({
      id: station.id,
      name: station.name,
      lineId: station.lineId,
      order: station.order,
      hasTransfer: station.hasTransfer
    })),
    transfers: transfers
  };

  console.log(`Importing ${payload.lines.length} lines, ${payload.stations.length} stations, ${transfers.length} transfer points...`);

  try {
    const response = await fetch(`${API_URL}?resource=bulk-import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Import completed successfully!');
      console.log(`Lines imported: ${result.lines_imported}`);
      console.log(`Stations imported: ${result.stations_imported}`);
      console.log(`Transfers imported: ${result.transfers_imported}`);
    } else {
      console.error('❌ Import failed:', result);
    }
  } catch (error) {
    console.error('❌ Error during import:', error);
  }
}

importMetroData();

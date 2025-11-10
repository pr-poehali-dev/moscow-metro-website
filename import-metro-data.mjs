import { metroLines, metroStations } from './src/lib/metro-data.ts';

const API_ENDPOINT = 'https://functions.poehali.dev/9ec91258-742b-41c4-9735-af020ee61843';

// Prepare the data in the required format
const lines = metroLines.map(line => ({
  id: line.id,
  name: line.name,
  number: line.number,
  color: line.color
}));

// Prepare stations
const stations = metroStations.map(station => ({
  id: station.id,
  name: station.name,
  lineId: station.lineId,
  order: station.order,
  hasTransfer: station.hasTransfer
}));

// Extract transfers
const transfers = metroStations
  .filter(station => station.hasTransfer && station.transferTo && station.transferTo.length > 0)
  .map(station => ({
    stationId: station.id,
    transferTo: station.transferTo
  }));

const payload = {
  lines,
  stations,
  transfers
};

console.log('Preparing to import metro data...');
console.log(`Lines: ${lines.length}`);
console.log(`Stations: ${stations.length}`);
console.log(`Transfers: ${transfers.length}`);
console.log('');

// Make the POST request
try {
  const response = await fetch(`${API_ENDPOINT}?resource=bulk-import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  const responseText = await response.text();
  
  console.log(`Response Status: ${response.status}`);
  console.log(`Response: ${responseText}`);
  
  if (response.ok) {
    try {
      const result = JSON.parse(responseText);
      console.log('\nImport Results:');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      console.log('\nRaw response:', responseText);
    }
  } else {
    console.error('Import failed with status:', response.status);
  }
} catch (error) {
  console.error('Error making API request:', error);
}

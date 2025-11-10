-- Создание таблицы линий метро
CREATE TABLE metro_lines (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    number VARCHAR(10) NOT NULL,
    color VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы станций метро
CREATE TABLE metro_stations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    line_id VARCHAR(50) NOT NULL,
    station_order INTEGER NOT NULL,
    has_transfer BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (line_id) REFERENCES metro_lines(id)
);

-- Создание таблицы пересадок между станциями
CREATE TABLE metro_transfers (
    id SERIAL PRIMARY KEY,
    station_id VARCHAR(50) NOT NULL,
    transfer_to_line_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (station_id) REFERENCES metro_stations(id),
    FOREIGN KEY (transfer_to_line_id) REFERENCES metro_lines(id)
);

-- Создание индексов для быстрого поиска
CREATE INDEX idx_stations_line_id ON metro_stations(line_id);
CREATE INDEX idx_stations_order ON metro_stations(station_order);
CREATE INDEX idx_transfers_station ON metro_transfers(station_id);
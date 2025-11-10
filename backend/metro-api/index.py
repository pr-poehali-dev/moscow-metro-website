import json
import os
import psycopg2
from typing import Dict, Any, List, Optional
from psycopg2.extras import RealDictCursor

def get_db_connection():
    '''Get database connection using DATABASE_URL'''
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления линиями и станциями московского метро
    Args: event - dict with httpMethod, body, queryStringParameters, pathParams
          context - object with request_id attribute
    Returns: HTTP response dict with statusCode, headers, body
    '''
    method: str = event.get('httpMethod', 'GET')
    path_params = event.get('pathParams', {})
    query_params = event.get('queryStringParameters', {})
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    
    try:
        if method == 'GET':
            resource = query_params.get('resource', 'lines')
            
            if resource == 'lines':
                return get_lines(conn)
            elif resource == 'stations':
                line_id = query_params.get('line_id')
                return get_stations(conn, line_id)
            elif resource == 'transfers':
                station_id = query_params.get('station_id')
                return get_transfers(conn, station_id)
            else:
                return error_response(404, 'Resource not found')
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            resource = query_params.get('resource', 'lines')
            
            if resource == 'lines':
                return create_line(conn, body_data)
            elif resource == 'stations':
                return create_station(conn, body_data)
            elif resource == 'transfers':
                return create_transfer(conn, body_data)
            elif resource == 'bulk-import':
                return bulk_import(conn, body_data)
            else:
                return error_response(404, 'Resource not found')
        
        elif method == 'DELETE':
            resource = query_params.get('resource')
            item_id = query_params.get('id')
            
            if resource == 'lines':
                return delete_line(conn, item_id)
            elif resource == 'stations':
                return delete_station(conn, item_id)
            else:
                return error_response(404, 'Resource not found')
        
        else:
            return error_response(405, 'Method not allowed')
    
    finally:
        conn.close()

def get_lines(conn) -> Dict[str, Any]:
    '''Получить все линии метро'''
    cur = conn.cursor()
    cur.execute('SELECT * FROM t_p77051504_moscow_metro_website.metro_lines ORDER BY number')
    lines = cur.fetchall()
    cur.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'lines': lines}, default=str)
    }

def get_stations(conn, line_id: Optional[str]) -> Dict[str, Any]:
    '''Получить станции (все или по линии)'''
    cur = conn.cursor()
    
    if line_id:
        cur.execute(
            'SELECT * FROM t_p77051504_moscow_metro_website.metro_stations WHERE line_id = %s ORDER BY station_order',
            (line_id,)
        )
    else:
        cur.execute('SELECT * FROM t_p77051504_moscow_metro_website.metro_stations ORDER BY line_id, station_order')
    
    stations = cur.fetchall()
    cur.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'stations': stations}, default=str)
    }

def get_transfers(conn, station_id: Optional[str]) -> Dict[str, Any]:
    '''Получить пересадки для станции'''
    cur = conn.cursor()
    
    if station_id:
        cur.execute(
            'SELECT * FROM t_p77051504_moscow_metro_website.metro_transfers WHERE station_id = %s',
            (station_id,)
        )
    else:
        cur.execute('SELECT * FROM t_p77051504_moscow_metro_website.metro_transfers')
    
    transfers = cur.fetchall()
    cur.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'transfers': transfers}, default=str)
    }

def create_line(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    '''Создать новую линию метро'''
    cur = conn.cursor()
    
    cur.execute(
        'INSERT INTO t_p77051504_moscow_metro_website.metro_lines (id, name, number, color) VALUES (%s, %s, %s, %s) RETURNING *',
        (data['id'], data['name'], data['number'], data['color'])
    )
    
    line = cur.fetchone()
    conn.commit()
    cur.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'line': line}, default=str)
    }

def create_station(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    '''Создать новую станцию метро'''
    cur = conn.cursor()
    
    cur.execute(
        'INSERT INTO t_p77051504_moscow_metro_website.metro_stations (id, name, line_id, station_order, has_transfer) VALUES (%s, %s, %s, %s, %s) RETURNING *',
        (data['id'], data['name'], data['line_id'], data['order'], data.get('has_transfer', False))
    )
    
    station = cur.fetchone()
    conn.commit()
    cur.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'station': station}, default=str)
    }

def create_transfer(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    '''Создать пересадку между станциями'''
    cur = conn.cursor()
    
    cur.execute(
        'INSERT INTO t_p77051504_moscow_metro_website.metro_transfers (station_id, transfer_to_line_id) VALUES (%s, %s) RETURNING *',
        (data['station_id'], data['transfer_to_line_id'])
    )
    
    transfer = cur.fetchone()
    conn.commit()
    cur.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'transfer': transfer}, default=str)
    }

def bulk_import(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    '''Массовый импорт линий и станций'''
    cur = conn.cursor()
    
    lines_data: List[Dict] = data.get('lines', [])
    stations_data: List[Dict] = data.get('stations', [])
    transfers_data: List[Dict] = data.get('transfers', [])
    
    lines_count = 0
    stations_count = 0
    transfers_count = 0
    
    for line in lines_data:
        cur.execute(
            'INSERT INTO t_p77051504_moscow_metro_website.metro_lines (id, name, number, color) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO NOTHING',
            (line['id'], line['name'], line['number'], line['color'])
        )
        lines_count += cur.rowcount
    
    for station in stations_data:
        cur.execute(
            'INSERT INTO t_p77051504_moscow_metro_website.metro_stations (id, name, line_id, station_order, has_transfer) VALUES (%s, %s, %s, %s, %s) ON CONFLICT (id) DO NOTHING',
            (station['id'], station['name'], station['lineId'], station['order'], station.get('hasTransfer', False))
        )
        stations_count += cur.rowcount
    
    for transfer in transfers_data:
        for transfer_to in transfer.get('transferTo', []):
            cur.execute(
                'INSERT INTO t_p77051504_moscow_metro_website.metro_transfers (station_id, transfer_to_line_id) VALUES (%s, %s)',
                (transfer['stationId'], transfer_to)
            )
            transfers_count += cur.rowcount
    
    conn.commit()
    cur.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'message': 'Import completed',
            'lines_imported': lines_count,
            'stations_imported': stations_count,
            'transfers_imported': transfers_count
        })
    }

def delete_line(conn, line_id: str) -> Dict[str, Any]:
    '''Удалить линию метро'''
    cur = conn.cursor()
    cur.execute('DELETE FROM t_p77051504_moscow_metro_website.metro_lines WHERE id = %s', (line_id,))
    conn.commit()
    cur.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'message': 'Line deleted'})
    }

def delete_station(conn, station_id: str) -> Dict[str, Any]:
    '''Удалить станцию метро'''
    cur = conn.cursor()
    cur.execute('DELETE FROM t_p77051504_moscow_metro_website.metro_stations WHERE id = %s', (station_id,))
    conn.commit()
    cur.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'message': 'Station deleted'})
    }

def error_response(status_code: int, message: str) -> Dict[str, Any]:
    '''Ответ с ошибкой'''
    return {
        'statusCode': status_code,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': message})
    }
import json
import os
import psycopg2
from typing import Dict, Any
from psycopg2.extras import RealDictCursor

def get_db_connection():
    '''Get database connection using DATABASE_URL'''
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: One-time data import from metro-data.ts into database
    Args: event - dict with httpMethod
          context - object with request_id attribute
    Returns: HTTP response with import results
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    lines_count = 0
    stations_count = 0
    transfers_count = 0
    
    try:
        lines_data = [
            ('sokolnicheskaya', 'Сокольническая', '1', '#E4002B'),
            ('zamoskvoretskaya', 'Замоскворецкая', '2', '#2DBE2C'),
            ('arbatsko-pokrovskaya', 'Арбатско-Покровская', '3', '#0078C9'),
            ('filevskaya', 'Филёвская', '4', '#19C1F3'),
            ('koltsevaya', 'Кольцевая', '5', '#894E35'),
            ('kaluzhsko-rizhskaya', 'Калужско-Рижская', '6', '#F58631'),
            ('tagansko-krasnopresnenskaya', 'Таганско-Краснопресненская', '7', '#8E479C'),
            ('kalininskaya', 'Калининская', '8', '#FFCD1C'),
            ('solntsevskaya', 'Солнцевская', '8А', '#FFD702'),
            ('serpukhovsko-timiryazevskaya', 'Серпуховско-Тимирязевская', '9', '#999999'),
            ('lyublinsko-dmitrovskaya', 'Люблинско-Дмитровская', '10', '#B3D445'),
            ('bolshaya-koltsevaya', 'Большая кольцевая', '11', '#82C0C0'),
            ('butovskaya', 'Бутовская', '12', '#ACB5BD'),
            ('monorail', 'Монорельс', '13', '#79CDCD'),
            ('mck', 'Московское центральное кольцо', '14', '#F59BBB'),
            ('nekrasovskaya', 'Некрасовская', '15', '#DE64A1'),
            ('troitskaya', 'Троицкая', '16', '#DD0000'),
            ('rublevo-arkhangelskaya', 'Рублево-Архангельская', '17', '#FFA8AF'),
            ('biryulevskaya', 'Бирюлевская', '18', '#A1E9E9'),
            ('d1', 'Белорусско-Савёловский диаметр', 'D1', '#F08521'),
            ('d2', 'Курско-Рижский диаметр', 'D2', '#D375B9'),
            ('d3', 'Ленинградско-Казанский диаметр', 'D3', '#11C0E7'),
            ('d4', 'Калужско-Нижегородский диаметр', 'D4', '#B7DD7D'),
        ]
        
        for line in lines_data:
            cur.execute(
                'INSERT INTO t_p77051504_moscow_metro_website.metro_lines (id, name, number, color) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO NOTHING',
                line
            )
            lines_count += cur.rowcount
        
        stations_data = [
            ('sok-0', 'Потапово', 'sokolnicheskaya', 0, False),
            ('sok-1', 'Бульвар Рокоссовского', 'sokolnicheskaya', 1, False),
            ('sok-2', 'Черкизовская', 'sokolnicheskaya', 2, False),
            ('sok-3', 'Преображенская площадь', 'sokolnicheskaya', 3, False),
            ('sok-4', 'Сокольники', 'sokolnicheskaya', 4, False),
            ('sok-5', 'Красносельская', 'sokolnicheskaya', 5, False),
            ('sok-6', 'Комсомольская', 'sokolnicheskaya', 6, True),
            ('sok-7', 'Красные ворота', 'sokolnicheskaya', 7, False),
            ('sok-8', 'Чистые пруды', 'sokolnicheskaya', 8, True),
            ('sok-9', 'Лубянка', 'sokolnicheskaya', 9, True),
            ('sok-10', 'Охотный ряд', 'sokolnicheskaya', 10, True),
            ('sok-11', 'Библиотека имени Ленина', 'sokolnicheskaya', 11, True),
            ('sok-12', 'Кропоткинская', 'sokolnicheskaya', 12, False),
            ('sok-13', 'Парк культуры', 'sokolnicheskaya', 13, True),
            ('sok-14', 'Фрунзенская', 'sokolnicheskaya', 14, False),
            ('sok-15', 'Спортивная', 'sokolnicheskaya', 15, False),
            ('sok-16', 'Воробьёвы горы', 'sokolnicheskaya', 16, False),
            ('sok-17', 'Университет', 'sokolnicheskaya', 17, False),
            ('sok-18', 'Проспект Вернадского', 'sokolnicheskaya', 18, False),
            ('sok-19', 'Юго-Западная', 'sokolnicheskaya', 19, False),
            ('sok-20', 'Тропарёво', 'sokolnicheskaya', 20, False),
            ('sok-21', 'Румянцево', 'sokolnicheskaya', 21, False),
            ('sok-22', 'Саларьево', 'sokolnicheskaya', 22, False),
            ('sok-23', 'Филатов Луг', 'sokolnicheskaya', 23, False),
            ('sok-24', 'Прокшино', 'sokolnicheskaya', 24, False),
            ('sok-25', 'Ольховая', 'sokolnicheskaya', 25, False),
            ('sok-26', 'Коммунарка', 'sokolnicheskaya', 26, False),
        ]
        
        for station in stations_data:
            cur.execute(
                'INSERT INTO t_p77051504_moscow_metro_website.metro_stations (id, name, line_id, station_order, has_transfer) VALUES (%s, %s, %s, %s, %s) ON CONFLICT (id) DO NOTHING',
                station
            )
            stations_count += cur.rowcount
        
        transfers_data = [
            ('sok-6', 'koltsevaya'),
            ('sok-8', 'lyublinsko-dmitrovskaya'),
            ('sok-9', 'tagansko-krasnopresnenskaya'),
            ('sok-10', 'zamoskvoretskaya'),
            ('sok-10', 'arbatsko-pokrovskaya'),
            ('sok-11', 'arbatsko-pokrovskaya'),
            ('sok-13', 'koltsevaya'),
        ]
        
        for transfer in transfers_data:
            cur.execute(
                'INSERT INTO t_p77051504_moscow_metro_website.metro_transfers (station_id, transfer_to_line_id) VALUES (%s, %s)',
                transfer
            )
            transfers_count += cur.rowcount
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'message': 'Import completed (partial data - Sokolnicheskaya line only)',
                'lines_imported': lines_count,
                'stations_imported': stations_count,
                'transfers_imported': transfers_count
            })
        }
    
    finally:
        cur.close()
        conn.close()

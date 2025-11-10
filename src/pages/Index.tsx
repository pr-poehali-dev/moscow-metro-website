import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { metroLines, stations, calculateRoute, type Route, type Station, type Line } from '@/data/metroData';

export default function Index() {
  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');
  const [route, setRoute] = useState<Route | null>(null);
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);

  const handleCalculateRoute = () => {
    if (fromStation && toStation) {
      const calculatedRoute = calculateRoute(fromStation, toStation);
      setRoute(calculatedRoute);
    }
  };

  const getLineStations = (lineId: string): Station[] => {
    return stations.filter(s => s.lineId === lineId).sort((a, b) => a.order - b.order);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Train" className="text-primary-foreground" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Московский метрополитен</h1>
              <p className="text-sm text-muted-foreground">Навигация и информация</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Icon name="Clock" size={14} className="mr-1" />
              05:30 - 01:00
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="Route" className="text-primary" size={24} />
                <CardTitle>Расчет маршрута</CardTitle>
              </div>
              <CardDescription>Найдите оптимальный путь между станциями</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Откуда</label>
                  <Select value={fromStation} onValueChange={setFromStation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите станцию отправления" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map(station => {
                        const line = metroLines.find(l => l.id === station.lineId);
                        return (
                          <SelectItem key={station.id} value={station.id}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line?.color }} />
                              {station.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Куда</label>
                  <Select value={toStation} onValueChange={setToStation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите станцию назначения" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map(station => {
                        const line = metroLines.find(l => l.id === station.lineId);
                        return (
                          <SelectItem key={station.id} value={station.id}>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line?.color }} />
                              {station.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={handleCalculateRoute} 
                className="w-full" 
                size="lg"
                disabled={!fromStation || !toStation}
              >
                <Icon name="Search" size={18} className="mr-2" />
                Рассчитать маршрут
              </Button>

              {route && (
                <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <Icon name="Clock" className="mx-auto mb-1 text-primary" size={20} />
                        <p className="text-2xl font-bold">{route.totalTime}</p>
                        <p className="text-xs text-muted-foreground">минут</p>
                      </div>
                      <div className="text-center">
                        <Icon name="Repeat" className="mx-auto mb-1 text-primary" size={20} />
                        <p className="text-2xl font-bold">{route.transfers}</p>
                        <p className="text-xs text-muted-foreground">пересадок</p>
                      </div>
                      <div className="text-center">
                        <Icon name="MapPin" className="mx-auto mb-1 text-primary" size={20} />
                        <p className="text-2xl font-bold">{route.stations.length}</p>
                        <p className="text-xs text-muted-foreground">станций</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="List" size={16} />
                      Маршрут следования
                    </h4>
                    <div className="space-y-2">
                      {route.stations.map((station, idx) => {
                        const line = metroLines.find(l => l.id === station.lineId);
                        return (
                          <div key={station.id} className="flex items-center gap-3 p-2 rounded hover:bg-background/50 transition-colors">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: line?.color }}>
                                {idx + 1}
                              </div>
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line?.color }} />
                              <span className="font-medium">{station.name}</span>
                            </div>
                            {station.hasTransfer && idx < route.stations.length - 1 && (
                              <Badge variant="secondary" className="text-xs">
                                <Icon name="Repeat2" size={12} className="mr-1" />
                                Переход
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="map">
              <Icon name="Map" size={16} className="mr-2" />
              Схема метро
            </TabsTrigger>
            <TabsTrigger value="lines">
              <Icon name="GitBranch" size={16} className="mr-2" />
              Линии метро
            </TabsTrigger>
            <TabsTrigger value="stations">
              <Icon name="MapPin" size={16} className="mr-2" />
              Станции
            </TabsTrigger>
            <TabsTrigger value="info">
              <Icon name="Info" size={16} className="mr-2" />
              Информация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" className="text-primary" size={24} />
                  Интерактивная схема метро
                </CardTitle>
                <CardDescription>
                  Полная схема московского метрополитена со всеми линиями и станциями
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-auto bg-muted rounded-lg p-4">
                  <img 
                    src="https://cdn.poehali.dev/files/67d8adfa-b91a-48c4-9732-121055046422.jpg" 
                    alt="Схема московского метро" 
                    className="w-full h-auto max-w-full"
                  />
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Используйте жесты для увеличения схемы на мобильных устройствах
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lines" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metroLines.map(line => (
                <Card 
                  key={line.id} 
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => setSelectedLine(line)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: line.color }}>
                        {line.number}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{line.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {getLineStations(line.id).length} станций
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {getLineStations(line.id)[0]?.openTime} - {getLineStations(line.id)[0]?.closeTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedLine && (
              <Card className="border-2" style={{ borderColor: selectedLine.color }}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: selectedLine.color }}>
                      {selectedLine.number}
                    </div>
                    <div>
                      <CardTitle>{selectedLine.name} линия</CardTitle>
                      <CardDescription>Полный список станций</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {getLineStations(selectedLine.id).map(station => (
                      <div key={station.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedLine.color }}>
                          <Icon name="Circle" size={12} className="text-white fill-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{station.name}</p>
                          {station.hasTransfer && (
                            <div className="flex gap-1 mt-1">
                              {station.transferTo?.map(transferLineId => {
                                const transferLine = metroLines.find(l => l.id === transferLineId);
                                return (
                                  <div 
                                    key={transferLineId} 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: transferLine?.color }}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stations" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stations.slice(0, 20).map(station => {
                const line = metroLines.find(l => l.id === station.lineId);
                return (
                  <Card key={station.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line?.color }} />
                        <CardTitle className="text-base">{station.name}</CardTitle>
                      </div>
                      <CardDescription className="text-xs">{line?.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-xs">{station.openTime} - {station.closeTime}</span>
                      </div>
                      {station.hasTransfer && (
                        <div className="flex items-center gap-2">
                          <Icon name="Repeat2" size={14} className="text-primary" />
                          <div className="flex gap-1">
                            {station.transferTo?.map(transferLineId => {
                              const transferLine = metroLines.find(l => l.id === transferLineId);
                              return (
                                <div 
                                  key={transferLineId} 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: transferLine?.color }}
                                  title={transferLine?.name}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Wallet" size={20} className="text-primary" />
                    Стоимость проезда
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Единая карта «Тройка»</span>
                    <span className="text-xl font-bold text-primary">46 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Разовый билет</span>
                    <span className="text-xl font-bold text-primary">65 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Безлимит на 1 день</span>
                    <span className="text-xl font-bold text-primary">265 ₽</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={20} className="text-primary" />
                    Статистика метро
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Всего линий</span>
                      <span className="text-2xl font-bold">{metroLines.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Всего станций</span>
                      <span className="text-2xl font-bold">{stations.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Пассажиров в день</span>
                      <span className="text-2xl font-bold">9+ млн</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Newspaper" size={20} className="text-primary" />
                    Новости и обновления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-semibold">Запущен новый участок БКЛ</p>
                    <p className="text-sm text-muted-foreground">Большая кольцевая линия расширена на 3 станции</p>
                    <p className="text-xs text-muted-foreground mt-1">10 ноября 2025</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-semibold">Обновление расписания</p>
                    <p className="text-sm text-muted-foreground">Интервалы движения поездов сокращены в часы пик</p>
                    <p className="text-xs text-muted-foreground mt-1">5 ноября 2025</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-semibold">Модернизация вагонов</p>
                    <p className="text-sm text-muted-foreground">На линии запущены новые поезда «Москва-2024»</p>
                    <p className="text-xs text-muted-foreground mt-1">1 ноября 2025</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Train" size={18} className="text-primary" />
                О метро
              </h3>
              <p className="text-sm text-muted-foreground">
                Московский метрополитен — один из крупнейших в мире по пассажиропотоку и протяженности линий.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  8 (495) 539-54-54
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@mosmetro.ru
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3">Режим работы</h3>
              <p className="text-sm text-muted-foreground">
                Ежедневно с 05:30 до 01:00
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Московский метрополитен. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
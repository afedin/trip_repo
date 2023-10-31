describe('geoLayer', () => {
  it('should return correct style for Россия', () => {
    const feature = { properties: { legend: 'Россия' } };
    const expectedStyle = { color: '#858482', fillColor: '#abaff0', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Паспорт РФ', () => {
    const feature = { properties: { legend: 'Паспорт РФ' } };
    const expectedStyle = { color: '#858482', fillColor: '#0044cd', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Без визы', () => {
    const feature = { properties: { legend: 'Без визы' } };
    const expectedStyle = { color: '#858482', fillColor: '#a5ff6c', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Электронная виза', () => {
    const feature = { properties: { legend: 'Электронная виза' } };
    const expectedStyle = { color: '#858482', fillColor: '#c3d790', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Виза по прибытии', () => {
    const feature = { properties: { legend: 'Виза по прибытии' } };
    const expectedStyle = { color: '#858482', fillColor: '#7dae61', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Требуется виза', () => {
    const feature = { properties: { legend: 'Требуется виза' } };
    const expectedStyle = { color: '#858482', fillColor: '#eab25e', fillOpacity: 0.35, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Отказано во въезде', () => {
    const feature = { properties: { legend: 'Отказано во въезде' } };
    const expectedStyle = { color: '#858482', fillColor: '#d7191c', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return correct style for Неизвестно', () => {
    const feature = { properties: { legend: 'Неизвестно' } };
    const expectedStyle = { color: '#858482', fillColor: '#a2c0cc', fillOpacity: 0.055, weight: 1, opacity: 0.21 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });

  it('should return default style for unknown legend', () => {
    const feature = { properties: { legend: 'Unknown' } };
    const expectedStyle = { color: '#858482', fillColor: '#2b83ba', fillOpacity: 0.45, weight: 1, opacity: 0.45 };
    expect(geoLayer.options.style(feature)).toEqual(expectedStyle);
  });
});
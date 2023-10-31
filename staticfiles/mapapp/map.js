// Создание карты с помощью библиотеки Leaflet
const map = L.map('map', {
    renderer: L.canvas({ backgroundColor: '#B0E0E6' }),
    zoomControl: false
}).setView([40, 0], 2);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Инициализация гео-слоя
let geoLayer = L.geoJSON(null, {
    style: (feature) => {
        const legend = feature.properties.legend;
        // ваша логика стилизации...
        switch (legend) {
            case 'Россия':
                return {color: '#858482', fillColor: '#abaff0', fillOpacity: 0.45, weight: 1, opacity: 0.45};
            case 'Паспорт РФ':
                return {color: '#858482', fillColor: '#0044cd', fillOpacity: 0.45, weight: 1, opacity: 0.45};
            case 'Без визы':
                return {color: '#858482', fillColor: '#a5ff6c', fillOpacity: 0.45, weight: 1, opacity: 0.45};
            case 'Электронная виза':
                return {color: '#858482', fillColor: '#c3d790', fillOpacity: 0.45, weight: 1, opacity: 0.45};
            case 'Виза по прибытии':
                return {color: '#858482', fillColor: '#7dae61', fillOpacity: 0.45, weight: 1, opacity: 0.45};
            case 'Требуется виза':
                return {color: '#858482', fillColor: '#eab25e', fillOpacity: 0.35, weight: 1, opacity: 0.45};
            case 'Отказано во въезде':
                return {color: '#858482', fillColor: '#d7191c', fillOpacity: 0.45, weight: 1, opacity: 0.45};    
            case 'Неизвестно':
                return {color: '#858482', fillColor: '#a2c0cc', fillOpacity: 0.055, weight: 1, opacity: 0.21};
            default:
                return {color: '#858482', fillColor: '#2b83ba', fillOpacity: 0.45, weight: 1, opacity: 0.45};
        }
      
    },
        
    }).addTo(map);


// Диапазон номеров файлов
const fileNumbers = Array.from({length: 262}, (_, i) => i + 1);

fileNumbers.forEach(number => {
    // Путь к файлу в статических ресурсах Django
    const filePath = `/static/data/${number}.geojson`;
    
    fetch(filePath)
    .then(response => response.json())
    .then(data => {
        // Добавление GeoJSON к текущему слою
        geoLayer.addData(data);
    })
    .catch(error => {
        console.error(`Error loading ${filePath}: ${error}`);
    });
});

geoLayer.on('mouseover', function(e) {
    const tooltip = L.tooltip({
        permanent: false,
        direction: 'center',
        className: 'country-label'
    })
    .setContent(e.layer.feature.properties.NAME_RU)
    .setLatLng(e.latlng)
    .addTo(map);
    e.layer._tempTooltip = tooltip;
})
.on('mouseout', function(e) {
    map.removeLayer(e.layer._tempTooltip);
});

map.on('zoomend', function() {
    const zoomLevel = map.getZoom();
    geoLayer.eachLayer(function(layer) {
        if (zoomLevel >= 20) {
            layer.openTooltip();
        } else {
            layer.closeTooltip();
        }
    });
});

var legend = L.control({ position: 'topright' });

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var categories = ['Россия', 'Паспорт РФ', 'Без визы', 'Электронная виза', 'Виза по прибытии', 'Требуется виза', 'Отказано во въезде', 'Неизвестно'];
    var colors = ['#abaff0', '#0044cd', '#a5ff6c', '#c3d790', '#7dae61', '#eab25e', '#d7191c', '#a2c0cc'];

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<span class="legend-marker" style="background:' + colors[i] + '"></span> ' +
            categories[i] + '<br>';
    }
    return div;
};

legend.addTo(map);





















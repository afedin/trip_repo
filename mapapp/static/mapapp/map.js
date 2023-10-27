// Создание карты с помощью библиотеки Leaflet
const map = L.map('map', {
    renderer: L.canvas({ backgroundColor: '#B0E0E6' }),
    zoomControl: false
}).setView([40, 0], 2);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

let geoLayer;

fetch('/static/data/countries.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        geoLayer = L.geoJSON(data, {
            style: (feature) => {
                const legend = feature.properties.legend;
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
            // onEachFeature: function(feature, layer) {
            //     if (feature.properties && feature.properties.NAME_RU) {
            //         layer.bindTooltip(feature.properties.NAME_RU, {
            //             permanent: false,
            //             direction: 'auto',
            //             className: 'country-label',
            //             followCursor: true
            //         });
            //     }
            // }
        }).addTo(map);

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
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
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

legend.onAdd = function(map) {
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

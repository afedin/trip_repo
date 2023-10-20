// Создание карты с помощью библиотеки Leaflet
const map = L.map('map', {
    // Использование рендерера canvas для отрисовки карты с фоновым цветом #B0E0E6
    renderer: L.canvas({ backgroundColor: '#B0E0E6' }),
    // Отключение стандартного элемента управления масштабом
    zoomControl: false
}).setView([40, 0], 2);  // Установка начального положения и масштаба карты. Здесь -15 вместо -10, чтобы сместить карту вниз.

// Добавление элемента управления масштабом в правый нижний угол карты. Можно выбрать другую позицию, например 'bottomleft'.
L.control.zoom({
    position:'bottomright' 
}).addTo(map);

// Определение местоположения пользователя с помощью API геолокации браузера
navigator.geolocation.getCurrentPosition((position) => {
    // Получение координат пользователя в виде массива [широта, долгота]
    const userLocation = [position.coords.latitude, position.coords.longitude];
    // Центрирование карты на местоположении пользователя и увеличение масштаба до 40
    map.setView(userLocation, 40);
});

// Загрузка и отображение данных GeoJSON с сервера по указанному URL
fetch('/static/data/countries.geojson')
    .then(response => response.json()) // Преобразование ответа в формат JSON
    .then(data => {
        // Создание слоя geoLayer из данных GeoJSON с помощью метода L.geoJSON
        geoLayer = L.geoJSON(data, {
            // Определение стиля отображения каждого объекта на основе свойства legend
            style: (feature) => {
                const legend = feature.properties.legend;
                switch (legend) {
                    case 'Россия':
                        return {color: '#858482', fillColor: '#abaff0', fillOpacity: 0.45, weight: 1, opacity: 0.45};
                    case 'Паспорт РФ':
                        return {color: '#858482', fillColor: '#abf0e7', fillOpacity: 0.45, weight: 1, opacity: 0.45};
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

            // Определение поведения для каждого объекта при добавлении на карту
            onEachFeature: function (feature, layer) {
                // Если у объекта есть свойство NAME_RU (название страны на русском языке)
                if (feature.properties && feature.properties.NAME_RU) {
                    // Привязка подсказки с названием страны к объекту
                    layer.bindTooltip(feature.properties.NAME_RU, {
                        // Подсказка не отображается постоянно, а только при наведении курсора
                        permanent: false,  
                        // Подсказка располагается по центру объекта
                        direction: 'center',
                        // Подсказка имеет класс country-label для стилизации
                        className: 'country-label'
                    });
                }
            }
        }).addTo(map); // Добавление слоя geoLayer на карту
        
        // Определение поведения для всего слоя geoLayer при наведении и убирании курсора
        geoLayer.on('mouseover', function(e) {
            // Открытие подсказки для объекта, на который наведен курсор
            e.layer.openTooltip();
        }).on('mouseout', function(e) {
            // Закрытие подсказки для объекта, с которого убран курсор
            e.layer.closeTooltip();
        });
    });

// Определение поведения для всей карты при изменении масштаба
map.on('zoomend', function() {
    // Получение текущего уровня масштаба карты
    const zoomLevel = map.getZoom();
    // Перебор всех объектов в слое geoLayer
    geoLayer.eachLayer(function(layer) {
        // Если уровень масштаба больше или равен 20 (можно выбрать другое значение)
        if (zoomLevel >= 20) {  
            // Открытие подсказки для объекта
            layer.openTooltip();
        } else {
            // Закрытие подсказки для объекта
            layer.closeTooltip();
        }
    });
});
    


// Создание элемента управления legend с помощью метода L.control и указанием позиции в правом верхнем углу карты
var legend = L.control({ position: 'topright' });

// Определение функции onAdd, которая вызывается при добавлении элемента управления на карту
legend.onAdd = function (map) {
    // Создание div элемента с классами info и legend
    var div = L.DomUtil.create('div', 'info legend');
    // Определение массивов с категориями и цветами для легенды
    var categories = ['Россия', 'Паспорт РФ', 'Без визы', 'Электронная виза', 'Виза по прибытии', 'Требуется виза', 'Отказано во въезде', 'Неизвестно'];
    var colors = ['#abaff0', '#abf0e7', '#a5ff6c', '#c3d790', '#7dae61', '#eab25e', '#d7191c', '#a2c0cc'];


    // Для каждой категории и цвета из массивов
    for (var i = 0; i < categories.length; i++) {
        // Добавление в div элемента HTML-кода с маркером и названием категории
        div.innerHTML +=
            '<span class="legend-marker" style="background:' + colors[i] + '"></span> ' +
            categories[i] + '<br>';
    }

    // Возвращение div элемента как содержимого элемента управления
    return div;
};

// Добавление элемента управления legend на карту с помощью метода addTo
legend.addTo(map);

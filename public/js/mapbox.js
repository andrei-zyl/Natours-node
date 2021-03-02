export const displayMap = locations => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW56eWwiLCJhIjoiY2tscTg2YWxzMWFpdTJubjNrYTFlZHFzcSJ9.foN9qhp6JRmEaFsD_Ls5RA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/anzyl/cklqcywha1rbt17no08bu5ihk',
        scrollZoom: false
        // center: [-118.257304, 34.047671],
        // zoom: 7
    });
    
    const bounds = new mapboxgl.LngLatBounds();
    
    locations.forEach(loc => {
        const el = document.createElement('div');
        el.className = 'marker';
    
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);
    
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);
        
        bounds.extend(loc.coordinates);
    });
    
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}

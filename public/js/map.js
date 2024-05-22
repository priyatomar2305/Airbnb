        var map = L.map('map', {
            center: coordinates,

            zoom: 12,
            zoomControl: false // Disable the default zoom control
        })
map.setView(coordinates, 7, {
    animate: true, // Whether to animate the transition
    duration: 2,   // Duration of the animation in seconds
    pan: {         
        animate: true,
        duration: 1
    }
})
       
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(map);

        // Add a marker to New Delhi
        var marker = L.marker(coordinates).addTo(map);
marker.bindPopup(`<b>${locatio}</b> </br>
        ${countr}.`).openPopup();

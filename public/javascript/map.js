mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  center: listing.geometry.coordinates,
  zoom: 9, 
});


const marker1 = new mapboxgl.Marker({color:'red'})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${listing.title}</h3><p>Exjact location give after booking</p>`
    ))
    .addTo(map);



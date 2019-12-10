
 let mis_lineas = [
    {lat:51.5008, lng:-0.1224},
    {lat:48.8567, lng:2.3508},
    {lat:52.5166, lng:13.3833}
 ]

let colores = ["blue","green","pink","black","yellow","brown","orange","violet","yellow green"]
let cont = 0

function addPolylineToMap(map,lineas) {
    var lineString = new H.geo.LineString();
    lineas.forEach(x => {
        lineString.pushPoint(x);
    });
    map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 4 ,strokeColor:colores[cont]}}
    ));

    if (cont==8) {cont=0}
    else {cont++}
  }
  
  var platform = new H.service.Platform({
    apikey: window.apikey
  });
  var defaultLayers = platform.createDefaultLayers();
  
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,{
    center: {lat:41.1622023, lng:-8.6569732},
    zoom: 12,
    pixelRatio: window.devicePixelRatio || 1
  });
    window.addEventListener('resize', () => map.getViewPort().resize());

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
 
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  var customStyle = {
    strokeColor: 'red',
    fillColor: 'rgba(255, 0, 0, 0.5)',
    lineCap: 'square',
    lineJoin: 'bevel'
  };
  
//var circle = new H.map.Circle({lat: 51.5008, lng:-0.1224}, 10,{style: customStyle});


function circulos(pos) {
  var circle = new H.map.Circle(pos[0], 10,{style: customStyle});
  map.addObject(circle);
}


var num = 1408032135+240*15

 var intervalID = window.setInterval(myCallback, 400);

function myCallback() {
    let i =0;
    datos[num+=15].forEach(x => {
    console.log(i)
    i++
    if(x.punto){
        circulos(x.ruta)
    }
    else{
        addPolylineToMap(map,x.ruta)
    }
});

}

// map.addEventListener('tap', function (evt) {
//   console.log(evt.type, evt.currentPointer.type);
//   var coord = map.screenToGeo(evt.currentPointer.viewportX,
//           evt.currentPointer.viewportY);
//   console.log('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
//       ((coord.lat > 0) ? 'N' : 'S') +
//       ' ' + Math.abs(coord.lng.toFixed(4)) +
//        ((coord.lng > 0) ? 'E' : 'W'));
// });
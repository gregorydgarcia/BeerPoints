var BP=BP||{};BP.map=L.map("map",{center:[40,-98],zoom:4}),BP.tiles=new L.tileLayer("http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png").addTo(BP.map),function(){$.getJSON("../data/beerpoints.geoJson",function(t){BP.data=t})}();
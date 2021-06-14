import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fluxData from '../../assets/fluxvision2.json';

declare var google: any;

@Component({
  selector: 'app-population',
  template: `
  <main id="content" role="main" class="container">
    <div class="o-tab-container ">
      <div class="o-tab-content show" id="tab-1-content">
        <div class="row mt-4">
          <div class="col-md-8" id="cadre">
            <div #mapContainer id="map"></div>
            <div id="mapError"></div>
          </div>
          <div class="col-md-4">
            <h3>Légende de couleur</h3>
            <form class="mt-2" id="legende">
              <table>
                <tr><th width="50px">Couleur</th><th width="25px"></th><th align="center">Nombre de personnes</th></tr>
                <tr><td bgcolor = "#00FF00" width="50px"></td><th width="25px"></th><td ><&nbsp;2000</td></tr>
                <tr><td bgcolor = "#55AA00" width="50px"></td><th width="25px"></th><td >2000 - 4 500</td></tr>
                <tr><td bgcolor = "#AAAA00" width="50px"></td><th width="25px"></th><td >4 500 - 8 000</td></tr>
                <tr><td bgcolor = "#FFFF00" width="50px"></td><th width="25px"></th><td >8 000 - 12 500</td></tr>
                <tr><td bgcolor = "#FF65A0" width="50px"></td><th width="25px"></th><td >12 500 - 20 000</td></tr>
                <tr><td bgcolor = "#FF0000" width="50px"></td><th width="25px"></th><td >>&nbsp;20 000</td></tr>
              </table>
            </form> 
          </div>
        </div>
      </div>
    </div>

</main>
`,
  styleUrls: ['./population.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopulationComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  infowindow = new google.maps.InfoWindow({});
  lat = 43.700160960756996;
  lng = 7.26182903739694;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  coordinatesPoly: [[]];
  fluxData: any = (fluxData as any).default;
  population = [];

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 13
  };

  constructor(private httpClient: HttpClient) {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //  restrievePeople();
  }

  getProducts() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    });

    headers.set('Content-Type', 'text/xml');

    this.httpClient
      .get('assets/fluxvision.txt', { headers, responseType: 'text' })
      .subscribe(async output => {
        var colors = ["#00FF00", "#55AA00", "#AAAA00", "#FFFF00", "#FF65A0", "#FF0000"];
        var i = 0;
        var table = output.split('<coordinates>');
        table.forEach(element => {
          i++;
          let coordinates = [];
          if (i > 1) {
            var table2 = element.split('</coordinates>');
            var table5 = table2[1].split('name="Code_insee">');
            var pop = 0;
            if (table5[1]) {
              var table6 = table5[1].split('</SimpleData>');
              pop = parseInt(table6[0], 10);
            }
            if (pop != 0) {
              let j = 0;
              while (fluxData['default'][j] && fluxData['default'][j].zone != pop)
                j++;
              if (fluxData['default'][j] && fluxData['default'][j].nbPers)
                this.population[i] = parseInt(fluxData['default'][j].nbPers, 10);
            }
            var table3 = table2[0].split(' ');
            table3.forEach(element => {
              var table4 = element.split(',');
              coordinates.push({
                lat: parseFloat(table4[1]),
                lng: parseFloat(table4[0])
              })
            });
          } else {
            var table2 = element.split('name="Code_insee">');
            var table3 = table2[1].split('</SimpleData>');
            var pop = parseInt(table3[0]);
            if (pop != 0) {
              console.log(pop)
              let h = 0;
              while (fluxData['default'][h] && fluxData['default'][h].zone != pop)
                h++;
              if (fluxData['default'][h] && fluxData['default'][h].nbPers)
                this.population[i] = parseInt(fluxData['default'][h].nbPers, 10);
            }
          }
          let color = "#000000";
          if (this.population[i] < 2000) {
            color = colors[0];
          } else if (this.population[i] < 4500) {
            color = colors[1];
          } else if (this.population[i] < 8000) {
            color = colors[2];
          } else if (this.population[i] < 12500) {
            color = colors[3];
          } else if (this.population[i] < 20000) {
            color = colors[4];
          } else if (this.population[i] != 0) {
            color = colors[5];
          }
          let polygon = new google.maps.Polygon({ paths: coordinates, strokeColor: color, strokeOpacity: 0.2, strokeWeight: 2, fillColor: color, fillOpacity: 0.45 });

          var infowindow = new google.maps.InfoWindow({
            size: new google.maps.Size(150, 50)
          });

          // google.maps.event.addListener(polygon, 'mouseover', function (event) {
          //   var contentString = "<h5>" + this.population[i] + " personnes</h5>"
          //     + "<strong>" + this.population[i] + "</strong> personnes se trouvent dans cette zone";
          //   infowindow.setContent(contentString);
          //   infowindow.setPosition(event.latLng);
          //   infowindow.open(this.map);
          // });

          // google.maps.event.addListener(polygon, 'mouseout', function (event) {
          //   var contentString = "";
          //   infowindow.setContent(contentString);
          //   infowindow.setPosition(event.latLng);
          //   infowindow.close(this.map);
          // });
          polygon.setMap(this.map);
        });
      });
  }
}
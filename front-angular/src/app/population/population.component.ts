import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-population',
  template: `
  <main id="content" role="main" class="container">
    <div class="o-tab-container ">
      <div class="o-tab-content show" id="tab-1-content">
        <div class="row mt-4">
          <div class="col" id="cadre">
            <div #mapContainer id="map"></div>
            <div id="mapError"></div>
            <div id="chooseTime">
              <form oninput="level.value = flevel.valueAsNumber" method="post">
                Choisissez le jour : <input type="date" name="theDay" value="2018-04-27" max="2018-05-11"
                  min="2018-04-27" onchange="showSlideTime(flevel.valueAsNumber,theDay.value)">
                <input name="flevel" type="range" list="tickmarks" min="7" value="7" max="23" step="0.5"
                  onchange="showSlideTime(flevel.valueAsNumber,theDay.value)">
              </form>
              <table width="100%">
                <tr>
                  <td id="matin">7h00</td>
                  <td align="center" id="slideTime"><b>Presence à 7h00</b></td>
                  <td id="soir" align="right">23h00</td>
                </tr>
              </table>
            </div>
          </div>
            <div class="col col-auto p-4 border border-light">
              <h2>Options d'affichage</h2>
                <form class="mt-2" id="displayOptionsForm">
                    <div class="custom-control custom-checkbox mr-5">
                        <input type="checkbox" class="custom-control-input" id="customCheck4"
                            onchange="togglePeopleMarkers()" checked>
                        <label class="custom-control-label" for="customCheck4"><img
                                src="DemoPopulation/assets/img/layer_people_marker.png" class="mr-1" />
                            Personnes</label>
                    </div>
                </form>
                <h3>Légende de couleur</h3>
                <form class="mt-2" id="legende">
                    <table>
                        <tr>
                            <th width="50px">Couleur</th>
                            <th width="25px"></th>
                            <th align="center">Nombre de personnes</th>
                        </tr>
                        <tr>
                            <td bgcolor="#00FF00" width="50px"></td>
                            <th width="25px"></th>
                            <td>
                                <&nbsp;2000< /td>
                        </tr>
                        <tr>
                            <td bgcolor="#55AA00" width="50px"></td>
                            <th width="25px"></th>
                            <td>2000 - 4 500</td>
                        </tr>
                        <tr>
                            <td bgcolor="#AAAA00" width="50px"></td>
                            <th width="25px"></th>
                            <td>4 500 - 8 000</td>
                        </tr>
                        <tr>
                            <td bgcolor="#FFFF00" width="50px"></td>
                            <th width="25px"></th>
                            <td>8 000 - 12 500</td>
                        </tr>
                        <tr>
                            <td bgcolor="#FF65A0" width="50px"></td>
                            <th width="25px"></th>
                            <td>12 500 - 20 000</td>
                        </tr>
                        <tr>
                            <td bgcolor="#FF0000" width="50px"></td>
                            <th width="25px"></th>
                            <td>>&nbsp;20 000</td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    </div>
</div>

</main>
`,
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  infowindow = new google.maps.InfoWindow({});

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    var annecy = { lat: 45.905892, lng: 6.125634 };

    var mapOptions = {
      center: annecy,
      zoom: 13,
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    //  restrievePeople();
  }


}

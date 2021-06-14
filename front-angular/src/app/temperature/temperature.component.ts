import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as repartiteurs from '../../assets/fichierRepartiteur.json';
import * as risquesData from '../../assets/fichierTest.json';
import $ from "jquery";
import { createAotUrlResolver } from '@angular/compiler';

declare var google: any;
// declare var $: any;

export class Risques {
  temp: any;
  pluie: any;
  pluie5: any;
  vent: any;
  feu: any;
}

@Component({
  selector: 'app-temperature',
  template: `
  <body>
    <main id="content" role="main" class="container" style="margin-bottom: 150px;">
      <div class="" id="tab-1-content">
        <div class="row mt-4">
          <div class="col-md-8" id="cadre">
              <div #mapContainer id="map"></div>
              <div id="mapError"></div>
          </div>
          <div class="col-md-4 border border-light">
            <h4>Equipements</h4>
            <div class="custom-control custom-checkbox mr-5" >
              <input type="checkbox" class="custom-control-input" id="customCheckRepartiteur" checked (click)="showRepartiteurs()">
              <label class="custom-control-label" for="customCheckRepartiteur"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Répartiteurs</label>
              <div class="form-group">
                <label for="fichier">Choisir un fichier</label>
                <input type="file" id="fichier" (change)="envoiFichier($event.target.files)"/>
              </div>
            </div>
            <div>
              <h4>Données climatiques</h4>
              <table width="100%"><tr><td>1976-2005</td><td align="center">2021-2050</td><td align="right">2041-2070</td></tr></table>
              <input class="custom-range" [(ngModel)]="epoque" type="range" name="epoque" id="epoque" min="0" max="2" step="1" (ngModelChange)="changeEpoque($event)" value="{{epoque}}">
            </div>
            <form >
                <div class="custom-control custom-checkbox mr-5" title="Le nombre de jours supérieurs à 35°C augmente à moyen terme, mais reste faible pour la majorité des régions. Certains zones de la vallée du Rhône et du sud-ouest seront néanmoins soumises à plusieurs semaines detempératures élevées par an.

Ces 35°C correspondent à une température sous abri; à l’intérieur d’un bâtiment non ventilé, elle peut facilement atteindre 40-42 °C. Cela correspondrait donc à une augmentation de la dépense énergétique pour les datacenters, tandis que des défaillances d’équipements plus anciens ou non climatisés localisés dans la moitié sud de la France ne sont pas à exclure.">

                  <input [(ngModel)]="risques.temp" name="temp" type="checkbox" class="custom-control-input" id="customCheckTemp" (ngModelChange)="changeRisques($event)" checked>
                  <label class="custom-control-label" for="customCheckTemp"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Temperature</label>
                </div>
                <div class="custom-control custom-checkbox mr-5" title="Les massifs montagneux sont les zones les plus touchées par les précipitations intenses. Le nombre de jours de précipitations intenses n’augmente pas de façon significative.

Cet indicateur permet notamment d’identifier les zones susceptibles d’être touchées par des inondations dues au ruissellement des eaux de pluie (inondations rapides de ruissellement).">
                  <input [(ngModel)]="risques.pluie" name="pluie" type="checkbox" class="custom-control-input" id="customCheckPluie" (ngModelChange)="changeRisques($event)"checked>
                  <label class="custom-control-label" for="customCheckPluie"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pluie</label>
                </div>
                <div class="custom-control custom-checkbox mr-5" title="La quantité maximale de précipitations sur cinq jours évolue peu, mais la zone concernée par des cumuls importants s’étend sur le quart sud-est. Cet indicateur permet notamment d’identifier les zones susceptibles d’être touchées par des crues de cours d’eau (inondations lentes).">
                  <input [(ngModel)]="risques.pluie5" name="pluie5" type="checkbox" class="custom-control-input" id="customCheckPluie5j" (ngModelChange)="changeRisques($event)"checked>
                  <label class="custom-control-label" for="customCheckPluie5j"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pluie sur 5 jours</label>
                </div>
                <div class="custom-control custom-checkbox mr-5" title="Aucune évolution significative n’est observable sur la fréquence des jours de vent fort (NB : cet indicateur est à prendre avec plus de précaution que les autres aléas, la modélisation ayant un effet lissant sur les vents, phénomènes très restreints spatialement et temporellement).
Il faut garder en tête que cet indicateur est imprécis et ne peut pas à prendre en compte les particularités locales, telles que la disposition des bâtiments qui peuvent créer des effets très locaux. Une étude adaptée à chaque bâtiment peut donc permettre une analyse plus fine.Cet indicateur, couplé à l’analyse des précipitations, peut permettre d’identifier les zones où l’enfouissement des lignes est particulièrement intéressant.">
                  <input [(ngModel)]="risques.vent" name="vent" type="checkbox" class="custom-control-input" id="customCheckVent" (ngModelChange)="changeRisques($event)"checked>
                  <label class="custom-control-label" for="customCheckVent"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vent</label>
                </div>
                <div class="custom-control custom-checkbox mr-5" title="
                Nombre de jours propices aux départs de feu">
                  <input [(ngModel)]="risques.feu" name="feu" type="checkbox" class="custom-control-input" id="customCheckFeu" (ngModelChange)="changeRisques($event)"checked>
                  <label class="custom-control-label" for="customCheckFeu"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Feux de Végétation</label>
                </div>
                <br/>
                <div class="custom-control custom-checkbox mr-5" title="
                Le cumul moyen annuel de DJC (donc les besoins en climatisation) augmente de manière importante dans la moitié sud de la France à court terme et de manière très importante dans toute la France à moyen terme.">
                  <input type="checkbox" class="custom-control-input" id="customCheckClim" onchange="showClimSquares()"unchecked>
                  <label class="custom-control-label" for="customCheckClim"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climatisation</label>
                </div>
            </form>
            <div id="legende_couleur">
              <table >
              <tr></tr>
              <tr><th width="50px">Couleur</th><th width="25px"></th><th align="center">{{risquesText[0]}}</th><th>Nombre de répartiteurs</th></tr>
              <tr><td border="1" bgcolor = "#FFFFFF" width="50px"></td><th width="25px"></th><td >{{risquesText[1]}}</td><td>{{nbreRepartiteur[0]}}</td></tr>
              <tr><td bgcolor = "#CCCCCC" width="50px"></td><th width="25px"></th><td >{{risquesText[2]}}</td><td>{{nbreRepartiteur[1]}}</td></tr>
              <tr><td bgcolor = "#999999" width="50px"></td><th width="25px"></th><td >{{risquesText[3]}}</td><td>{{nbreRepartiteur[2]}}</td></tr>
              <tr><td bgcolor = "#333333" width="50px"></td><th width="25px"></th><td >{{risquesText[4]}}</td><td>{{nbreRepartiteur[3]}}</td></tr>
              <tr><td bgcolor = "#000000" width="50px"></td><th width="25px"></th><td >{{risquesText[5]}}</td><td>{{nbreRepartiteur[4]}}</td></tr>
              </table>
            </div>
            <br/>
          </div>
        </div>
      </div>
    </main>
  </body>
`,
  styleUrls: ['./temperature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = 47.128439;
  lng = 2.779515;
  repartiteurs: any = (repartiteurs as any).default;
  risquesData: any = (risquesData as any).default;
  zoom = false;
  infowindow = new google.maps.InfoWindow({});
  markers = [];
  repartiteur = true;
  nbreRepartiteur = [0, 0, 0, 0, 0];
  squaresRisque = [];
  epoque = 1;
  carre = true;
  risquesText = ["Risque général", "Risque 1", "Risque 2", "Risque 3", "Risque 4", "Risque 5"];
  risques: Risques = {
    temp: true,
    pluie: true,
    pluie5: true,
    vent: true,
    feu: true,
  };
  nbRisques = 5;

  fichier: File = null;
  filePreview = null;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 5.5
  };

  constructor(private cd: ChangeDetectorRef) { }

  async ngAfterViewInit() {
    this.mapInitializer();
    if (await this.pushCarres() == 1 && await this.pushRisque(1) == 1) {
      console.log(this.nbreRepartiteur);
      this.cd.detectChanges();
    }
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.map.addListener("zoom_changed", () => {
      console.log("Zoom: " + this.map.getZoom());
      if (this.map.getZoom() == 10 && this.carre === true && this.repartiteur === true) {
        this.removeMarkers();
        this.pushMarkers();
        this.carre = false;
      } else if (this.map.getZoom() == 9 && this.carre === false && this.repartiteur === true) {
        this.removeMarkers();
        this.pushCarres();
        this.carre = true;
      }
    });
  }
  //afficher ou cacher les repartiteurs
  showRepartiteurs() {
    if (this.repartiteur === false) {
      this.repartiteurs = (repartiteurs as any).default;
      if (this.map.getZoom() >= 10) {
        this.removeMarkers();
        this.pushMarkers();
        this.carre = false;
      } else if (this.map.getZoom() <= 9) {
        this.removeMarkers();
        this.pushCarres();
        this.carre = true;
      }
    } else
      this.removeMarkers();
  }
  // mettres les carrés des répartiteurs
  pushCarres() {
    return new Promise((resolve) => {
      this.repartiteur = true;

      var lng4km = 0.013155;
      var lat4km = 0.008992;

      for (var i = 0; i < this.repartiteurs.length; i++) {
        let coinSO = { lat: (this.repartiteurs[i].lat - lat4km), lng: (this.repartiteurs[i].lng - lng4km) };
        let coinSE = { lat: (this.repartiteurs[i].lat - lat4km), lng: (this.repartiteurs[i].lng + lng4km) };
        let coinNO = { lat: (this.repartiteurs[i].lat + lat4km), lng: (this.repartiteurs[i].lng - lng4km) };
        let coinNE = { lat: (this.repartiteurs[i].lat + lat4km), lng: (this.repartiteurs[i].lng + lng4km) };

        let coordonnes = [coinNE, coinNO, coinSO, coinSE];
        let repartiteur = new google.maps.Polygon({ paths: coordonnes, strokeColor: "#000000", strokeOpacity: 0.2, strokeWeight: 2, fillColor: "#000000", fillOpacity: 0.45 });
        repartiteur.setMap(this.map);
        this.markers.push(repartiteur);
      }
      console.log(this.repartiteurs.length);
      return resolve(1);
    })
  }
  // mettres les mzrkers des répartiteurs
  pushMarkers() {
    return new Promise((resolve) => {
      this.repartiteur = true;

      for (var i = 0; i < this.repartiteurs.length; i++) {
        var coordonnes = { lat: this.repartiteurs[i].lat, lng: this.repartiteurs[i].lng };
        var name = this.repartiteurs[i].nom;

        let marker = new google.maps.Marker({
          position: coordonnes,
          map: this.map,
          title: 'CLE NRA :' + name,
        });
        marker.setMap(this.map);
        this.markers.push(marker);
      }
      console.log(this.repartiteurs.length);
      return resolve(1);
    })
  }
  //mettre les polygones de risques au premier chargement de la page
  pushRisque(epoque: number) {
    return new Promise((resolve) => {
      var couleurs = ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"];
      // for (var i = 0; i < 5; i++) this.nbreRepartiteur[i] = 0; //Remise à zéro du tableau ! 

      var lng4Km = 0.05263;
      var lat4Km = 0.03597;

      for (var i = 0; i < this.risquesData.length; i++) {
        var coinSudOuest = { lat: parseFloat(this.risquesData[i].latitude) - lat4Km, lng: parseFloat(this.risquesData[i].longitude) - lng4Km };
        var coinSudEst = { lat: parseFloat(this.risquesData[i].latitude) - lat4Km, lng: parseFloat(this.risquesData[i].longitude) + lng4Km };
        var coinNordOuest = { lat: parseFloat(this.risquesData[i].latitude) + lat4Km, lng: parseFloat(this.risquesData[i].longitude) - lng4Km };
        var coinNordEst = { lat: parseFloat(this.risquesData[i].latitude) + lat4Km, lng: parseFloat(this.risquesData[i].longitude) + lng4Km };

        var coordonnes = [coinNordEst, coinNordOuest, coinSudOuest, coinSudEst];

        if (epoque == 0) {
          var indiceColor = Math.max(parseInt(this.risquesData[i].couleurTempRef), parseInt(this.risquesData[i].couleurPluieRef),
            parseInt(this.risquesData[i].couleurVentRef), parseInt(this.risquesData[i].couleurp5joursRef), parseInt(this.risquesData[i].couleurFeuRef));
        }
        if (epoque == 1) {
          var indiceColor = Math.max(parseInt(this.risquesData[i].couleurTempH1), parseInt(this.risquesData[i].couleurPluieH1),
            parseInt(this.risquesData[i].couleurVentH1), parseInt(this.risquesData[i].couleurp5joursH1), parseInt(this.risquesData[i].couleurFeuH1));
        }
        if (epoque == 2) {
          var indiceColor = Math.max(parseInt(this.risquesData[i].couleurTempH2), parseInt(this.risquesData[i].couleurPluieH2),
            parseInt(this.risquesData[i].couleurVentH2), parseInt(this.risquesData[i].couleurp5joursH2), parseInt(this.risquesData[i].couleurFeuH2));
        }

        var carre = new google.maps.Polygon({ paths: coordonnes, strokeColor: couleurs[indiceColor], fillColor: couleurs[indiceColor], strokeOpacity: 0.45, fillOpacity: 0.45 });
        carre.setMap(this.map);
        this.squaresRisque.push(carre);
        //Je fait la somme de répartiteurs ayant le même niveau de risque. 

        this.nbreRepartiteur[indiceColor] += parseInt(this.risquesData[i].nbreRepartiteur);
        if ((i + 1) == this.risquesData.length) {
          console.log(indiceColor); resolve(1);
        }
      }
    })
  }
  //supprimer les repartiteurs
  removeMarkers() {
    if (this.repartiteur === true) {
      this.repartiteur = false;
      if (this.markers) {
        this.markers.map(function (marker) {
          if (marker.getMap() != null)
            marker.setMap(null);
        })
      }
    }
  }

  changeRisques(risque) {
    var couleurs = ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"];
    for (var i = 0; i < 5; i++) this.nbreRepartiteur[i] = 0; //Remise à zéro du tableau !
    if (risque === false)
      this.nbRisques--;
    else
      this.nbRisques++;
    this.checkNbRisque();

    for (var i = 0; i < this.risquesData.length; i++) {
      if (this.epoque == 0) {
        if (this.risques.temp === true) { var temp = parseInt(this.risquesData[i].couleurTempRef) } else { var temp = 0 };
        if (this.risques.pluie === true) { var pluie = parseInt(this.risquesData[i].couleurPluieRef) } else { var pluie = 0 };
        if (this.risques.pluie5 === true) { var pluie5 = parseInt(this.risquesData[i].couleurp5joursRef) } else { var pluie5 = 0 };
        if (this.risques.vent === true) { var vent = parseInt(this.risquesData[i].couleurVentRef) } else { var vent = 0 };
        if (this.risques.feu === true) { var feu = parseInt(this.risquesData[i].couleurFeuRef) } else { var feu = 0 };
        var indiceColor = Math.max(temp, pluie, vent, pluie5, feu);
      }
      else if (this.epoque == 1) {
        if (this.risques.temp === true) { var temp = parseInt(this.risquesData[i].couleurTempH1) } else { var temp = 0 };
        if (this.risques.pluie === true) { var pluie = parseInt(this.risquesData[i].couleurPluieH1) } else { var pluie = 0 };
        if (this.risques.pluie5 === true) { var pluie5 = parseInt(this.risquesData[i].couleurp5joursH1) } else { var pluie5 = 0 };
        if (this.risques.vent === true) { var vent = parseInt(this.risquesData[i].couleurVentH1) } else { var vent = 0 };
        if (this.risques.feu === true) { var feu = parseInt(this.risquesData[i].couleurFeuH1) } else { var feu = 0 };
        var indiceColor = Math.max(temp, pluie, vent, pluie5, feu);
      }
      else if (this.epoque == 2) {
        if (this.risques.temp === true) { var temp = parseInt(this.risquesData[i].couleurTempH2) } else { var temp = 0 };
        if (this.risques.pluie === true) { var pluie = parseInt(this.risquesData[i].couleurPluieH2) } else { var pluie = 0 };
        if (this.risques.pluie5 === true) { var pluie5 = parseInt(this.risquesData[i].couleurp5joursH2) } else { var pluie5 = 0 };
        if (this.risques.vent === true) { var vent = parseInt(this.risquesData[i].couleurVentH2) } else { var vent = 0 };
        if (this.risques.feu === true) { var feu = parseInt(this.risquesData[i].couleurFeuH2) } else { var feu = 0 };
        var indiceColor = Math.max(temp, pluie, vent, pluie5, feu);
      }

      this.changeMarkerColor(this.squaresRisque[i], couleurs[indiceColor]);
      this.nbreRepartiteur[indiceColor] += parseInt(this.risquesData[i].nbreRepartiteur);
    }
  }

  changeEpoque(epoque) {
    console.log(epoque);
    var couleurs = ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000"];
    for (var i = 0; i < 5; i++) this.nbreRepartiteur[i] = 0; //Remise à zéro du tableau !

    for (var i = 0; i < this.risquesData.length; i++) {
      if (this.epoque == 0) {
        if (this.risques.temp === true) { var temp = parseInt(this.risquesData[i].couleurTempRef) } else { var temp = 0 };
        if (this.risques.pluie === true) { var pluie = parseInt(this.risquesData[i].couleurPluieRef) } else { var pluie = 0 };
        if (this.risques.pluie5 === true) { var pluie5 = parseInt(this.risquesData[i].couleurp5joursRef) } else { var pluie5 = 0 };
        if (this.risques.vent === true) { var vent = parseInt(this.risquesData[i].couleurVentRef) } else { var vent = 0 };
        if (this.risques.feu === true) { var feu = parseInt(this.risquesData[i].couleurFeuRef) } else { var feu = 0 };
        var indiceColor = Math.max(temp, pluie, vent, pluie5, feu);
      }
      else if (this.epoque == 1) {
        if (this.risques.temp === true) { var temp = parseInt(this.risquesData[i].couleurTempH1) } else { var temp = 0 };
        if (this.risques.pluie === true) { var pluie = parseInt(this.risquesData[i].couleurPluieH1) } else { var pluie = 0 };
        if (this.risques.pluie5 === true) { var pluie5 = parseInt(this.risquesData[i].couleurp5joursH1) } else { var pluie5 = 0 };
        if (this.risques.vent === true) { var vent = parseInt(this.risquesData[i].couleurVentH1) } else { var vent = 0 };
        if (this.risques.feu === true) { var feu = parseInt(this.risquesData[i].couleurFeuH1) } else { var feu = 0 };
        var indiceColor = Math.max(temp, pluie, vent, pluie5, feu);
      }
      else if (this.epoque == 2) {
        if (this.risques.temp === true) { var temp = parseInt(this.risquesData[i].couleurTempH2) } else { var temp = 0 };
        if (this.risques.pluie === true) { var pluie = parseInt(this.risquesData[i].couleurPluieH2) } else { var pluie = 0 };
        if (this.risques.pluie5 === true) { var pluie5 = parseInt(this.risquesData[i].couleurp5joursH2) } else { var pluie5 = 0 };
        if (this.risques.vent === true) { var vent = parseInt(this.risquesData[i].couleurVentH2) } else { var vent = 0 };
        if (this.risques.feu === true) { var feu = parseInt(this.risquesData[i].couleurFeuH2) } else { var feu = 0 };
        var indiceColor = Math.max(temp, pluie, vent, pluie5, feu);
      }

      this.changeMarkerColor(this.squaresRisque[i], couleurs[indiceColor]);
      this.nbreRepartiteur[indiceColor] += parseInt(this.risquesData[i].nbreRepartiteur);
    }
  }

  checkNbRisque() {
    if (this.nbRisques <= 1) {
      if (this.risques.temp === true) {
        this.risquesText = ["Nbre de jours à T > 35°C", "0 jour/année", "1 à 5 jours", "6 à 10 jours/année", "11 à 15 jours/année", "16 à 25 jours/année"];
      } else if (this.risques.pluie === true) {
        this.risquesText = ["Nbre de jours de plus<br/>de 20 mn de pluies", "0 à 5 jours", "5 à 10 jours", "10 à 15 jours", "15 à 20 jours", "> 20 jours"];
      } else if (this.risques.pluie5 === true) {
        this.risquesText = ["Intensité de pluie sur 5 jours", "0 à 30 mm", "30 à 60 mm", "60 à 90 mm", "90 à 120 mm", "> 120 mm"];
      } else if (this.risques.vent === true) {
        this.risquesText = ["Nbre de jours de vent > 80Km/h", "0 à 5 jours", "5 à 10 jours", "10 à 15 jours", "15 à 20 jours", "> 20 jours"];
      } else if (this.risques.feu === true) {
        this.risquesText = ["Jours propices aux départs de feu", "0 à 20 jours", "20 à 40 jours", "40 à 60 jours", "60 à 80 jours", "> 80 jours"];
      } else
        this.risquesText = ["", "", "", "", "", ""];
    } else {
      this.risquesText = ["Risque général", "Risque 1", "Risque 2", "Risque 3", "Risque 4", "Risque 5"];
    }
  }
  //Pour changer la la couleur dun polygone 
  changeMarkerColor(markerList, color) {
    markerList.setOptions({ strokeColor: color, fillColor: color, strokeOpacity: 0.45, fillOpacity: 0.45 });
  }

  envoiFichier(fichiers: FileList) {
    var ele = document.getElementById("customCheckRepartiteur") as HTMLInputElement;
    if (ele.checked === true)
      document.getElementById('customCheckRepartiteur').click();
    this.fichier = fichiers.item(0);
    const fileReader = new FileReader();
    fileReader.readAsText(this.fichier, "UTF-8");
    fileReader.onload = () => {
      this.filePreview = fileReader.result;
      console.log(JSON.parse(this.filePreview));
      this.repartiteurs = JSON.parse(this.filePreview);
      if (this.map.getZoom() >= 10) {
        this.removeMarkers();
        this.pushMarkers();
        this.carre = false;
      } else if (this.map.getZoom() <= 9) {
        this.removeMarkers();
        this.pushCarres();
        this.carre = true;
      }
      this.repartiteur = false;
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

}

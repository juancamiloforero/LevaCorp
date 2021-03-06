import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataUserService } from 'src/app/services/data-user.service';
import { DataService } from 'src/app/services/data.service';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit {

  listaECAs = [];
  constructor(private router: Router, public alertController: AlertController,
    private dataUserService: DataUserService, private xmlService: GenerateXMLService, private dataService: DataService) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.listaECAs = this.dataUserService.getListaECA();
  }

  pushMostrar(nombre) {
    this.router.navigate(['/preferencias/mostrar/', nombre]);
  }

  apagarECA(index: number) {
    this.guardarDatos(index, 'off');
  }

  encenderECA(index: number) {
    this.guardarDatos(index, 'on');
  }

  async guardarDatos(index: number, opcion: string) {
    const xmlModificacion = this.xmlService.crearECA({
      /* Informacion General del ECA */
      nombreECA: this.listaECAs[index].nombreECA,
      estadoECA: opcion,
    }, {
      /* Informacion evento del ECA */
      idDisp: this.listaECAs[index].idEventECA,
      ipDisp: this.listaECAs[index].ipEventECA,
      nombreDispositivo: this.listaECAs[index].nombreEventObjeto,
      datastream: this.listaECAs[index].datastreamEvent,
    }, {
      /* Informacion condicion del ECA */
      comparador: this.listaECAs[index].comparadorEvento,
      valor: this.listaECAs[index].valorEvento,
      dsFormat: this.listaECAs[index].dsFormatEvento,
      significado: this.listaECAs[index].significadoEvento,
    }, {
      /* Informacion accion del ECA */
      idDisp: this.listaECAs[index].idActionECA,
      ipDisp: this.listaECAs[index].ipActionECA,
      nombreDispositivo: this.listaECAs[index].nombreActionObjeto,
      datastream: this.listaECAs[index].datastreamAction,
      comparador: this.listaECAs[index].comparadorAction,
      valor: this.listaECAs[index].valorAccion,
      dsFormat: this.listaECAs[index].dsFormatAccion,
      significado: this.listaECAs[index].significadoAccion,
    });

    await this.dataService.modificarECA(xmlModificacion);
  }
}

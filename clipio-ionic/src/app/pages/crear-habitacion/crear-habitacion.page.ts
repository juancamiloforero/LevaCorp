import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateXMLService } from 'src/app/services/generate-xml.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.page.html',
  styleUrls: ['./crear-habitacion.page.scss'],
})
export class CrearHabitacionPage implements OnInit {

  myform: FormGroup;
  edificio = null;
  ambiente = null;
  piso = null;
  xmlRegistrarHabitacion = null;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public formBuilder: FormBuilder,
              private generarXML: GenerateXMLService, private dataService: DataService , private utilidades: UtilitiesService
    ) {
  }

  ngOnInit() {
    this.edificio = this.activatedRoute.snapshot.paramMap.get('edificio');
    this.ambiente = this.activatedRoute.snapshot.paramMap.get('ambiente');
    this.myform = this.formBuilder.group({
      nombre: ['', Validators.required],
      piso: ['', Validators.required] });
  }

  // metodo que guarda y envia el formulario para crear el xml para registrar un nueva habitacion
 async saveData() {
    this.xmlRegistrarHabitacion = this.generarXML.crearHabitacion(this.edificio, this.ambiente, this.myform.get('piso').value ,
                this.myform.get('nombre').value);
    let codigo;
    if (this.myform.valid) {
      await this.dataService.registrarEdificio(this.xmlRegistrarHabitacion)
        .then(async data => {
          codigo = await this.utilidades.alertEspecifica( 'Creando habitacion ', data);
          console.log(codigo);
          if (codigo === '1028') {
            this.myform.reset();
          }
        });
      this.dataService.getListaHabitaciones(this.edificio);
      this.router.navigate(['informacion-edificio', this.edificio]);
    }
  }
}

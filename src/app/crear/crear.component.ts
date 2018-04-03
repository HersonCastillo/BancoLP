import { Component } from '@angular/core';
import { SopaService } from '../sopaservice.service';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  public numero:string = "";
  public pin:string = "";
  public propietario:string = "";
  public monto:string = "";

  public alert:boolean = false;
  public alertMessage:string;

  public static modalMessage:string;
  public static modalTitle:string;

  constructor(private soap:SopaService, private router: Router) {}

  val(o:any): boolean{
    if(o != undefined){
      o = o.toString();
      if(o.length > 0) return true;
    }
    return false;
  }
  registrar(): void{
    if(
      this.val(this.numero) &&
      this.val(this.pin) &&
      this.val(this.propietario) &&
      this.val(this.monto)
    ){
      this.alertMessage = "";
      this.alert = false;

      this.soap.on(this.soap.TYPE.CREAR_CUENTA, {
        numero: this.numero,
        propietario: this.propietario,
        pin: this.pin,
        monto: this.monto
      }, function(response){
        if(response){
          CrearComponent.modal("¡Bien hecho!", "Tu cuenta fue registrada");
        }
        else CrearComponent.modal("¡Ups!", "Parece que hubo un error cuando se quiere almacenar tu cuenta.");
      });
    }else{
      this.alertMessage = "Campos vacíos";
      this.alert = true;
    }
  }
  static modal(title:string, message:string){
    CrearComponent.modalTitle = title;
    CrearComponent.modalMessage = message;
    $("#modal").modal('show');
    $(".form-control").val('');
  }
  getModalTitle(){
    return CrearComponent.modalTitle;
  }
  getModalMessage(){
    return CrearComponent.modalMessage;
  }
}

import { Component } from '@angular/core';
import { SopaService } from '../sopaservice.service';

declare var $: any;
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent{

  public numero:string = "";

  public static modalTitle:string;
  public static modalMessage:string;

  constructor(private soap: SopaService) { }

  buscar(): void{
    this.soap.on(this.soap.TYPE.BUSCAR_CUENTA, {
      numero: this.numero
    }, function(response){
      if(response != "null" && response != null){
        let cuenta = JSON.parse(response);
        BuscarComponent.modal(cuenta.nombre_propietario, 
          "Numero de cuenta: " + cuenta.numero_cuenta + 
          ", Pin:" + cuenta.pin +
          ", Saldo: $" + cuenta.saldo
        );
      }else BuscarComponent.modal("¡Vaya!","Cuenta no encontrada.");
    });
  }
  static modal(title:string, message:string){
    BuscarComponent.modalTitle = title;
    BuscarComponent.modalMessage = message;
    $("#modal").modal('show');
  }
  getModalTitle(): string{
    return BuscarComponent.modalTitle;
  }
  getModalMessage(): string{
    return BuscarComponent.modalMessage;
  }
}

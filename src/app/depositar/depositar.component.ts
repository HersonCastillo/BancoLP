import { Component } from '@angular/core';
import { SopaService } from '../sopaservice.service';

declare var $: any;
@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent {

  constructor(public soap: SopaService) { }

  public static modalTitle:string;
  public static modalMessage:string;

  public numero:string;
  public monto:string;
  
  depositar(): void{
    this.soap.on(this.soap.TYPE.DEPOSITAR, {
      numero: this.numero,
      monto: this.monto
    }, function(response){
      if(response){
        DepositarComponent.modal("¡Bien!", "Monto depositado con éxito.");
        $(".form-control").val('');
      }else DepositarComponent.modal("¡Mal!","Posiblemente la cuenta no se encontró o el monto no es válido.");
    });
  }
  static modal(title:string, message:string){
    DepositarComponent.modalTitle = title;
    DepositarComponent.modalMessage = message;
    $("#modal").modal('show');
  }
  getModalTitle(): string{
    return DepositarComponent.modalTitle;
  }
  getModalMessage(): string{
    return DepositarComponent.modalMessage;
  }
}

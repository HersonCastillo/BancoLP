import { Component } from '@angular/core';
import { SopaService } from '../sopaservice.service';

declare var $: any;
@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css']
})
export class RetirarComponent {

  public numero:string;
  public monto:string;

  public static modalTitle:string;
  public static modalMessage:string;

  constructor(public soap: SopaService) { }

  retirar(): void{
    this.soap.on(this.soap.TYPE.RETIRAR, {
      numero: this.numero,
      monto: this.monto
    }, function(response){
      if(response){
        RetirarComponent.modal("¡Bien!", "Monto retirado con éxito.");
        $(".form-control").val('');
      }else RetirarComponent.modal("¡Mal!","Posiblemente la cuenta no se encontró o el monto no es válido.");
    });
  }
  static modal(title:string, message:string){
    RetirarComponent.modalTitle = title;
    RetirarComponent.modalMessage = message;
    $("#modal").modal('show');
  }
  getModalTitle(): string{
    return RetirarComponent.modalTitle;
  }
  getModalMessage(): string{
    return RetirarComponent.modalMessage;
  }
}

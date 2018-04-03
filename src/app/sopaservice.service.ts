import { Injectable } from '@angular/core';
import { Client, SOAPService } from 'ngx-soap';
import { Http } from '@angular/http';

@Injectable()
export class SopaService {

  private port: number = 51558; // Puerto de mi pc en mi cashita
  private domain: string = "http://localhost:" + this.port.toString();
  private file: string = "/BancoService.asmx?WSDL";
  private url: string = this.domain + this.file;
  private client: Client;
  private jsonResponse: any;

  constructor(private soap: SOAPService, private http: Http) {
    this.http.get(this.url).subscribe(response => {
      if(response && response.text()) this.soap.createClient(response.text()).then((client: Client) => {
          this.client = client;
        });
    });
  }
  public TYPE = {
    CREAR_CUENTA: "CrearCuenta",
    DEPOSITAR: "Depositar",
    RETIRAR: "Retirar",
    BUSCAR_CUENTA: "BuscarCuentaJSON"
  }
  newConnection(domain: string, port: number): void{
    this.domain = domain;
    this.port = port;
  }
  on(type: string, options: ICuenta, fs?: Function, fe?: Function): void{
    this.client.operation(type, options).then(operation => {
      if(operation.error){
        try{
          if(typeof fe == "function") fe(operation.error);
          else return;
        }catch(ex){
          console.error(ex);
        }
      }
      this.http.post(operation.url, operation.xml, {headers:operation.headers}).subscribe(response => {
        this.jsonResponse = this.client.parseResponseBody(response.text());
        try{
          if(typeof fs == "function") fs(this.jsonResponse.Body[type+"Response"][type+"Result"]);
          else return;
        }catch(ex){
          console.error(ex);
        }
      });
    }).catch(err => {
      try{
        if(typeof fe == "function") fe(err);
        else return;
      }catch(ex){
        console.error(ex);
      }
    });
  }
}
export interface ICuenta{
  numero?: string,
  pin?: string,
  monto?: string,
  propietario?: string
}
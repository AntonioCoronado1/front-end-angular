import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente/cliente';
import { Region }  from '../Cliente/region';
import { ClienteService} from 'src/app/Cliente/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo: string="Crear Cliente";
  
  cliente: Cliente={};
  regiones: Region[]=[];  
  errores: string[]=[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

ngOnInit(): void {
  this.getRegiones();
  this.getCargarCliente();
}
getRegiones(): void{
  this.clienteService.getRegiones().subscribe(respuesta=>{
    this.regiones=respuesta;
  }
  )
}
getCargarCliente(): void{
  this.activatedRouter.paramMap.subscribe(params=>{
    let id=params.get('id');
     if(id){
       this.clienteService.getCliente(Number(id)).subscribe(cliente=>{
          this.cliente=cliente
       })
     }
  }) 

}

create(): void {
  this.clienteService.create(this.cliente).subscribe({
    next: (cliente: Cliente) => {
      this.router.navigate(['/clientes']);
    },
    error: (err) => {
      this.errores=[];
      if(err.error.errors){
        this.errores = err.error.errors as string[];
      }else if(err.error.error){
        this.errores.push(err.error.mensaje);
        console.error(err.error.error); 

      }       
      console.error('Código del error desde el backend: ' + err.status);
      
    }
  });
}
update(): void {
  this.clienteService.update(this.cliente).subscribe({
    next: (cliente) => {
      this.router.navigate(['/clientes']);
    },
    error: (err) => {
      this.errores = [];
      if (err.error.errors) {
        this.errores = err.error.errors as string[];
      } else if (err.error.error) {
        this.errores.push(err.error.mensaje);
        console.error(err.error.error);
      }
      console.error('Código del error desde el backend: ' + err.status);
    }
  });
}
compararRegion(o1: Region, o2: Region): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }
  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
}

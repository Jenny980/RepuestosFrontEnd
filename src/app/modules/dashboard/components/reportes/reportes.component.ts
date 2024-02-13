import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PrestamoService } from 'src/app/modules/shared/services/prestamo.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  chartBar: any;
  chartDona: any;

  constructor( private prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos(){
    this.prestamoService.getPrestamos()
      .subscribe((resp: any) => {
        this.prestamoResponse(resp);
      }, (error: any) => {
      console.log("error" , error);
    })
  }

  prestamoResponse(resp: any){
      const namePeriodoPago: string[] = ['Diario', 'Semanal', 'Quincenal'];
      const account: number[] = [];

      if(resp.metadata[0].Code === '00'){
        let diario = 0;
        let semanal = 0;
        let quincenal = 0;
        let valorCreditos = 0;
        let ganancias = 0;

        let listPrestamos = resp.prestamoResponse.prestamos;
        listPrestamos.forEach((element: any) => {
            valorCreditos = valorCreditos + element.credito;
            ganancias = ganancias + element.credito * (element.porcentaje/100) + element.credito;
            if(element.periodoPago === 'Diario'){
              diario++;
            } else {
              if(element.periodoPago === 'Semanal'){
                semanal++;
              } else {if(element.periodoPago === 'Quincenal'){
                quincenal++;
              }};
            }
        });
        account.push(diario, semanal, quincenal);

        this.chartBar = new Chart('canvas-bar' ,{
          type: 'bar',
          data: {
            labels: namePeriodoPago,
            datasets: [
              {label: 'Prestamos' , data: account}
            ]
          }
        });

        const nameGanancias: string[] = ['Inversión $', 'Inversión + ganancias $'];
        const valores: number[] = [];

        valores.push(valorCreditos, ganancias)
        this.chartDona = new Chart('canvas-doughnut' ,{
          type: 'doughnut',
          data: {
            labels: nameGanancias,
            datasets: [
              {label: 'Prestamos' , data: valores}
            ]
          }
        });
      }
      
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Person } from '../interfaces/person.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-index-person',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule, //Module for pagination
  ],
  templateUrl: './index-person.component.html',
  styleUrl: './index-person.component.css'
})
export class IndexPersonComponent implements OnInit {
  
  // INSTALL THIS TO WORK WITH POGINATION.
  // npm install ngx-pagination --save
  // https://michaelbromley.github.io/ngx-pagination/#/

  //variables for pagination
  p: number = 1;
  total: number = 0;
      

  persons: Person[] = [];

  //private apiService = inject(PersonService);

  constructor(
    private apiService: PersonService
  ) {}

  ngOnInit(): void {
   
      //this.fetchPersons();
      this.fetchPersons();
  }


  /*
  * v1. without pagination
  fetchPersons() : void{
    
    this.apiService.getPeople().subscribe({
      next: (data)=>{        
         this.persons = data;
         
      },
      error: (err)=>{
       console.error('Error fetching persons', err);
      }
     });

  }
    */

  fetchPersons() : void{
    
    this.apiService.getPeople(this.p).subscribe({
      next: (data)=>{        

        this.persons = data.data;
        this.total = data.total;
        
         console.log(data)
      },
      error: (err)=>{
       console.error('Error fetching persons', err);
      }
     });

  }



  deletePerson(id: any){
    if (confirm("Realmente deseas eliminarlo?") == true) {
      
      this.apiService.deletePerson(id).subscribe({
        next: (data)=>{        
          if(data.success){
            alert("Eliminado correctamente");
            //load people again
            this.fetchPersons();
          }
           
        },
        error: (err)=>{
          alert("Error al eliminar");
         console.error('Error deleting person', err);
        }
       });
  

    } else {
      alert("Operación cancelada");
    }

  }

  pageChangeEvent(event: number){
    this.p = event;
    this.fetchPersons();
    
  }


  

}

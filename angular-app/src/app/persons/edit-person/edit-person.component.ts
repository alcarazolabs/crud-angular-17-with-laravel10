import { Person } from './../interfaces/person.interface';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../services/person.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  templateUrl: './edit-person.component.html',
  styleUrl: './edit-person.component.css'
})
export class EditPersonComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  private apiService = inject(PersonService);

  person = <Person>{};

  submitted = false;


  citiesList : City[] = [
    { id: 1, name: 'Lambayeque'},
    { id: 2, name: 'Lima'},
    { id: 3, name: 'Arequipa'},
    { id: 4, name: 'Cusco'},
    { id: 5, name: 'Otro'}
  ]


  private readonly formBuilder = inject(NonNullableFormBuilder)

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    dni: new FormControl(''),
    genero: new FormControl(''),
    city: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  
  ngOnInit(): void {
      
    this.form = this.formBuilder.group({
        
      fullname: ['', Validators.required],
      dni:
        ['',
          [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
          ] 
      ],
      genero: ['', Validators.required],
      city: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]

    });

    //get route parameter :id
    this._route.params.subscribe(params => {
      //get person by id
      //console.log(params['id'])
      this.getPersonById(params['id']);
    })
    
  }

  getPersonById(id: number){

    this.apiService.getPersonById(id).subscribe({
      next: (data)=>{        
         this.person = data;
         //fill the form with values
         this.form.patchValue({
          fullname: data.fullname,
          dni: data.dni,
          genero: data.genero,
          city: data.city,
          acceptTerms: data.acceptTerms === 1 ? true : false
        });
      },
      error: (err)=>{
       console.error('Error fetching person', err);
      }
     });

  }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    //console.log(JSON.stringify(this.form.value, null, 2));
    //Registrar la persona
  
     const personData: Person = this.form.value as Person;
     //set the id
     personData.id = this.person.id

     this.apiService.updatePerson(personData).subscribe({      
      next: () => {
        console.log("Actualización exitoso");
        this._router.navigate(["/persons/index"]);

      },
      error: (e) => {        
        console.log("Error al actualizar: "+ JSON.stringify(e));
        
      }
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


}

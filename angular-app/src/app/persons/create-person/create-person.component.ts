import { Component, inject, OnInit } from '@angular/core';
import { City } from '../../models/city.model';
import { AbstractControl, FormGroup, FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person.service';
import { HttpClientModule } from '@angular/common/http';
import { Person } from '../interfaces/person.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.css'
})
export class CreatePersonComponent implements OnInit {

  private apiService = inject(PersonService);
  private _router = inject(Router);

 // constructor(apiService : PersonService){}

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

  }


  
  submitted = false;

 
  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    //console.log(JSON.stringify(this.form.value, null, 2));
    //Registrar la persona
  
     const personData: Person = this.form.value as Person;
     this.apiService.createPerson(personData).subscribe({      
      next: () => {
        console.log("Registro exitoso");
        this._router.navigate(["/persons/index"]);

      },
      error: (e) => {        
        console.log("Error al registrar: "+ JSON.stringify(e));
        
      }
    });

  }
    

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}

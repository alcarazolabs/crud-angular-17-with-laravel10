import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePersonComponent } from './persons/create-person/create-person.component';
import { IndexPersonComponent } from './persons/index-person/index-person.component';
import { EditPersonComponent } from './persons/edit-person/edit-person.component';

export const routes: Routes = [
    { path: 'persons/create', component: CreatePersonComponent },
    { path: 'persons/index', component: IndexPersonComponent },
    { path: 'persons/:id/edit', component: EditPersonComponent},
    { path: 'home', component: HomeComponent }
];

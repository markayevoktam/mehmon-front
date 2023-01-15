import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { MehmonComponent } from './component/mehmon/mehmon.component';
import { material_imports } from 'src/shared/material-import';



@NgModule({
  declarations: [
    AdminComponent,
    MehmonComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    ...material_imports
  ]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }

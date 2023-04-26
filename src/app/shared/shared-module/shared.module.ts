import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberToBooleanPipe } from '../pipes/number-to-boolean.pipe';
import { LoadingService } from '../loading/service/loading.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../loading/interceptor/loading.interceptor';
import { LoadingComponent } from '../loading/loading/loading.component';



@NgModule({
  declarations: [
    TableComponent,
    PopUpComponent,
    NumberToBooleanPipe,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    CustomMaterialModule,
    PopUpComponent,
    LoadingComponent,
  ],
  providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
})
export class SharedModule { }

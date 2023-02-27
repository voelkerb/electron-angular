import { FileSizePipe } from './pipes/file-size.pipe';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { ObjectSizePipe } from './pipes/object-size.pipe';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        ObjectSizePipe,
        FileSizePipe,
    ],
    imports: [
        CommonModule, 
        TranslateModule, 
        FormsModule,
        DatePipe,
    ],
    exports: [
        TranslateModule, 
        FormsModule,
        ObjectSizePipe,
        DatePipe,
        FileSizePipe,
    ],
    providers: [
        ObjectSizePipe,
        FileSizePipe,
        DatePipe,
    ]
})
export class SharedModule { }

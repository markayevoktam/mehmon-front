import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from 'src/shared/delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Mehmon } from 'src/app/model/mehmon';
import { MehmonService } from 'src/app/service/mehmon.service';
import { FaylService } from 'src/app/service/fayl.service';
import { AccountService } from 'src/app/core/account.service';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mehmon',
  templateUrl: './mehmon.component.html',
  styleUrls: ['./mehmon.component.scss']
})
export class MehmonComponent implements OnInit {
  mehmonForm!: FormGroup;
  tahrirRejim = false;
  progres=false;
  rasm: any; 
  rasmManzil!:string;
  user!:User;
  displayedColumns: string[] = [
    'id',
    'nom',
    'qavat',
    'xonaTur',
    'sigim',
    'narx',
    'narx_1',
    'info',
    'amal'
  ];
  dataSource: any;
  surovBajarilmoqda = false;
  formOchiq = false;
  expandedElement: any;
  filter = new FormControl('filter');
  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




  constructor(
    private fb: FormBuilder,
    private mehmonSVC: MehmonService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog,
    private faylService: FaylService,
    private accountService: AccountService
    ) {}
    ngAfterViewInit(): void {
      this.sort.sortChange.subscribe(() => this.load());

      this.load();
    }



  ngOnInit(): void {
    this.mehmonForm = this.fb.group({
      id: [],
      nom: ['', Validators.required],
      qavat: ['', Validators.required],
      sigim: ['', Validators.required],
      xonaTur: ['', Validators.required],
      narx: ['', Validators.required],
      narx_1: [''],
      info: ['']
    });

    this.accountService.identity().subscribe(data=>{
      if(data){
        this.user=data;
        this.rasmManzilOzgar();
      }
    })
  }

  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
      console.log(key);
    }
    this.mehmonSVC.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: this.sort.active+","+this.sort.direction ?? 'id'
    }).subscribe((data) => {

      console.log(data);
      this.dataSource = data.content;
      this.length = data.totalElements;
      this.progres=false;
    });
  }



  saqlash() {
    this.progres=true;
    this.surovBajarilmoqda = true;
    let mehmon = this.mehmonForm.getRawValue();

    let surov;
    if (this.tahrirRejim)
      surov = this.mehmonSVC.update(mehmon);
    else
      surov = this.mehmonSVC.create(mehmon);


    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      })



  }


  tozalash() {
    this.mehmonForm.reset({});
    this.formOchiq = false;
    this.tahrirRejim = false;
  }

  tahrir(mehmon: Mehmon) {
    let m = Object.create(mehmon)
    this.mehmonForm.reset(mehmon);
    this.tahrirRejim = true;
    this.formOchiq = true;
  }

  ochirish(mehmon: Mehmon) {
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.mehmonSVC.deleteById(mehmon.id).subscribe(data => {
          this.load();
        })
      }

    })
  }

  
  rasmManzilOzgar(){
    if(this.rasm)
    this.rasmManzil = environment.baseApi + "/api/file/download/"+this.rasm.id;
    
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];
    if(file){
      this.faylService.uploadFayl(file).subscribe(f=>{
        this.rasm=f;
        this.rasmManzilOzgar();
       
      })
    }

  }




}




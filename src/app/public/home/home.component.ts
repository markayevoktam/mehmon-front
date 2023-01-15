import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Mehmon } from 'src/app/model/mehmon';
import { MehmonService } from 'src/app/service/mehmon.service';
import { PublicService } from 'src/app/service/public.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit{
  mehmonlar: Mehmon[]=[];
  length = 100;
  constructor(private publicService: PublicService,
    private mehmonService: MehmonService


  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.mehmonService.getAll('').subscribe(data => {
      this.mehmonlar = data.content;
    })

  }

  ngOnInit(): void {
  }


  
  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
    }

    this.mehmonlar = [];
    let params: any = {
      key: key,
      sort: 'id'
    };




    this.publicService.getAll(params).subscribe(royxat => {
      console.log(royxat);
      this.mehmonlar = royxat.content;
      this.length = royxat.totalElements;
    });

  }


 getRasm(file: any) {
    if (file)
      return environment.baseApi + "/api/file/download/" + file.id;
    else return "https://flixarena.com/wp-content/uploads/2020/04/Netflix-Winner.png"
  }


  
}

 
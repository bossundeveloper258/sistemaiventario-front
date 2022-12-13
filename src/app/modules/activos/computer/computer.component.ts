import { Component, OnInit } from '@angular/core';
import { ComputersService } from 'src/app/shared/services/api/computers/computers.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  computersSet: Array<any> = [];
  search: string = "";

  constructor(
    private computersService: ComputersService,
  ) { }

  ngOnInit(): void {
    this.listComputer();
  }

  listComputer(  ):void {
    this.computersSet = [];
    this.computersService.getAll( this.search ).subscribe( (res) => {
      this.computersSet = res.data
    })
  }

  onSearch(): void{
    this.listComputer();
  }

}

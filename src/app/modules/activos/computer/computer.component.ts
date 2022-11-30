import { Component, OnInit } from '@angular/core';
import { ComputersService } from 'src/app/shared/services/api/computers/computers.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  computersSet: Array<any> = [];
   
  constructor(
    private computersService: ComputersService,
  ) { }

  ngOnInit(): void {
    this.listComputer();
  }

  listComputer():void {
    this.computersService.getAll().subscribe( (res) => {
      this.computersSet = res.data
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { CostcenterService } from '../shared/services/api/costcenter/costcenter.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    constructor(
        private costcenterService: CostcenterService
    ) { }

    ngOnInit(): void {
        this.costcenterService.getAll().subscribe(
            (res) => {
              
            }
          )
    }
}

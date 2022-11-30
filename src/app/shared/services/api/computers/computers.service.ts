import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringformat } from 'src/app/shared/utility/functions';
import { HttpServiceService } from '../../http-service.service';
import { ComputerModel, ComputerModelFindAll } from '../models/computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {

  private basicUrl = 'computers';

  constructor(
    private httpService: HttpServiceService
  ) { }

  // pageIndex: number, pageSize: number , pageSort: string
  public getAll(): Observable<ComputerModelFindAll>
  {
    let url = this.basicUrl + '/find-all';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.get<ComputerModelFindAll>( url );
  }

  public create(body: any): Observable<any>
  {
    let url = this.basicUrl + '/create';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.post<any>( url , body );
  }

  public edit(userId: number): Observable<ComputerModel>{
    let url = this.basicUrl + '/'+ userId.toString();
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.get<any>( url ).pipe( map( m => m.data) );
  }

  public update(body: any, id: number): Observable<any>
  {
    let url = this.basicUrl + '/' + id.toString();
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.put<any>( url , body );
  }
}

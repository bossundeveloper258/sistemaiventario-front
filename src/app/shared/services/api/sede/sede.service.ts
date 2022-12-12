import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringformat } from 'src/app/shared/utility/functions';
import { HttpServiceService } from '../../http-service.service';
import { SedeModel, SedeModelFindAll } from '../models/sede.model';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private basicUrl = 'sedes';

  constructor(
    private httpService: HttpServiceService
  ) { }

  // pageIndex: number, pageSize: number , pageSort: string
  public getAll(): Observable<SedeModelFindAll>
  {
    let url = this.basicUrl + '/find-all';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.get<SedeModelFindAll>( url );
  }

  public create(body: any): Observable<any>
  {
    let url = this.basicUrl + '/create';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.post<any>( url , body );
  }

  public edit(userId: number): Observable<SedeModel>{
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

  public search( businessId: number , status: number = 1 ): Observable<any>
  {
    let url = this.basicUrl + '/search?business={0}&status={1}';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url, businessId, status);
    return this.httpService.get<any>( url );
  }

  public updateStatus(body: any, id: number ): Observable<any>
  {
    let url = this.basicUrl + '/' + id.toString() + '/status';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url);
    return this.httpService.put<any>( url , body );
  }


}

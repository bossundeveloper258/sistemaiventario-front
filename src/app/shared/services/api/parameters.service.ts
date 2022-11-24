import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stringformat } from '../../utility/functions';
import { HttpServiceService } from '../http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  private basicUrl = 'parameters';

  constructor(
    private httpService: HttpServiceService
  ) { }

  public search( parentId: number ): Observable<any>
  {
    let url = this.basicUrl + '/search?parent={0}';
    // url = stringformat(url, pageIndex, pageSize, pageSort);
    url = stringformat(url, parentId);
    return this.httpService.get<any>( url );
  }
}

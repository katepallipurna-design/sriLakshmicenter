import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockSubmitService {
  submit(payload: unknown): Observable<{ ok: boolean; id: string }> {
    const id = `REQ-${Math.floor(Math.random() * 90000 + 10000)}`;
    return of({ ok: true, id }).pipe(delay(600));
  }
}

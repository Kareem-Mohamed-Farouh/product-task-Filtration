import { HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      return throwError(() => {
        return err;
      });
    })
  );
};

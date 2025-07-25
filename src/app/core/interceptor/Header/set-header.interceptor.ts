import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let platform = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    if (localStorage.getItem('Token') !== undefined) {
      if (localStorage.getItem('Token') !== null) {
        let userHeader: any = { token: localStorage.getItem('Token') };

        req = req.clone({
          setHeaders: userHeader,
        });
      }
    }
  }
  return next(req);
};

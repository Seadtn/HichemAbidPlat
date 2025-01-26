// import { inject, Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, switchMap, tap } from 'rxjs/operators';
// import * as AuthActions from './auth.actions';
// import { Router } from '@angular/router';
// import { AuthService, mapSavedLogin } from '../../services/auth/auth.service';
// import { ToastService } from '../../services/toast/toast.service';
// import { IdentityToken } from '../../models/dtos/IdentityDtos/IdentityToken';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { mapApiError } from '../../models/common/Error';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthEffects {
//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private toastService: ToastService,
//     private spinner: NgxSpinnerService,
//   ) {}
//   actions$ = inject(Actions);

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       switchMap(({ username, password, deviceInfo, returnUrl }) =>
//         this.authService
//           .login({
//             email: username,
//             password,
//             plateFormInfo: deviceInfo,
//           })
//           .pipe(
//             map((result) => {
//                 return AuthActions.loginSuccess({
//                   data: mapSavedLogin(result),
//                   returnUrl: returnUrl,
//                   tempPassword: undefined,
//                 });
//             }),
//             catchError((error) => {
//               console.error(error);
              
//               try {
//                 return of(
//                   AuthActions.loginFailure({
//                     error: error.error.errors.map(mapApiError),
//                   })
//                 );
//               } catch (err) {
//                 return of(
//                   AuthActions.loginFailure({
//                     error: [
//                       {
//                         code: error?.status?.toString() ?? error?.message ?? "unknown error",
//                         message: error?.error?.message ?? error?.message ?? "unknown error",
//                       },
//                     ],
//                   })
//                 );
//               }
//             })
//           )
//       ),
//       tap((result) => {
//         if (result.type === AuthActions.loginFailure.type) {
//           result.error.forEach((error) => {
//             this.toastService.showError(error.message);
//           });
//         } else if (result.type === AuthActions.loginSuccess.type) {
//           this.toastService.showSuccess('Login successful');
//         }
//       })
//     )
//   ); // dispatch: true (default) : this action is dispatching other actions up on the finish (loginFailure or loginSuccess)

//   loginSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginSuccess),
//         tap((props) => {
//           this.authService.saveLogin(props.data,props.tempPassword);
//         }),
//         tap(({returnUrl,data}) => {
//           if(returnUrl)
//             this.router.navigate([returnUrl]);
//           else 
//             this.router.navigate(['/home']);
//         }),
//         tap((props) => {
//           this.displayExpiryTimesWarning(props.data.refreshToken);
//         })
//       ),
//     { dispatch: false } // dispatch: false : this action is not dispatching any other actions up on the finish
//   );

//   logout$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.logout),
//         tap((props) => {
//           this.spinner.show();
//           this.authService.clearSavedLogin();
//           this.router.navigate(['/sign-in'],{ queryParams: { returnUrl: props.returnUrl ?? "/home" } }).then(() => {
//             this.spinner.hide();
//             window.location.reload();
//           });
//         })
//       ),
//     { dispatch: false }
//   );

//   browserReload$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.browserReload),
//         tap((props) => {
//           setTimeout(() => {
//             this.displayExpiryTimesWarning(props.data.refreshToken);
//           }, 100);
//         })
//       ),
//     { dispatch: false }
//   );

//   checkAuth$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.checkAuth),
//       switchMap(() => {
//         const isLoggedIn = this.authService.isLoggedIn;
//         let savedLogin = this.authService.getSavedLogin();
//         if (isLoggedIn && savedLogin) {
//           return of(AuthActions.loginSuccess({ data: savedLogin }));
//         }
//         return of(AuthActions.logout({returnUrl:undefined}));
//       })
//     ),{ dispatch: false }
//   ); 


//   refreshAccessToken$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.refreshAccessToken),
//         tap((props) => {
//           setTimeout(() => {
//             this.toastService.showInfo('Your session has been refreshed', 'Session Refreshed',3000);
//           }, 100);
//         })
//       ),
//     { dispatch: false }
//   );

//   private displayExpiryTimesWarning(refreshToken: IdentityToken) {
//     const now = new Date();
//     const expiryTime = new Date(refreshToken.expiresAt);
//     const timeDiff = expiryTime.getTime() - now.getTime();
//     const minutesDiff = Math.floor(timeDiff / (1000 * 60));
//     const hoursDiff = Math.floor(minutesDiff / 60);
//     const remainingMinutes = minutesDiff % 60;
    
//     if (expiryTime < now) {
//       return this.toastService.showError('Your session has expired, please login again');
//     }
  
//     if (minutesDiff <= 30) {
//       const expiryTimeString = expiryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       return this.toastService.showStickyError(`Your session will expire at ${expiryTimeString}, consider resigning in`, 'Session Expiring Soon');
//     }
  
//     if (hoursDiff < 1) {
//       return this.toastService.showWarning(`Your session will expire in ${minutesDiff} minutes, consider resigning in`, 'Session Expiring Soon',7000);
//     }
  
//     if (hoursDiff < 5) {
//       const timeString = `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
//       return this.toastService.showWarning(`Your session will expire in ${timeString}, consider resigning in`, 'Session Expiry Warning',7000); 
//     }
//   }
// }

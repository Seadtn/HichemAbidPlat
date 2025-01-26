// import { inject, Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import * as AuthActions from '../auth/auth.actions';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoadingEffects {
//   constructor(private spinner: NgxSpinnerService) {}
//   actions$ = inject(Actions);

//   showSpinner$ = createEffect(
//     () => this.actions$.pipe(
//         ofType(AuthActions.login),
//         tap(
//             () => this.spinner.show()
//         )),
//     { dispatch: false }
//   );

//   hideSpinner$ = createEffect(
//     () => this.actions$.pipe(
//         ofType(AuthActions.loginFailure, AuthActions.loginSuccess),
//         tap(
//             () => this.spinner.hide()
//         )),
//     { dispatch: false }
//   );
// }

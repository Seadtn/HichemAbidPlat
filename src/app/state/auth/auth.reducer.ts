// import { createReducer, on } from '@ngrx/store';
// import * as AuthActions from './auth.actions';
// import { provideState } from '@ngrx/store';
// import { IdentityToken } from '../../models/dtos/IdentityDtos/IdentityToken';
// import { UserDto } from '../../models/dtos/IdentityDtos/userDto';
// import { stateStatus } from '../../shared/enum/stateStatus';
// import { Error } from '../../models/common/Error';

// export interface AuthState {
//   accessToken: IdentityToken | null;
//   refreshToken: IdentityToken | null;
//   isAuthenticated: boolean;
//   error: Array<Error> | null;
//   stateStatus: stateStatus;
//   user: UserDto | null;
// }

// export const initialState: AuthState = {
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
//   error: null,
//   user: null,
//   stateStatus: stateStatus.idle,
// };

// export const authReducer = createReducer(
//   initialState,

//   on(AuthActions.login, (state) => ({
//     ...state,
//     stateStatus: stateStatus.loading,
//     isAuthenticated: false,
//     error: null,
//   })),

//   on(
//     AuthActions.loginSuccess,
//     AuthActions.browserReload,
//     (state, { data }) => ({
//       stateStatus: stateStatus.success,
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//       user: data.user,
//       isAuthenticated: true,
//       error: null,
//     })
//   ),

//   on(AuthActions.loginFailure, (state, { error }) => ({
//     ...initialState,
//     stateStatus: stateStatus.error,
//     error,
//   })),

//   on(AuthActions.logout, (state) => ({
//     ...initialState,
//     stateStatus: stateStatus.success,
//   })),

//   on(AuthActions.authOperationInProgress, (state, { message }) => ({
//     ...state,
//     stateStatus: stateStatus.loading,
//   })),

//   on(AuthActions.refreshAccessToken, (state, token) => ({
//     ...state,
//     accessToken: token,
//   }))
// );

// export const provideAuthStore = () => provideState('auth', authReducer);

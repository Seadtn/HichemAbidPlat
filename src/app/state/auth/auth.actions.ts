// import { createAction, props } from '@ngrx/store';
// import { UserDto } from '../../models/dtos/IdentityDtos/userDto';
// import { IdentityToken } from '../../models/dtos/IdentityDtos/IdentityToken';
// import { SavedLogin } from '../../services/auth/auth.service';
// import { Error } from '../../models/common/Error';

// export const login = createAction(
//   '[Auth] Login',
//   props<{ username: string; password: string; deviceInfo: string , returnUrl:string }>()
// );

// export const loginSuccess = createAction(
//   '[Auth] Login Success',
//   props<{ data: SavedLogin, returnUrl?:string | undefined | null, tempPassword?: string | undefined }>()
// );

// export const loginFailure = createAction(
//   '[Auth] Login Failure',
//   props<{ error: Array<Error> }>()
// );

// export const authOperationInProgress = createAction(
//   '[Auth] Login/logout in progress',
//   props<{ message: string }>()
// );

// export const refreshAccessToken = createAction(
//   '[Auth] Refresh Access token',
//   props<IdentityToken>()
// );

// export const logout = createAction(
//   '[Auth] Logout',
//   props<{returnUrl? :string | undefined }>()
// );

// export const getAuthContext = createAction('[Auth] Get Auth Context');

// export const checkAuth = createAction('[Auth] Check Auth');


// export const browserReload = createAction('[App Component] Browser Reload',props<{data : SavedLogin}>());



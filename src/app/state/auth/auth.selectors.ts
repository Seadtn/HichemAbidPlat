// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AuthState } from './auth.reducer';
// import { ADMIN_ROLE, MANAGER_ROLE, RH_ROLE } from '../../shared/const/consts';

// export const authState = createFeatureSelector<AuthState>('auth');

// export const selectIsAuthenticated = createSelector(
//   authState,
//   (state: AuthState) => state.isAuthenticated
// );

// export const selectCurrentUser = createSelector(
//   authState,
//   (state: AuthState) => state.user
// );

// export const selectAuthError = createSelector(
//   authState,
//   (state: AuthState) => state.error
// );

// export const selectAuth = createSelector(
//   authState,
//   (state: AuthState) => state
// );

// export const selectAccessToken = createSelector(
//   authState,
//   (state: AuthState) => state.accessToken?.value
// );

// export const selectCurrentUserRole = createSelector(
//   authState,
//   (state:AuthState) : typeof ADMIN_ROLE | typeof RH_ROLE | typeof MANAGER_ROLE | null=> {
//     if(state.user?.role == undefined)
//       return null;

//     var userRole = state.user.role;
//     if(userRole == ADMIN_ROLE)
//       return ADMIN_ROLE
//     if(userRole == RH_ROLE)
//       return RH_ROLE
//     if(userRole == MANAGER_ROLE)
//       return MANAGER_ROLE
//     return null;
//   }
// );
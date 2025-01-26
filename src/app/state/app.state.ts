
import { AuthState } from './auth/auth.reducer';
export interface AppState {
  auth: AuthState
}

export const applicationRuntimeChecks={
  strictStateImmutability: true,
  strictActionImmutability: true,
  //strictStateSerializability: true,
  strictActionSerializability: true,
  strictActionWithinNgZone: true,
  strictActionTypeUniqueness: true,
}

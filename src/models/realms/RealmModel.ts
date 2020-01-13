import { IPlayerModel } from './PlayerModel';

export interface IRealmModel {
  id: number;
  name: string;
  online: boolean;
  allowedSecurityLevel: number;
  timezone: number;

  onlinePlayers: IPlayerModel[];
}

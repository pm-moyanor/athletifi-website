export interface Player {
  club?: string;
  club_logo?: string;
  name: string;
  number?: string | number;
  team?: string;
}

export interface PlayerStats {
  Attacking: number;
  Defending: number;
  Goalkeeping: number;
  Mentality: number;
  Physical: number;
}

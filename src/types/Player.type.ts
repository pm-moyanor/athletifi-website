export interface Player {
  club?: string;
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

export const samplePlayers: Player[] = [
  { name: 'Paul Smith' },
  { name: 'Carlos Fuentes' },
  { name: 'Leo Messi' },
  { name: 'Paul Sanders' },
  { name: 'Frank Lampard' },
  { name: 'Luis Diaz' },
  { name: 'Andrea Pirlo' },
  { name: 'Andres Iniesta' },
];

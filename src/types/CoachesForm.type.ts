export interface FormData {
    team?: string;
    newOrExistingMatch?: 'existing' | 'new';
    existingMatch?: string;
    opponentTeam?: string;
    matchDate?: string;
    matchTime?: string;
    matchType?: string;
    venue?: string;
    homeAway?: string;
    yourTeamColors?: string;
    opponentColors?: string;
    permanentRoster: { id: number; name: string; jerseyNumber: string }[];
    matchRoster: { id: number; name: string; jerseyNumber: string }[];
  }

   export interface Player {
    // Define the Player interface
    id: number;
    name: string;
    jerseyNumber: string;
    note?: string;
  }

  export interface FormEvent {
    target: {
      name: string;
      value: string | Player | Player[];
    };
  }

//   export interface ReviewForm extends FormData {
//     // Define the ReviewForm interface
//     setActiveStep: (step: number) => void;
//   }

//   export interface ActiveStep {
//     setActiveStep: (step: number) => void;
//   }
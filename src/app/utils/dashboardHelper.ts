import { IAttributeConfig, IRatingRaw } from '@/types/Dashboard.type';

export const attributeConfigs: IAttributeConfig = {
  skill: {
    color: '#27B6BD',
    description: 'Skill description goes here',
  },
  attacking: {
    color: '#DA393B',
    description: 'Attacking description goes here',
  },
  goalkeeping: {
    color: '#DA393B',
    description: 'Goalkeeping description goes here',
  },
  physical: {
    color: '#B09E03',
    description: 'Physical description goes here',
  },
  mentality: {
    color: '#FC6713',
    description: 'Mentality description goes here',
  },
  defending: {
    color: '#5A54A2',
    description: 'Defending description goes here',
  },
};

export const FieldPlayerRatings = [
  'skill',
  'attacking',
  'physical',
  'mentality',
  'defending',
];

export const GoalKeeperRatings = [
  'skill',
  'goalkeeping',
  'physical',
  'mentality',
  'defending',
];

export function transformRatingData(data: IRatingRaw, is_goalkeeper = false) {
  return Object.keys(data).flatMap((x) => {
    switch (x) {
      case 'rating_date':
        return [];
      case 'attacking_goalkeeping':
        if (is_goalkeeper)
          return {
            attribute: 'goalkeeping',
            rating: Math.trunc(Number(data[x as keyof IRatingRaw])),
          };
        return {
          attribute: 'attacking',
          rating: Math.trunc(Number(data[x as keyof IRatingRaw])),
        };
      default:
        return {
          attribute: x,
          rating: Math.trunc(Number(data[x as keyof IRatingRaw])),
        };
    }
  });
}

export function filterRatingData(
  data: IRatingRaw[],
  is_goalkeeper = false,
): IRatingRaw[] {
  return data.map((x: IRatingRaw) => {
    if (is_goalkeeper) {
      return {
        rating_date: x.rating_date,
        skill: Math.trunc(Number(x.skill)),
        goalkeeping: Math.trunc(Number(x.attacking_goalkeeping)),
        physical: Math.trunc(Number(x.physical)),
        mentality: Math.trunc(Number(x.mentality)),
        defending: Math.trunc(Number(x.defending)),
      };
    } else {
      return {
        rating_date: x.rating_date,
        skill: Math.trunc(Number(x.skill)),
        attacking: Math.trunc(Number(x.attacking_goalkeeping)),
        physical: Math.trunc(Number(x.physical)),
        mentality: Math.trunc(Number(x.mentality)),
        defending: Math.trunc(Number(x.defending)),
      };
    }
  });
}

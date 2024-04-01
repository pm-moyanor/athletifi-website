import { IAttributeConfig } from '@/types/Dashboard.type';

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

export function transformRatingData(data, is_goalkeeper = false) {
  return Object.keys(data).flatMap((x) => {
    switch (x) {
      case 'rating_date':
        return [];
      case 'attacking_goalkeeping':
        if (is_goalkeeper)
          return {
            attribute: 'goalkeeping',
            rating: Math.trunc(Number(data[x])),
          };
        return {
          attribute: 'attacking',
          rating: Math.trunc(Number(data[x])),
        };
      default:
        return {
          attribute: x,
          rating: Math.trunc(Number(data[x])),
        };
    }
  });
}

export function filterRatingData(data, is_goalkeeper = false) {
  return data.map((x) => {
    const rating = x.attacking_goalkeeping;
    delete x.attacking_goalkeeping;
    if (is_goalkeeper) {
      x['goalkeeping'] = rating;
    } else {
      x['attacking'] = rating;
    }
    return x;
  });
}

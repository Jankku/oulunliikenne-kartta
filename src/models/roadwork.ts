import { RoadWorkSchema } from '../graphql/roadwork';

export type RoadworkModel = {
  id: string;
  description: string;
};

export const fromSchemaToModel = (roadwork: RoadWorkSchema): RoadworkModel => {
  return {
    id: roadwork.roadworkId,
    description: roadwork.description.fi,
  };
};

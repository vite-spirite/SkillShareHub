import { Topic } from "../entity/topic.entity";

export interface CreateTopic extends Omit<Topic, 'id'| 'createdAt'|'identifier'|'createdBy'> {}
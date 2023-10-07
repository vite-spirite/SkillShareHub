import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entity/topic.entity';
import { Raw, Repository } from 'typeorm';
import { CreateTopic } from './dts/topic.create.dto';

@Injectable()
export class TopicService {
    constructor(@InjectRepository(Topic) private topicRepository: Repository<Topic>) {}

    async createTopic(data: CreateTopic): Promise<Topic> {
        const {name, createdById} = data;

        const topic = this.topicRepository.create({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            identifier: name.trim().toLowerCase(),
            createdById: createdById
        });

        return await this.topicRepository.save(topic);
    }

    async getTopics(): Promise<Topic[]> {
        return await this.topicRepository.find();
    }

    async getTopicLike(name: string): Promise<Topic[]> {
        return await this.topicRepository.find({
            where: {
                identifier: Raw(alias => `${alias} ILIKE '%${name.trim().toLowerCase()}%'`)
            }
        });
    }

    async findOrCreate(name: string, createdById: number): Promise<Topic> {
        const topic = await this.topicRepository.findOne({where: {identifier: name.trim().toLowerCase()}});

        if(topic) {
            return topic;
        }

        const newTopic = await this.createTopic({name, createdById});

        return newTopic;
    }
}

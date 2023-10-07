import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entity/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
  ],
  providers: [TopicResolver, TopicService],
  exports: [TypeOrmModule, TopicService]
})
export class TopicModule {}

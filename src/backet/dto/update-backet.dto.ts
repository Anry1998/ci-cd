import { PartialType } from '@nestjs/mapped-types';
import { CreateBacketDto } from './create-backet.dto';

export class UpdateBacketDto extends PartialType(CreateBacketDto) {}

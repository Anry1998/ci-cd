import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BacketService } from './backet.service';
import { CreateBacketDto } from './dto/create-backet.dto';
import { UpdateBacketDto } from './dto/update-backet.dto';

@Controller('backet')
export class BacketController {
  constructor(private readonly backetService: BacketService) {}

  @Post()
  create(@Body() createBacketDto: CreateBacketDto) {
    return this.backetService.create(createBacketDto);
  }

  @Get()
  findAll() {
    return this.backetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBacketDto: UpdateBacketDto) {
    return this.backetService.update(+id, updateBacketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backetService.remove(+id);
  }
}

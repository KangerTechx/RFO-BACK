import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArrangorsService } from './arrangors.service';
import { CreateArrangorDto } from './dto/create-arrangor.dto';
import { UpdateArrangorDto } from './dto/update-arrangor.dto';

@Controller('arrangors')
export class ArrangorsController {
  constructor(private readonly arrangorsService: ArrangorsService) {}

  @Post()
  create(@Body() createArrangorDto: CreateArrangorDto) {
    return this.arrangorsService.create(createArrangorDto);
  }

  @Get()
  findAll() {
    return this.arrangorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arrangorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArrangorDto: UpdateArrangorDto,
  ) {
    return this.arrangorsService.update(id, updateArrangorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arrangorsService.remove(id);
  }
}

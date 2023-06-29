import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompositorsService } from './compositors.service';
import { CreateCompositorDto } from './dto/create-compositor.dto';
import { UpdateCompositorDto } from './dto/update-compositor.dto';

@Controller('compositors')
export class CompositorsController {
  constructor(private readonly compositorsService: CompositorsService) {}

  @Post()
  create(@Body() createCompositorDto: CreateCompositorDto) {
    return this.compositorsService.create(createCompositorDto);
  }

  @Get()
  findAll() {
    return this.compositorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compositorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompositorDto: UpdateCompositorDto,
  ) {
    return this.compositorsService.update(id, updateCompositorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compositorsService.remove(id);
  }
}

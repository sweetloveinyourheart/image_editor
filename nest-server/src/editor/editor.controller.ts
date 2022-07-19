import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from './config/multer.config';
import { AddWatermarkDTO } from './dto/add-watermark.dto';
import { EditorService } from './editor.service';
import { EditResult } from './interfaces/edit-result';

@Controller('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) { }

  @Post('/watermark/add')
  @UseInterceptors(FilesInterceptor('files', 2, MulterConfig))
  addWatermark(@UploadedFiles() files: Express.Multer.File[], @Body() setting: AddWatermarkDTO): Promise<EditResult> {
    return this.editorService.addWatermark(files, setting)
  }
}

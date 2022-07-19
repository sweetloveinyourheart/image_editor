import { Module } from '@nestjs/common';
import { EditorService } from './editor.service';
import { EditorController } from './editor.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EditorController],
  providers: [EditorService]
})
export class EditorModule { }

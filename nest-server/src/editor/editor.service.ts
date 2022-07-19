import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AddWatermarkDTO } from './dto/add-watermark.dto';
import { EditResult } from './interfaces/edit-result';

@Injectable()
export class EditorService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    async addWatermark(files: Express.Multer.File[], setting: AddWatermarkDTO): Promise<EditResult> {
        if(files.length < 2 ) {
            throw new BadRequestException()
        }
        const image = files[0].filename
        const watermark = files[1].filename

        const result = this.httpService.post('http://localhost:8000/watermark/add', { image: 'image.jpg', watermark: 'watermark.png' })
        const { data } = await lastValueFrom(result)
        
        if(!data) throw new InternalServerErrorException()
        
        return {
            result_url: data.result_file
        }
    }
}

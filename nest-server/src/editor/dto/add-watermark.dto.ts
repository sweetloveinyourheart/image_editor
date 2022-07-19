import { Transform, Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator"

enum WatermarkType {
    Text = 'text',
    Image = 'image'
}

class WatermarkPosition {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    top: number

    @Transform(({ value }) => Number(value))
    @IsNumber()
    right: number

    @Transform(({ value }) => Number(value))
    @IsNumber()
    left: number

    @Transform(({ value }) => Number(value))
    @IsNumber()
    bottom: number
}

export class AddWatermarkDTO {
    @IsEnum(WatermarkType)
    type: WatermarkType

    @Transform(({ value }) => JSON.parse(value))
    @IsNotEmpty()
    position: WatermarkPosition

    @Transform(({ value }) => Number(value))
    @IsNumber()
    scale: number
}
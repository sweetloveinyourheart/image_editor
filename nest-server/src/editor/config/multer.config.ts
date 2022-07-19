import { diskStorage } from "multer"
import { parse } from "path"

export const MulterConfig = {
  storage: diskStorage({
    destination: './images/uploads',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = parse(file.originalname).name.replace(/\s/g, '') + uniqueSuffix
      const extension = parse(file.originalname).ext
      cb(null, `${fileName}${extension}`)
    }
  })
}
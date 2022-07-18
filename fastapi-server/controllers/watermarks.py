import cv2
import uuid
from pathlib import Path

upload_path = str(Path(__file__).parent.parent)+'/images/uploads/'
download_path = str(Path(__file__).parent.parent)+'/images/downloads/'

def add_watermark(image_file: str, watermark_file: str):
    # Read image & watermark
    img = cv2.imread(upload_path + image_file)
    # read as alpha channel
    watermark = cv2.imread(upload_path + watermark_file, -1)

    # Set black bg color instead of transparency
    # make mask of where the transparent bits are
    trans_mask = watermark[:, :, 3] == 0
    # replace areas of transparency with white and not transparent
    watermark[trans_mask] = [0, 0, 0, 255]
    # new image without alpha channel...
    converted_watermark = cv2.cvtColor(watermark, cv2.COLOR_BGRA2BGR)

    # Sale image
    percent_of_scaling = 20
    new_width = int(img.shape[1] * percent_of_scaling/100)
    new_height = int(img.shape[0] * percent_of_scaling/100)
    new_dim = (new_width, new_height)

    resized_img = cv2.resize(img, new_dim, interpolation=cv2.INTER_AREA)

    # Sale watermark
    wm_scale = 40
    wm_width = int(converted_watermark.shape[1] * wm_scale/100)
    wm_height = int(converted_watermark.shape[0] * wm_scale/100)
    wm_dim = (wm_width, wm_height)

    resized_wm = cv2.resize(converted_watermark, wm_dim, interpolation=cv2.INTER_AREA)

    # Display output
    h_img, w_img, _ = resized_img.shape
    center_y = int(h_img/2)
    center_x = int(w_img/2)
    h_wm, w_wm, _ = resized_wm.shape
    top_y = center_y - int(h_wm/2)
    left_x = center_x - int(w_wm/2)
    bottom_y = top_y + h_wm
    right_x = left_x + w_wm

    roi = resized_img[top_y:bottom_y, left_x:right_x]
    result = cv2.addWeighted(roi, 1, resized_wm, 0.3, 0)
    resized_img[top_y:bottom_y, left_x:right_x] = result

    # Rename result image
    image_name = 'watermakred_%s.jpg' % (uuid.uuid1())
    filename = download_path + image_name
    cv2.imwrite(filename, resized_img)  # generate image
    
    return {
        "result_file": image_name
    }

from PIL import Image
import os

img_path = 'public/assets/before_after_transformation/transform_new.jpeg'
img = Image.open(img_path)
width, height = img.size
mid = width // 2

before_img = img.crop((0, 0, mid, height))
after_img = img.crop((mid, 0, width, height))

before_img.save('public/assets/before_after_transformation/transform_new_before.jpeg')
after_img.save('public/assets/before_after_transformation/transform_new_after.jpeg')
print('Cropped successfully')

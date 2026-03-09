from PIL import Image, ImageDraw, ImageFont
import os

size = 512
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

def draw_rounded_rect(draw, xy, cornerradius, fill):
    x0, y0, x1, y1 = xy
    draw.rectangle([x0, y0 + cornerradius, x1, y1 - cornerradius], fill=fill)
    draw.rectangle([x0 + cornerradius, y0, x1 - cornerradius, y1], fill=fill)
    draw.pieslice([x0, y0, x0 + cornerradius * 2, y0 + cornerradius * 2], 180, 270, fill=fill)
    draw.pieslice([x1 - cornerradius * 2, y0, x1, y0 + cornerradius * 2], 270, 360, fill=fill)
    draw.pieslice([x0, y1 - cornerradius * 2, x0 + cornerradius * 2, y1], 90, 180, fill=fill)
    draw.pieslice([x1 - cornerradius * 2, y1 - cornerradius * 2, x1, y1], 0, 90, fill=fill)

draw_rounded_rect(draw, (0, 0, size, size), 80, '#FACC15')

try:
    font = ImageFont.truetype("/System/Library/Fonts/Times.ttc", 290)
except Exception as e:
    print(e)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Times.ttf", 290)
    except Exception as e2:
        print(e2)
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Georgia.ttf", 290)
        except:
            font = ImageFont.load_default()

text = "OS"
bbox = draw.textbbox((0, 0), text, font=font)
w = bbox[2] - bbox[0]
h = bbox[3] - bbox[1]

# Adjust vertical centering
draw.text(((size - w) / 2, (size - h) / 2 - 30), text, fill="#121212", font=font)

if not os.path.exists("public"):
    os.makedirs("public")

img.save("public/favicon-512x512.png")
img.resize((192, 192), Image.Resampling.LANCZOS).save("public/favicon-192x192.png")
img.resize((180, 180), Image.Resampling.LANCZOS).save("public/apple-touch-icon.png")
img.resize((32, 32), Image.Resampling.LANCZOS).save("public/favicon-32x32.png")
img.resize((16, 16), Image.Resampling.LANCZOS).save("public/favicon-16x16.png")
img_ico = img.resize((32, 32), Image.Resampling.LANCZOS)
img_ico.save("public/favicon.ico", format="ICO")
print("Favicons generated successfully.")

from flask import Flask, jsonify, request
from inky.auto import auto
from PIL import Image
import base64

display = auto()

app = Flask(__name__)


@app.route('/api/inky/initialise')
def hello():
    if (display):
        return jsonify(
            inkyDetected=True,

            specialColor=display.colour,
            resolution=display.resolution
        )
    else:
        return jsonify(
            inkyDetected=False
        )


@app.route('/api/inky/clear')
def clear():
    if (display):
        img = Image.new("P", (display.WIDTH, display.HEIGHT))
        display.set_image(img)
        display.show()
        return jsonify(
            inkyDetected=True,
            setToClear=True
        )
    else:
        return jsonify(
            inkyDetected=False
        )


@app.route('/api/inky/set', methods=['POST'])
def display_image():
    if (display):
        data = request.get_json()
        imageData = data['imageData']

        imageData = imageData.replace('data:image/png;base64,', '')
        imageData = bytes(imageData, 'utf-8')
        imageBytes = base64.b64decode(imageData)
        with open('image.png', 'wb') as f:
            f.write(imageBytes)

        width, height = display.resolution
        image = Image.open('image.png').convert("RGB")

        palette = Image.new('P', (1, 1), 0)
        palette.putpalette([
            255, 255, 255,
            0, 0, 0,
            255, 255, 0
        ])

        image = image.quantize(colors=3, method=None, kmeans=0,
                               palette=palette, dither=Image.Dither.NONE)

        image.thumbnail((width, height))

        display.set_image(image)
        display.show()

        return jsonify(
            sentToInky=True
        )
    else:
        return jsonify(
            inkyDetected=False
        )

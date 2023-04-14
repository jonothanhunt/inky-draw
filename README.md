# Inky Draw

![Sreenshot of jonothan.dev](/inky_draw.webp)

A fun project for the Raspberry Pi and Inky pHAT using Python Flask API and React app.

Select a colour (your Inky's special colour should appear if it has one) and draw with your mouse, then send it to your Inky!

## Get started

The first time you use Inky Draw, you'll need to do some installs:

<details>
  <summary>Click here for the initial setup</summary>

### Python Flask API

Set api as the current working directory

```bash
cd api
```

Create a Python virtual environment

```bash
python3 -m venv my_venv
```

Activate the environment:

```bash
source ./my_venv/bin/activate
```

Install required packages into the environment:

```bash
pip3 install -r ./requirements.txt
```

### React app

Install the required packages for the React app:

```bash
yarn
```

</details>

## Start

Start the API (make sure your Inky is on your Pi)

```bash
yarn start-api
```

Start the app

```bash
yarn dev
```

The app should not be running at `localhost:5173` and can be opened in your browser!

## Have fun!

https://user-images.githubusercontent.com/40500247/232037745-eceb1d9f-ae03-4a8b-bc82-2a1fdaa74b7b.mp4

## To do

- [x] Implement Inky special colours 🎉
- [ ] Add accessible roles to canvas
- [ ] Improve UI colour palette for clarity
- [ ] Add more in-depth error reporting
- [ ] Potentially break Canvas component into smaller components
- [ ] More pens and pencils (as components)

## Contribute
This is fun! 
And if you think you can make it more fun, more accessible, easier to use, or find a bug— feel free to contribute!

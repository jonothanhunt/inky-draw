# Inky Draw

![Sreenshot of jonothan.dev](/inky_draw.webp)

A fun project for the Raspberry Pi and Inky pHAT using Python Flask API and React app.

Select a colour (including your Inky's special colour if it has one) and draw with your mouse, then send it to your Inky!

## Get started

The first time you use Inky Draw, you'll need to install some libraries.

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

Install the required packages for the React app:

```bash
yarn
```

### React app

Install the required packages for the React app:

```bash
yarn
```

</details>

## Start the Flask API and React app

Start the API

```bash
yarn start-api
```

Start the app

```bash
yarn dev
```

## Have fun!

https://user-images.githubusercontent.com/40500247/232037745-eceb1d9f-ae03-4a8b-bc82-2a1fdaa74b7b.mp4

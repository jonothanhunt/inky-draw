# Inky Draw

![Sreenshot of jonothan.dev](/Inky_Draw_1920x1080_scrot.webp)

A fun project for the Raspberry Pi and Inky pHAT using Python Flask API and React app.

Select a colour (including your Inky's special colour if it has one) and draw with your mouse, then send it to your Inky!

## Setup

<details>
  <summary>Setting up the Python Flask API</summary>

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

</details>

## How it's put together

Vite which is a fabulous dev server (with insanely fast [Hot Module Replacement](https://vitejs.dev/guide/features.html#hot-module-replacement)!).

Recently switched from three.js to using React Three Fiber (R3F), which works really well with React (and can even [outperform](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) three.js on its own!).

Use of a bunch of very useful helpers and R3F abstractions from [Drei](https://github.com/pmndrs/drei).

Generally the interesting 3D stuff is in `src > components > experience` and any shaders are in `src > shaders`.

## On the to-do list

- Give experience clearer ARIA descriptions for screen readers and the like
- Add comments to all the new code since adopting R3F
- Optimise canvas and shader performance for mobile
- Centralise heavy useFrame usage across components that use live values eg. mouse and scroll.
- Change sampling and size of stickers to make them easier to read on smaller screens.
- Change the way rotation is controlled in the scene (right now it's a bit per / element and it could be mostly one central component)
- Probably a lot React optimisation generally!

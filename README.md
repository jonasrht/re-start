# re-start

a tui-style browser startpage, built with svelte.

features:

- todoist tasks integration
- weather (from open-meteo)
- customizable quick links
- stats (load time, ping, fps, viewport size)
- multiple color themes
- lightweight & performant (&lt;100kb including fonts, loads in &lt;50ms)

<img width="2331" height="1319" alt="image" src="https://github.com/user-attachments/assets/e3164af7-fc42-4caf-81ee-a049e05b84c7" />

## installation

### chrome/edge

1. clone/download this repo.
2. run `npm i` (you must have node.js).
3. run `npm run build`. you should see it create a `dist` folder.
4. open the `manifest.json` file in `dist`.
5. delete these 3 lines from `manifest.json`:

```json
    "chrome_settings_overrides": {
        "homepage": "index.html"
    },
```

6. go to the chrome extensions manager (`chrome://extensions`).
7. turn on developer mode in the top right.
8. click "Load unpacked" in the top left.
9. select the `dist` folder.

### development / building from source

1. clone/download this repo.
2. run `npm i` (you must have node.js).
3. run `npm run dev` to start in development mode. the page will run at `http://localhost:5173`.
4. run `npm run build` to build for production.

## usage tips

- hover your cursor on the top right corner of the startpage, and you should see a settings button appear. click it to configure settings.
- to get your todoist api token, open the todoist website and click your profile in the top left. then go to "Settings" > "Integrations" > "Developer" > "Copy API Token".
- the 'x tasks' text is also a clickable link to todoist.
- you can force a refresh of the weather and todoist widgets by clicking the top left panel labels.
- the ping stat is based on how long a request to <https://www.google.com/generate_204> takes. don't take it too seriously.

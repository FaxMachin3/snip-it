# Snip-it

> A snippet manager, where user can store their code snippets wrt to a language.

## Requirements [TBD]

## 👀 Tech choices

1. [**Electron + react + vite + sass boilerplate**](https://github.com/electron-vite/electron-vite-react) for initial setup. I haven't worked on electron so didn't want to waste much time on setup (referred some articles and videos for this). This includes e2e integration with playwright and build configurations with it. This also has some issues with _pnpm_ so went with _npm_ because of time constraints.
2. **Monaco** as code editor as it has good community support and is quite robust. Also considered Ace, CodeMirror, and Highlight JS ([ref](https://blog.replit.com/code-editors))
3. **Ant Design** system to speed up UI components.
4. **nanoid** to generate ids on fly.

## Component Architecture [TBD]

## API/ Data Modeling/ Communication Protocols [TBD]

## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/FaxMachin3/snip-it.git

# enter the project directory
cd snip-it

# install dependency
npm install

# develop
npm run dev

# build
npm run build
```

import { useEffect, useState } from "react";
import "./App.scss";

import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import App from "./App";
import { ipcRenderer } from "electron";
import { APP_REDUCER, CRUD_MODE } from "./types";
import { languages } from "@/constants";
import { initialState } from "./hooks/useAppContext";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init().then(() => console.log("loader initiated"));

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function AppContainer() {
  const [jsonStore, setJsonStore] = useState<APP_REDUCER | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const payload = await ipcRenderer.invoke("get-store");
        if (!payload) throw new Error("App state not defined");
        setJsonStore(JSON.parse(payload));
      } catch (error) {
        setJsonStore(initialState);
      }
    })();
  }, []);

  // TODO: add a loader
  if (!jsonStore) return null;

  return <App jsonStore={jsonStore} />;
}

export default AppContainer;

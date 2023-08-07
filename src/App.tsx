import { useMemo, useState } from "react";
import "./App.scss";

import { ConfigProvider, theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";

import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import LanguagesContainer from "./components/languages-container";
import SnippetsContainer from "./components/snippets-container";
import { AppContext, useAppContext } from "./hooks/useAppContext";
import { THEME } from "./types";
import CodeSnippetContainer from "./components/code-snippet-container";

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

function App() {
  const appContext = useAppContext();
  const [currentTheme] = useState(THEME.LIGHT);

  const antConfig: ThemeConfig = useMemo(
    () => ({
      token: {
        colorPrimary: "#6C63FF",
        colorLink: "#6C63FF",
        fontFamily: 'Montserrat, "Open Sans", Helvetica, Arial, sans-serif',
        borderRadiusLG: 5,
        borderRadiusOuter: 5,
        borderRadiusSM: 5,
        borderRadiusXS: 5,
        boxShadow: "0 0 10px 1px #f5f5ff",
        boxShadowSecondary: "0 0 10px 1px #f5f5ff",
        colorLinkHover: "#6C63FF",
        linkHoverDecoration: "underline",
        colorInfoActive: "#6C63FF",
        colorBorder: "#6961ff1a",
        colorBorderSecondary: "#6961ff1a",
        // Todo: change modal box shadow
        // Todo: add card hover mod
      },
      algorithm:
        currentTheme === THEME.DARK
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
    }),
    [currentTheme]
  );

  return (
    <AppContext.Provider value={appContext}>
      <ConfigProvider theme={antConfig}>
        <div className="app">
          <LanguagesContainer />
          <SnippetsContainer />
          <CodeSnippetContainer />
        </div>
      </ConfigProvider>
      {appContext.antdContextHolder}
    </AppContext.Provider>
  );
}

export default App;

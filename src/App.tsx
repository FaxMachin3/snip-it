import { useMemo, useState } from "react";
import "./App.scss";

import { ConfigProvider, theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";

import LanguagesContainer from "./components/languages-container";
import SnippetsContainer from "./components/snippets-container";
import { AppContext, useAppContext } from "./hooks/useAppContext";
import { APP_REDUCER, THEME } from "./types";
import CodeSnippetContainer from "./components/code-snippet-container";

interface AppProps {
  jsonStore: APP_REDUCER;
}

const App: React.FC<AppProps> = ({ jsonStore }) => {
  const appContext = useAppContext(jsonStore);
  const [currentTheme] = useState(THEME.LIGHT);
  const currKey = `${appContext.selectedLanguage.id}_${
    appContext.selectedSnippet?.id ?? ""
  }`;

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
          <SnippetsContainer key={`${currKey}_snippet`} />
          <CodeSnippetContainer key={`${currKey}_code`} />
        </div>
      </ConfigProvider>
      {appContext.antdContextHolder}
    </AppContext.Provider>
  );
};

export default App;

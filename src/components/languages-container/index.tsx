import { useContext, useMemo } from "react";
import "./styles.scss";

import { AppContext } from "@/hooks/useAppContext";

import { Menu } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import { getItem } from "@/utils";
import { MenuItem } from "@/types";

const LanguagesContainer = () => {
  const appContext = useContext(AppContext);
  const menuItems: MenuItem[] = useMemo(
    () =>
      appContext.languages.map(({ id, language }) =>
        getItem(language, id, <CodeOutlined />)
      ),
    []
  );

  const onMenuSelect = (e: any) => {
    const selectedLanguage = appContext.languages.find(
      ({ id }) => id === e.key
    );
    appContext.selectLanguage(selectedLanguage ?? appContext.languages[0]);
  };

  return (
    <aside className="languages-container">
      <Menu
        className="languages"
        defaultSelectedKeys={[
          appContext.selectedLanguage?.id ?? (menuItems[0]?.key as string),
        ]}
        onClick={onMenuSelect}
        items={menuItems}
      />
    </aside>
  );
};

export default LanguagesContainer;

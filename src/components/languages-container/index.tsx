import { useContext, useMemo } from "react";
import { Menu } from "antd";
import "./styles.scss";

import { AppContext } from "@/hooks/useAppContext";
import { getItem } from "@/utils";
import { MenuItem } from "@/types";
import { ICONS } from "@/constants";

const LanguagesContainer = () => {
  const appContext = useContext(AppContext);
  const menuItems: MenuItem[] = useMemo(
    () =>
      appContext.languages.map(({ id, language }, index) =>
        getItem(language, id, ICONS[index].icon)
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

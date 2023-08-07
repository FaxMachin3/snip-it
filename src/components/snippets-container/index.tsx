import { useContext, useMemo, useState } from "react";
import "./styles.scss";

import { AppContext } from "@/hooks/useAppContext";
import { Button, Menu, Empty, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CRUD_MODE, MenuItem } from "@/types";
import { getItem } from "@/utils";
import Search from "antd/es/input/Search";

interface SnippetsContainerProps {}

const SnippetsContainer: React.FC<SnippetsContainerProps> = () => {
  const appContext = useContext(AppContext);
  const hasNoSnippet = appContext.selectedLanguage.snippets.length === 0;
  const [searchValue, setSearchValue] = useState("");
  const filteredSnippets = useMemo(
    () =>
      appContext.selectedLanguage.snippets.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(searchValue.toLowerCase()) ||
          description.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [appContext.selectedLanguage.snippets, searchValue]
  );

  const menuItems: MenuItem[] = useMemo(
    () =>
      filteredSnippets.map(({ id, title, description }) =>
        getItem(
          <div className="snippet" key={id}>
            <div className="left">
              <div className="title">{title}</div>
              <div className="description">{description}</div>
            </div>
            <div className="right" data-type="delete" data-id={id}>
              <DeleteOutlined />
            </div>
          </div>,
          id
        )
      ),
    [appContext.selectedLanguage, filteredSnippets]
  );

  const onAddNewSnippet = () => {
    appContext.changeCrudMode(CRUD_MODE.ADD);
    appContext.selectSnippet(null);
  };

  const onMenuSelect = (e: any) => {
    const selectedSnippet = appContext.selectedLanguage.snippets.find(
      ({ id }) => id === e.key
    );
    const snippetId = e.domEvent.target.closest(".right")?.dataset?.id;

    if (snippetId) {
      appContext.changeCrudMode(CRUD_MODE.ADD);
      appContext.deleteSnippet(snippetId);
      appContext.antdMessageApi?.success("Deleted");
    } else {
      appContext.selectSnippet(selectedSnippet ?? null);
      appContext.changeCrudMode(CRUD_MODE.VIEW);
    }
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <aside className="snippets-container">
      <Card className="top">
        <Button
          className="new-snippet"
          onClick={onAddNewSnippet}
          type="primary"
        >
          Add New Snippet
        </Button>
        <Search
          placeholder="Search your snippet"
          className="search"
          onSearch={onSearch}
          onChange={onSearchChange}
          allowClear
        />
      </Card>
      {!hasNoSnippet ? (
        <Menu
          key={appContext.selectedSnippet?.id + "snippet"}
          defaultSelectedKeys={[
            appContext.selectedSnippet?.id ?? (menuItems[0]?.key as string),
          ]}
          onClick={onMenuSelect}
          items={menuItems}
        />
      ) : (
        <Empty className="no-snippet" description="No snippet :("></Empty>
      )}
    </aside>
  );
};

export default SnippetsContainer;

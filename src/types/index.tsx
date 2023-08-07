import { MessageInstance } from "antd/es/message/interface";
import type { MenuProps } from "antd/es/menu";

export type SNIPPET = {
  id: string;
  title: string;
  description: string;
  code: string;
};

export type LANGUAGE = {
  id: string;
  language: string;
  defaultCode: string;
  snippets: Array<SNIPPET>;
};

export type ACTIONS = {
  type: APP_ACTION;
  payload: SNIPPET | LANGUAGE | string | null | Object;
};

export type MenuItem = Required<MenuProps>["items"][number];

export interface APP_REDUCER {
  languages: Array<LANGUAGE>;
  selectedLanguage: LANGUAGE;
  selectedSnippet: SNIPPET | null;
  crudMode: CRUD_MODE;
}

export interface APP_CONTEXT extends APP_REDUCER {
  antdMessageApi: MessageInstance | null;
  antdContextHolder: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
  addSnippet: (payload: SNIPPET) => void;
  modifySnippet: (payload: SNIPPET) => void;
  deleteSnippet: (payload: string) => void;
  selectLanguage: (payload: LANGUAGE) => void;
  selectSnippet: (payload: SNIPPET | null) => void;
  changeCrudMode: (payload: CRUD_MODE) => void;
}

export enum APP_ACTION {
  ADD_SNIPPET = "ADD_SNIPPET",
  DELETE_SNIPPET = "DELETE_SNIPPET",
  MODIFY_SNIPPET = "MODIFY_SNIPPET",
  SELECT_LANGUAGE = "SELECT_LANGUAGE",
  SELECT_SNIPPET = "SELECT_SNIPPET",
  CHANGE_CRUD = "CHANGE_CRUD",
}

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export enum CRUD_MODE {
  VIEW = "VIEW",
  ADD = "ADD",
  MODIFY = "MODIFY",
}

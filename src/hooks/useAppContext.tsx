import { useReducer, useMemo, createContext, useEffect } from "react";

import { message } from "antd";
import { languages } from "@/constants";
import {
  ACTIONS,
  APP_ACTION,
  APP_CONTEXT,
  APP_REDUCER,
  CRUD_MODE,
  LANGUAGE,
  SNIPPET,
} from "@/types";

const appReducer = (state: APP_REDUCER, action: ACTIONS) => {
  switch (action.type) {
    case APP_ACTION.ADD_SNIPPET:
      return {
        ...state,
        languages: state.languages.map((currentLanguage) => {
          if (currentLanguage.id !== state.selectedLanguage.id)
            return currentLanguage;

          return {
            ...currentLanguage,
            snippets: [...currentLanguage.snippets, action.payload],
          };
        }),
        selectedLanguage: {
          ...state.selectedLanguage,
          snippets: [...state.selectedLanguage.snippets, action.payload],
        },
        selectedSnippet: action.payload,
      } as APP_REDUCER;
    case APP_ACTION.MODIFY_SNIPPET:
      return {
        ...state,
        languages: state.languages.map((currentLanguage) => {
          if (currentLanguage.id !== state.selectedLanguage.id)
            return currentLanguage;

          return {
            ...currentLanguage,
            snippets: currentLanguage.snippets.map((currentSnippet) => {
              if (currentSnippet.id !== (action.payload as SNIPPET).id)
                return currentSnippet;

              return {
                ...currentSnippet,
                ...(action.payload as SNIPPET),
              };
            }),
          };
        }),
        selectedLanguage: {
          ...state.selectedLanguage,
          snippets: state.selectedLanguage.snippets.map((currentSnippet) => {
            if (currentSnippet.id !== (action.payload as SNIPPET).id)
              return currentSnippet;

            return {
              ...currentSnippet,
              ...(action.payload as SNIPPET),
            };
          }),
        },
        selectedSnippet: action.payload,
      } as APP_REDUCER;
    case APP_ACTION.DELETE_SNIPPET:
      return {
        ...state,
        languages: state.languages.map((currentLanguage) => {
          if (currentLanguage.id !== state.selectedLanguage.id)
            return currentLanguage;

          return {
            ...currentLanguage,
            snippets: currentLanguage.snippets.filter(
              ({ id }) => id !== action.payload
            ),
          };
        }),
        selectedLanguage: {
          ...state.selectedLanguage,
          snippets: state.selectedLanguage.snippets.filter(
            ({ id }) => id !== action.payload
          ),
        },
        selectedSnippet: null,
      } as APP_REDUCER;
    case APP_ACTION.SELECT_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
        selectedSnippet: (action.payload as LANGUAGE).snippets[0] ?? null,
      } as APP_REDUCER;
    case APP_ACTION.SELECT_SNIPPET:
      return { ...state, selectedSnippet: action.payload } as APP_REDUCER;
    case APP_ACTION.CHANGE_CRUD:
      return { ...state, crudMode: action.payload } as APP_REDUCER;
    default:
      return state;
  }
};

const initialState: APP_REDUCER = {
  languages,
  selectedLanguage: languages[0],
  selectedSnippet: languages[0].snippets[0] ?? null,
  crudMode: CRUD_MODE.ADD,
};

export const AppContext = createContext<APP_CONTEXT>({
  ...initialState,
  antdMessageApi: null,
  antdContextHolder: null,
  addSnippet: () => {},
  modifySnippet: () => {},
  deleteSnippet: () => {},
  selectLanguage: () => {},
  selectSnippet: () => {},
  changeCrudMode: () => {},
});

export const useAppContext = () => {
  const [appState, dispatch] = useReducer(
    appReducer,
    JSON.parse(localStorage.getItem("appState") ?? "null") ?? initialState
  );
  const [antdMessageApi, antdContextHolder] = message.useMessage();

  const appContext: APP_CONTEXT = useMemo(() => {
    return {
      ...appState,
      antdMessageApi,
      antdContextHolder,
      addSnippet: (payload: SNIPPET) => {
        dispatch({ type: APP_ACTION.ADD_SNIPPET, payload });
      },
      modifySnippet: (payload: SNIPPET) => {
        dispatch({ type: APP_ACTION.MODIFY_SNIPPET, payload });
      },
      deleteSnippet: (payload: string) => {
        dispatch({ type: APP_ACTION.DELETE_SNIPPET, payload });
      },
      selectLanguage: (payload: LANGUAGE) => {
        dispatch({ type: APP_ACTION.SELECT_LANGUAGE, payload });
      },
      selectSnippet: (payload: SNIPPET | null) => {
        dispatch({ type: APP_ACTION.SELECT_SNIPPET, payload });
      },
      changeCrudMode: (payload: CRUD_MODE) => {
        dispatch({ type: APP_ACTION.CHANGE_CRUD, payload });
      },
    };
  }, [
    appState.languages,
    appState.selectedLanguage,
    appState.selectedSnippet,
    appState.crudMode,
    dispatch,
  ]);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  return appContext;
};

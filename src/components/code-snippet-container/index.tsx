import { useContext, useEffect, useState } from "react";
import "./styles.scss";

import { Form, Input, Button, Card } from "antd";
import { nanoid } from "nanoid";
import { AppContext } from "@/hooks/useAppContext";
import { editor } from "monaco-editor";
import Editor from "@monaco-editor/react";
import { CRUD_MODE } from "@/types";

interface CodeSnippetContainerProps {}

type SnippetDataType = "code" | "description" | "title";

const CodeSnippetContainer: React.FC<CodeSnippetContainerProps> = () => {
  const appContext = useContext(AppContext);
  const isViewMode = appContext.crudMode === CRUD_MODE.VIEW;
  const isModifyMode =
    appContext.crudMode === CRUD_MODE.MODIFY ||
    !!appContext.selectedSnippet?.id;
  const [snippetData, setSnippetData] = useState({
    title: {
      value: appContext.selectedSnippet?.title ?? "",
      isDisabled: isViewMode,
    },
    description: {
      value: appContext.selectedSnippet?.description ?? "",
      isDisabled: isViewMode,
    },
    code: {
      value:
        appContext.selectedSnippet?.code ??
        appContext.selectedLanguage.defaultCode ??
        "",
      isDisabled: isViewMode,
    },
  });

  useEffect(() => {
    setSnippetData((prevData) => ({
      ...prevData,
      title: {
        ...prevData.title,
        isDisabled: isViewMode,
      },
      description: {
        ...prevData.description,
        isDisabled: isViewMode,
      },
      code: {
        ...prevData.code,
        isDisabled: isViewMode,
      },
    }));
  }, [appContext.crudMode, appContext.selectedSnippet]);

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSnippetData((prevData) => ({
      ...prevData,
      [e.target.name]: {
        ...prevData[e.target.name as SnippetDataType],
        value: e.target.value,
      },
    }));
  };

  const onButtonClick = () => {
    if (isViewMode) {
      appContext.changeCrudMode(CRUD_MODE.MODIFY);
      return;
    }

    if (
      snippetData.title.value.length === 0 ||
      snippetData.description.value.length === 0 ||
      snippetData.code.value?.length === 0
    ) {
      appContext.antdMessageApi?.error("Please check the inputs");
      return;
    }

    if (isModifyMode) {
      appContext.modifySnippet({
        id: appContext.selectedSnippet!.id,
        title: snippetData.title.value,
        description: snippetData.description.value,
        code: snippetData.code.value,
      });
      appContext.changeCrudMode(CRUD_MODE.VIEW);
      appContext.antdMessageApi?.success("Snippet saved");
      return;
    }

    appContext.addSnippet({
      id: nanoid(),
      title: snippetData.title.value,
      description: snippetData.description.value,
      code: snippetData.code.value,
    });
    appContext.antdMessageApi?.success("Snippet added");
    appContext.changeCrudMode(CRUD_MODE.VIEW);
  };

  const onCodeChange = (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => {
    setSnippetData((prevData) => ({
      ...prevData,
      code: {
        ...prevData.code,
        value: value ?? "",
      },
    }));
  };

  return (
    <div className="code-snippet-container">
      <Form
        className="form-container"
        name="code-snippet"
        layout="vertical"
        autoComplete="on"
        initialValues={{
          title: appContext.selectedSnippet?.title,
          description: appContext.selectedSnippet?.description,
        }}
      >
        <Form.Item label="Title" name="title">
          <Input
            name="title"
            placeholder="* e.g. Add two number"
            value={snippetData.title.value}
            disabled={snippetData.title.isDisabled}
            onChange={onChangeHandler}
            required
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea
            name="description"
            placeholder="* e.g. Takes in two number as input and returns the summation of them"
            value={snippetData.description.value}
            disabled={snippetData.description.isDisabled}
            onChange={onChangeHandler}
            required
          />
        </Form.Item>
        <Card className="add-code-container">
          <Editor
            language={appContext.selectedLanguage.language.toLowerCase()}
            defaultValue={
              appContext.selectedSnippet?.code ?? snippetData.code.value
            }
            value={snippetData.code.value}
            onChange={onCodeChange}
            options={{ readOnly: snippetData.code.isDisabled }}
          />
        </Card>
        <Button onClick={onButtonClick} type="primary">
          {isViewMode ? "Edit" : isModifyMode ? "Save" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

export default CodeSnippetContainer;

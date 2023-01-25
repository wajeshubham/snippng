import NoSSRWrapper from "./NoSSRWrapper";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import SnippngHeader from "./SnippngHeader";

const CodeMirrorTextArea = () => {
  const [code, setCode] = useState(`console.log("Hello world")`);
  return (
    <section>
      <NoSSRWrapper>
        <div className="overflow-hidden p-24 bg-[#eee811]">
          <div
            data-testid="editor-container"
            className="overflow-hidden rounded-md !font-mono"
          >
            <CodeMirror
              className="CodeMirror__Main__Editor"
              value={code}
              extensions={[langs.javascript()]}
              theme="dark"
              basicSetup={{
                lineNumbers: true,
                indentOnInput: true,
                tabSize: 4,
                foldGutter: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
              }}
              indentWithTab
              onChange={(value, viewUpdate) => {
                setCode(value);
              }}
            >
              <div className="absolute top-0 z-50 w-full text-white !px-3.5 !py-3 bg-inherit">
                <SnippngHeader type="mac-left" />
              </div>
            </CodeMirror>
          </div>
        </div>
      </NoSSRWrapper>
    </section>
  );
};

export default CodeMirrorTextArea;

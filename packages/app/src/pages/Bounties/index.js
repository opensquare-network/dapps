import React, { useState } from 'react';
import { testState } from "@recoil/atoms";
import { useRecoilState } from 'recoil';
import "easymde/dist/easymde.min.css";
import SimpleMDEReact from "react-simplemde-editor";

export default function() {
  const [text, setText] = useRecoilState(testState);
  const [value, setValue] = useState('');

  console.log('value', value);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}

      <div style={{ width: '1080px' }}>
        <SimpleMDEReact
          className={""}
          label="Markdown Editor"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
}

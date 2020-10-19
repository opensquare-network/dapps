import React from 'react';
import { testState } from "@recoil/atoms";
import { useRecoilState } from 'recoil';

export default function() {
  const [text, setText] = useRecoilState(testState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

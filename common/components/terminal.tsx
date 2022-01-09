/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, css } from "@emotion/react";

type terminalProps = {};
type terminalInputProps = {
  onKeyDown: Function;
};

function TerminalInput(props: terminalInputProps) {
  const inputStyle = css({
    outline: "none",
    border: "none",
    backgroundImage: "none",
    backgroundColor: "transparent",
    webkitBoxShadow: "none",
    mozBoxShadow: "none",
    boxShadow: "none",
    color: "white",
    width: "100%",
  });

  const containerStyle = css({
    display: "flex",
  });

  const locationBlock = css({
    margin: "2px",
    padding: "0px 4px",
    backgroundColor: "gray",
  });

  const [inputValue, setInputValue] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onKeyDown(inputValue);
      setInputValue("");
    }
  };
  return (
    <div css={containerStyle}>
      <div css={locationBlock}>~</div>
      <input
        css={inputStyle}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      />
      <div></div>
    </div>
  );
}

export default function Terminal(props: terminalProps) {
  const terminalContainer = css({
    width: "100%",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#171717",
    color: "white",
  });

  const [terminalLog, setTerminalLog] = useState([""]);
  const handleSubmit = (value: string) => {
    setTerminalLog([...terminalLog, value]);
  };

  const logs = terminalLog.map((log, i) => {
    return <span key={i}>{log}</span>;
  });

  return (
    <div css={terminalContainer}>
      {logs}
      <TerminalInput onKeyDown={handleSubmit} />
    </div>
  );
}

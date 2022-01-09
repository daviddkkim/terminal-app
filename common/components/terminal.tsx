/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, css } from "@emotion/react";
import useSWR from "swr";
import fetcher from "../util/fetcher";

type terminalInputProps = {
  onKeyDown: Function;
};

type TerminalLog = {
  message: string[];
  messageType: "Argument" | "Response" | "";
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
  const { data } = useSWR(`/api/directory`, fetcher);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const argumentLog: TerminalLog = {
        message: [inputValue],
        messageType: "Argument",
      };
      props.onKeyDown([argumentLog]);

      if (inputValue.toLowerCase() === "ls") {
        const responseMessage = data.map(
          (object: { id: number; name: any }) => {
            return object.name;
          }
        );
        const responseLog: TerminalLog = {
          message: responseMessage,
          messageType: "Response",
        };
        props.onKeyDown([argumentLog, responseLog]);
      }

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

export default function Terminal() {
  const terminalContainer = css({
    width: "920px",
    height: "720px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.85)",
    color: "white",
    borderRadius: "5px",
    padding: "8px",
  });

  const [terminalLog, setTerminalLog] = useState<TerminalLog[]>([
    {
      message: [""],
      messageType: "",
    },
  ]);
  const handleSubmit = (value: TerminalLog[]) => {
    setTerminalLog([...terminalLog, ...value]);
  };

  const logs = terminalLog.map((log, i) => {
    console.log(log.message.length);
    if(log.message.length === 1) {
    return <span key={i}>{log.message}</span>;
    } else {
        return <div>
            {log.message.map((message, y) => {
                <span key={i+','+y}>{message}</span>
            })}
        </div>
    }
  });

  return (
    <div css={terminalContainer}>
      {logs}
      <TerminalInput onKeyDown={handleSubmit} />
    </div>
  );
}

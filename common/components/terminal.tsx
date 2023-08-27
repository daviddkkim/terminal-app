/** @jsxRuntime classic */
/** @jsx jsx */

import { css } from '@emotion/react';
import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../util/fetcher';

type terminalInputProps = {
  onKeyDown: Function;
};

type TerminalLog = {
  message: string[];
  messageType: 'Argument' | 'Response' | '';
};

function TerminalInput(props: terminalInputProps) {
  const inputStyle = css({
    outline: 'none',
    border: 'none',
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    webkitBoxShadow: 'none',
    mozBoxShadow: 'none',
    boxShadow: 'none',
    color: 'white',
    width: '100%'
  });

  const containerStyle = css({
    display: 'flex'
  });

  const locationBlock = css({
    margin: '2px',
    padding: '0px 4px',
    backgroundColor: 'gray'
  });

  const [inputValue, setInputValue] = useState('');

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.onKeyDown(inputValue);

      setInputValue('');
    }
  };
  return (
    <div css={containerStyle}>
      <div css={locationBlock}>~</div>
      <input
        css={inputStyle}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => handleEnter(e)}
      />
      <div></div>
    </div>
  );
}

export default function Terminal() {
  const terminalContainer = css({
    width: '920px',
    height: '720px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.85)',
    color: 'white',
    borderRadius: '5px',
    padding: '8px'
  });

  const terminalLogMessageContainer = css({
    display: 'flex',
    columnGap: '8px'
  });

  const argumentMessageIcon = css({
    color: '#49fb35'
  });

  const folderMessageColor = css({
    color: '#00ffff'
  });

  const { data } = useSWR(`/api/directory`, fetcher);
  const [terminalLog, setTerminalLog] = useState<TerminalLog[]>([
    {
      message: [''],
      messageType: ''
    }
  ]);
  const handleSubmit = (value: string) => {
    const argumentLog: TerminalLog = {
      message: [value],
      messageType: 'Argument'
    };

    if (value.toLowerCase() === 'ls') {
      const responseMessage = data.map((object: { id: number; name: any }) => {
        return object.name;
      });
      const responseLog: TerminalLog = {
        message: responseMessage,
        messageType: 'Response'
      };
      setTerminalLog([...terminalLog, argumentLog, responseLog]);
    } else if (value.toLowerCase() === 'clear') {
      setTerminalLog([]);
    } else {
      setTerminalLog([...terminalLog, argumentLog]);
    }
  };

  const logs = terminalLog.map((log, i) => {
    if (log.messageType === 'Argument') {
      return (
        <div css={terminalLogMessageContainer}>
          <div css={argumentMessageIcon}> &#60; </div>
          <span key={i}>{log.message}</span>
        </div>
      );
    } else {
      return (
        <div key={i} css={terminalLogMessageContainer}>
          {log.message.map((message, y) => {
            return (
              <span css={folderMessageColor} key={i + ',' + y}>
                {message}
              </span>
            );
          })}
        </div>
      );
    }
  });

  return (
    <div css={terminalContainer}>
      {logs}
      <TerminalInput onKeyDown={handleSubmit} />
    </div>
  );
}

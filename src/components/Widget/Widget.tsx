import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  background-color: royalblue;
  border-color: royalblue;
  border-style: solid;
  border-width: 3px;
  border-radius: 25px;
  margin: 10px;
  padding: 10px;

  height: 300px;
  width: 300px;
`;

export interface WidgetProps {
  url: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (url: string) => void;
}

export function Widget({ url, onClick }: WidgetProps) {
  return <WidgetContainer onClick={() => onClick(url)}>{url}</WidgetContainer>;
}

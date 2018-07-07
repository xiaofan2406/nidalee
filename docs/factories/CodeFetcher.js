/* eslint-disable react/no-danger */
/* @flow */
import * as React from 'react';
import getHTML from 'utils/prismjs';
import Fetch from './Fetch';

export type CodeFetcherProps = {
  fetcher: () => Promise<{ default: string }>,
};

const CodeFetcher = ({ fetcher }: CodeFetcherProps) => (
  <Fetch fetcher={fetcher}>
    {({ default: code }) => (
      <pre dangerouslySetInnerHTML={{ __html: getHTML(code) }} />
    )}
  </Fetch>
);

export default CodeFetcher;

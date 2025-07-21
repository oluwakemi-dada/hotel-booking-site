'use client';

import { useState } from 'react';

type Props = {
  children: string;
};

const TextExpander = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className="text-primary-700 border-primary-700 cursor-pointer border-b pb-1 leading-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
};

export default TextExpander;

import { useState } from 'react';
import { RouteContainer } from '../components';
import { SuggestionsInput } from '../components/SuggestionsInput';
import { ChowsSearchBar } from './app/components/ChowSearchBar';

const TestRoute = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <ChowsSearchBar placeholder='Search Chow' />
      <div
        className={`bg-lime-300 hover:cursor-pointer transition-all`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Click Me
        {isExpanded ? (
          <div className={`transition-all ease-in-out duration-1000`}>
            More Content
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { TestRoute };

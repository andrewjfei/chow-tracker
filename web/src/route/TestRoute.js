import { RouteContainer } from '../component';
import { SuggestionsInput } from '../component/suggestions-input/SuggestionsInput';

const TestRoute = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <SuggestionsInput />
    </div>
  );
};

export { TestRoute };

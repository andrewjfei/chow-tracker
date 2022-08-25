import { Card } from '../card/Card';
import { InputField } from '../input-field/InputField';
import { useState } from 'react';

const SuggestionsInput = ({ classname, placeholder }) => {
  const [hasSuggestions, setHasSuggestions] = useState(false);

  return (
    <div className='relative'>
      <InputField
        placeholder={placeholder}
        onChange={() => setHasSuggestions(true)}
        onMouseLeave={() => setHasSuggestions(false)}
      />
      {hasSuggestions && (
        <Card className='mt-2 p-1 hover:cursor-default absolute z-10 w-full'>
          <ul>
            <li>
              <Card className='py-1 px-2 rounded-sm drop-shadow-none hover:bg-gray-100 transition-colors'>
                <p className='text-sm'>Item One</p>
              </Card>
            </li>
            <li className='mt-2'>
              <Card className='py-1 px-2 rounded-sm drop-shadow-none hover:bg-gray-100 transition-colors'>
                <p className='text-sm'>Item Two</p>
              </Card>
            </li>
            <li className='mt-2'>
              <Card className='py-1 px-2 rounded-sm drop-shadow-none hover:bg-gray-100 transition-colors'>
                <p className='text-sm'>Item Three</p>
              </Card>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
};

export { SuggestionsInput };

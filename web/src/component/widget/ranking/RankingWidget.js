import { Card } from '../../card/Card';
import { Tag } from '../../tag/Tag';

const RankingWidget = ({ className, data, title }) => {
  return (
    <Card className={`${className} flex flex-col`}>
      <p className='flex text-xl'>{title}</p>
      <div>
        {data.map((dataItem) => (
          <div variant='outline' className='flex items-center py-1 text-sm'>
            <p>{`${dataItem.ranking}. ${dataItem.name}`}</p>
            <Tag
              text={dataItem.count}
              className='ml-2 !bg-stone-100 text-stone-700 border-stone-700 font-semibold !text-xs'
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export { RankingWidget };

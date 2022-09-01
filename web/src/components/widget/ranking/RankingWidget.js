import { Card } from '../../Card';
import { Tag } from '../../Tag';

const styles = {
  rankingWidget: 'flex flex-col',
};

const RankingWidget = ({ className, data, title }) => {
  return (
    <Card className={`${className} ${styles.rankingWidget}`}>
      <p className='flex text-xl'>{title}</p>
      <div>
        {data.map((dataItem) => (
          <div variant='outline' className='flex items-center py-1 text-sm'>
            <p>{`${dataItem.ranking}. ${dataItem.itemName}`}</p>
            <Tag
              text={dataItem.hasBeen}
              className='ml-2 !bg-stone-100 text-stone-700 border-stone-700 font-semibold !text-xs'
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export { RankingWidget };
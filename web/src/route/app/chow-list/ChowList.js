import { ChowListItem } from './chow-list-item/ChowListItem';

const data = [
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'AUCKLAND_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'MEDIUM', area: 'HAMILTON' },
  { name: "Botany McDonald's", priceRange: 'HIGH', area: 'EAST_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'WEST_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'HIGH', area: 'CHRISTCHURCH' },
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'AUCKLAND_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'AUCKLAND_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'AUCKLAND_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'MEDIUM', area: 'AUCKLAND_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'AUCKLAND_CENTRAL' },
  { name: "Botany McDonald's", priceRange: 'LOW', area: 'AUCKLAND_CENTRAL' },
];

const ChowList = ({ className }) => {
  return (
    <ul className={`${className} flex-auto overflow-auto px-3 pt-3`}>
      {data.map((chowVenue) => (
        <li className='mb-2 last:mb-3'>
          <ChowListItem chowVenue={chowVenue} />
        </li>
      ))}
    </ul>
  );
};

export { ChowList };

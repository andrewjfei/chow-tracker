import { Card } from '../../card/Card';

const CardListWidget = ({ className, children }) => {
  return <Card className={`${className} p-0`}>{children}</Card>;
};

export { CardListWidget };

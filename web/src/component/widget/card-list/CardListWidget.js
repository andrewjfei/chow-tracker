import { Card } from '../../card/Card';

const styles = {
  cardListWidget: 'p-0',
};

const CardListWidget = ({ className, children }) => {
  return (
    <Card className={`${className} ${styles.cardListWidget}`}>{children}</Card>
  );
};

export { CardListWidget };

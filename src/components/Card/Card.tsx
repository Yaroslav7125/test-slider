import { FC, useEffect, useState } from 'react';
import styles from './card.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CardProps {
  dataId: string;
}

const Card: FC<CardProps> = ({ dataId }) => {
  const currentCard = useSelector(({ cards: { value } }: RootState) => {
    return value.find((elm) => elm.id === dataId);
  });
  const [color, setColor] = useState(currentCard?.color);

  useEffect(() => {
    if (!color || !currentCard?.color) return;

    setColor(currentCard.color);
  }, [currentCard?.color, color]);

  return (
    <div className={styles.root} style={{ backgroundColor: color }}>
      {dataId}
    </div>
  );
};

export default Card;

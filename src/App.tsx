import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import './App.css';
import { addCard, removeCard } from './store/features/card/cardSlice';
import { useList } from './hooks/useList';
import Card from './components/Card/Card';
import { getRandomColor } from './utils';

const CARD_WIDTH = '20vw';

const ACTION_TIMEOUT = 2100;

function App() {
  const cards = useSelector((state: RootState) => state.cards.value);
  const dispatch = useDispatch();

  const items = useList({ items: cards, timeout: ACTION_TIMEOUT, getValue: (a) => a.id });

  return (
    <section className="app_root">
      <div className="button_box">
        <button onClick={() => dispatch(addCard(getRandomColor()))}>addCard</button>
        <button onClick={() => dispatch(removeCard())}>removeCard</button>
      </div>
      <div className="list" style={{ '--card-width': CARD_WIDTH } as React.CSSProperties}>
        {items.map((item, index) => (
          <div
            key={item.data.id}
            className={item.state + ' first_' + items[0].state}
            style={{ '--offset': `calc(${index} * ${CARD_WIDTH})` } as React.CSSProperties}
          >
            <Card dataId={item.data.id} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;

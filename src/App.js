// src/App.js
import React, { useState, useEffect } from 'react';
import { characters } from './gameData';
import './animations.css';
import './modal.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

// Компонент модального окна с информацией
function InfoModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>О Manafall</h2>
        <p>Версия: Alpha</p>
        <p>Dante Morrigan 🧑‍💻</p>
        <p>Минималистичная карточная игра, в которой побеждает тот, кто лучше управляет маной и стратегией. Основана на простой механике и стильном дизайне.</p>
        <button onClick={onClose} className="modal-close-button">Закрыть</button>
      </div>
    </div>
  );
}

// Главная страница с анимацией
function Landing({ onPlay, onOpenInfo }) {
  const [animateStep, setAnimateStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimateStep(1), 300),
      setTimeout(() => setAnimateStep(2), 900),
      setTimeout(() => setAnimateStep(3), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="game-container landing-page">
      <h1 style={{
        opacity: animateStep >= 1 ? 1 : 0,
        transform: animateStep >= 1 ? 'translateY(0)' : 'translateY(-50px)',
        transition: 'all 0.6s ease',
      }}>
        Manafall
      </h1>

      <p style={{
        marginTop: 20, maxWidth: 450, fontSize: '1.2rem',
        opacity: animateStep >= 2 ? 1 : 0,
        transform: animateStep >= 2 ? 'translateX(0)' : 'translateX(-50px)',
        transition: 'all 0.6s ease',
      }}>
        Минималистичная карточная игра с выбором персонажей и крутыми сражениями.
      </p>

      <button
        onClick={onPlay}
        className="button-hover"
        style={{
          marginTop: 40,
          opacity: animateStep >= 3 ? 1 : 0,
          transform: animateStep >= 3 ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.6s ease',
          animation: animateStep >= 3 ? 'pulse 2s infinite' : 'none',
        }}
      >
        Играть
      </button>

      {/* Кнопка с иконкой настроек */}
      <button
        onClick={onOpenInfo}
        style={{
          position: 'absolute', bottom: 20, right: 20,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-light-text)', padding: 0, opacity: animateStep >= 3 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        title="Информация"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ verticalAlign: 'middle' }}
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.73l.08.15a2 2 0 0 1 0 2l-.25.43a2 2 0 0 1-1.73 1H4a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2h.18a2 2 0 0 1 1.73 1l.25.43a2 2 0 0 1 0 2l-.08.15a2 2 0 0 0 2.73 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.73l-.08-.15a2 2 0 0 1 0-2l.25-.43a2 2 0 0 1 1.73-1H20a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2h-.18a2 2 0 0 1-1.73-1l-.25-.43a2 2 0 0 1 0-2l.08-.15a2 2 0 0 0-2.73-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25A2 2 0 0 1 12.22 2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    </div>
  );
}

// Карточка персонажа
function CharacterCard({ char, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(char.id)}
      className={`character-card ${selected ? 'selected' : ''}`}
    >
      <h3>{char.name}</h3>
      <p>{char.desc}</p>
    </div>
  );
}

// Меню выбора персонажа
function CharacterSelect({ characters, selectedChar, onSelect, onBack, onConfirm }) {
  return (
    <div className="game-container character-select-page">
      <h2>Выберите персонажа</h2>
      <div className="characters-container" style={{
        display: 'flex', gap: 20, flexWrap: 'wrap',
        justifyContent: 'center', width: '100%', maxWidth: 800,
      }}>
        {characters.map(char => (
          <CharacterCard
            key={char.id}
            char={char}
            selected={selectedChar === char.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      <button
        disabled={!selectedChar}
        onClick={onConfirm}
        className="button-hover"
        style={{
          marginTop: 30,
        }}
      >
        Подтвердить
      </button>

      <button
        onClick={onBack}
        className="link-button"
      >
        Назад
      </button>
    </div>
  );
}

// Меню выбора сложности
function DifficultySelect({ onSelect, onBack }) {
  const difficulties = [
    { level: 'Легкий', multiplier: 0.5, desc: 'ИИ играет случайные карты.' },
    { level: 'Средний', multiplier: 0.8, desc: 'ИИ играет самые сильные карты.' },
    { level: 'Высокий', multiplier: 1.0, desc: 'ИИ ищет лучшую атаку.' },
    { level: 'Магистр', multiplier: 1.2, desc: 'ИИ выбирает идеальную стратегию.' },
  ];
  return (
    <div className="game-container difficulty-select-page">
      <h2>Выберите сложность</h2>
      <div className="difficulties-container" style={{
        display: 'flex', gap: 20, flexWrap: 'wrap',
        justifyContent: 'center', width: '100%', maxWidth: 800,
      }}>
        {difficulties.map(d => (
          <div
            key={d.level}
            onClick={() => onSelect(d.multiplier)}
            className="character-card button-hover"
          >
            <h3 style={{color: 'var(--color-light-text)'}}>{d.level}</h3>
            <p style={{color: 'var(--color-light-text)'}}>{d.desc}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onBack}
        className="link-button"
      >
        Назад
      </button>
    </div>
  );
}

// Функция для перемешивания колоды (алгоритм Фишера-Йетса)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Утилита для обработки получения урона, чтобы избежать прямого изменения
const takeDamage = (playerState, amount) => {
  let damage = amount;
  let newPlayerState = { ...playerState };
  if (newPlayerState.armor > 0) {
    const blocked = Math.min(newPlayerState.armor, damage);
    newPlayerState.armor -= blocked;
    damage -= blocked;
  }
  newPlayerState.hp -= damage;
  if (newPlayerState.hp < 0) newPlayerState.hp = 0;
  return newPlayerState;
}

// Вспомогательная функция для определения максимального размера руки
const getMaxHandSize = (currentRound) => {
  if (currentRound <= 3) return 3;
  if (currentRound <= 6) return 5;
  return 6;
};

function Game({ playerClass, difficulty, onExit }) {
  const [player, setPlayer] = useState(null);
  const [ai, setAi] = useState(null);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(1);

  // Логика игры
  const playCard = (cardIndex) => {
    if (!player || turn !== 'player') return;
    const card = player.hand[cardIndex];
    if (!card) return;

    if (card.cost > player.mana) {
      setMessage('Недостаточно маны ✨');
      return;
    }

    let newPlayer = { ...player, hand: [...player.hand], deck: [...player.deck] };
    let newAi = { ...ai, hand: [...ai.hand], deck: [...ai.deck] };

    newPlayer.mana -= card.cost;
    newPlayer.hand.splice(cardIndex, 1);

    if (card.type === 'attack') {
      if (newAi.reflect > 0) {
        newPlayer = takeDamage(newPlayer, newAi.reflect);
        setMessage(`ИИ отражает ${newAi.reflect} урона! 💥`);
      }
      newAi = takeDamage(newAi, card.value);
      setMessage(`Вы нанесли ${card.value} урона ИИ. 💥`);
    } else if (card.type === 'defense') {
      newPlayer.armor += card.value;
      setMessage(`Вы получили ${card.value} брони. 🛡️`);
    } else if (card.id === 'reflect') {
      newPlayer.reflect = 3;
      setMessage('Вы активировали отражение урона. ✨');
    } else {
      setMessage('Карта сыграна.');
    }

    setPlayer(newPlayer);
    setAi(newAi);

    // Добавляем задержку перед ходом ИИ
    setTimeout(() => {
      setTurn('ai');
      setMessage('Ход ИИ...');
    }, 1000);
  };

  // Логика инициализации игры
  useEffect(() => {
    const pDeck = shuffle(playerClass.deck.map(card => ({ ...card, uuid: uuidv4() })));
    const aiClass = characters.find(c => c.id !== playerClass.id) || characters[0];
    const aiDeck = shuffle(aiClass.deck.map(card => ({ ...card, uuid: uuidv4() })));

    const p = { name: 'Игрок', maxHp: 30, hp: 30, mana: 0, maxMana: 2, armor: 0, deck: pDeck, hand: [], reflect: 0 };
    const aiPlayer = { name: 'ИИ', maxHp: 30, hp: 30, mana: 0, maxMana: 2, armor: 0, deck: aiDeck, hand: [], reflect: 0 };

    const initialHandSize = getMaxHandSize(1);
    for (let i = 0; i < initialHandSize; i++) {
        const pCard = p.deck.shift();
        if (pCard) p.hand.push(pCard);
        const aiCard = aiPlayer.deck.shift();
        if (aiCard) aiPlayer.hand.push(aiCard);
    }

    p.maxMana = 2;
    p.mana = p.maxMana;
    aiPlayer.maxMana = 2;
    aiPlayer.mana = aiPlayer.maxMana;
    aiPlayer.hp = Math.round(aiPlayer.hp * difficulty);

    setPlayer(p);
    setAi(aiPlayer);
    setTurn('player');
    setMessage('Ваш ход ✨');
    setRound(1);
  }, [playerClass, difficulty]);

  // Логика хода ИИ и начала нового раунда
  useEffect(() => {
    if (turn === 'ai' && ai && player) {
      let newAi = { ...ai, hand: [...ai.hand], deck: [...ai.deck] };
      let newPlayer = { ...player, hand: [...player.hand], deck: [...player.deck] };

      // Логика startTurn() для ИИ
      newAi.maxMana = Math.min(newAi.maxMana + 1, 10);
      newAi.mana = newAi.maxMana;
      
      const aiMaxHandSize = getMaxHandSize(round);
      while(newAi.hand.length < aiMaxHandSize && newAi.deck.length > 0) {
        const cardToDraw = newAi.deck.shift();
        if (cardToDraw) {
          newAi.hand.push(cardToDraw);
        }
      }
      newAi.reflect = 0;

      const aiHasPlayableCards = newAi.hand.some(c => c.cost <= newAi.mana);
      const aiDeckEmpty = newAi.deck.length === 0;

      if (!aiHasPlayableCards && aiDeckEmpty) {
        setMessage('У ИИ закончились карты и нет ходов. Вы выиграли! 🎉');
        setAi({ ...newAi, hp: 0 });
        return;
      }

      let card;
      const playableCards = newAi.hand.filter(c => c.cost <= newAi.mana);

      // Логика выбора карты в зависимости от сложности
      if (difficulty <= 0.5) { // Легкий
        const randomCardIndex = Math.floor(Math.random() * playableCards.length);
        card = playableCards[randomCardIndex];
      } else if (difficulty <= 0.8) { // Средний
        card = playableCards.sort((a, b) => b.cost - a.cost)[0];
      } else if (difficulty <= 1.0) { // Высокий
        const attackCards = playableCards.filter(c => c.type === 'attack');
        card = attackCards.sort((a, b) => b.value - a.value)[0] || playableCards.sort((a, b) => b.cost - a.cost)[0];
      } else { // Магистр (1.2)
        const attackCards = playableCards.filter(c => c.type === 'attack');
        const defenseCards = playableCards.filter(c => c.type === 'defense');
        if (player.hp <= 10 && attackCards.length > 0) {
          card = attackCards.sort((a, b) => b.value - a.value)[0];
        } else if (ai.hp <= 10 && defenseCards.length > 0) {
          card = defenseCards.sort((a, b) => b.value - a.value)[0];
        } else {
          card = playableCards.sort((a, b) => b.cost - a.cost)[0];
        }
      }

      if (!card) {
        setMessage('ИИ пропускает ход (нет маны или карт)');
      } else {
        const cardIndex = newAi.hand.findIndex(c => c.uuid === card.uuid);
        newAi.mana -= card.cost;
        newAi.hand.splice(cardIndex, 1);

        if (card.type === 'attack') {
          if (newPlayer.reflect > 0) {
            newAi = takeDamage(newAi, newPlayer.reflect);
            setMessage(`Вы отражаете ${newPlayer.reflect} урона! 💥`);
          }
          newPlayer = takeDamage(newPlayer, card.value);
          setMessage(`ИИ наносит вам ${card.value} урона. 💥`);
        } else if (card.type === 'defense') {
          newAi.armor += card.value;
          setMessage(`ИИ получает ${card.value} брони. 🛡️`);
        } else if (card.id === 'reflect') {
          newAi.reflect = 3;
          setMessage('ИИ активировал отражение урона. ✨');
        } else {
          setMessage('ИИ сыграл карту.');
        }
      }

      setTimeout(() => {
        const nextRound = round + 1;
        const playerMaxHandSize = getMaxHandSize(nextRound);
        
        newPlayer.maxMana = Math.min(newPlayer.maxMana + 1, 10);
        newPlayer.mana = newPlayer.maxMana;
        while(newPlayer.hand.length < playerMaxHandSize && newPlayer.deck.length > 0) {
          const cardToDraw = newPlayer.deck.shift();
          if (cardToDraw) {
            newPlayer.hand.push(cardToDraw);
          }
        }
        newPlayer.reflect = 0;

        const playerHasPlayableCards = newPlayer.hand.some(c => c.cost <= newPlayer.mana);
        if (!playerHasPlayableCards && newPlayer.deck.length === 0) {
          setMessage('У вас закончились карты, и вы не можете сделать ход. Вы проиграли! 😞');
          setPlayer({ ...newPlayer, hp: 0 });
          return;
        }

        setPlayer(newPlayer);
        setAi(newAi);
        setTurn('player');
        setRound(nextRound);
        setMessage('Ваш ход ✨');
      }, 1500);
    }
  }, [turn, ai, player, difficulty, round]);

  if (!player || !ai) {
    return (
      <div className="game-container game-page">
        <h2>Инициализация игры...</h2>
      </div>
    );
  }

  if (player.hp <= 0) {
    return (
      <div className="game-container game-page victory-defeat-screen">
        <h1>Вы проиграли 😞</h1>
        <button onClick={onExit} className="button-hover">
          Попробовать снова
        </button>
      </div>
    );
  }

  if (ai.hp <= 0) {
    return (
      <div className="game-container game-page victory-defeat-screen">
        <h1>Вы выиграли! 🎉</h1>
        <button onClick={onExit} className="button-hover">
          Играть снова
        </button>
      </div>
    );
  }

  return (
    <div className="game-container game-page">
      <button onClick={() => { setPlayer({ ...player, hp: 0 }); }} className="surrender-button">
        Сдаться 🏳️
      </button>

      <div className="game-info-container">
        <h2>Раунд: {round}</h2>
        <h2>Ход: {turn === 'player' ? 'Игрока' : 'ИИ'}</h2>
        <div className="game-players-container">
          <div className="player-box">
            <h3>Игрок</h3>
            <p>HP: {player.hp}</p>
            <p>Мана: {player.mana}/{player.maxMana} ✨</p>
            <p>Броня: {player.armor} 🛡️</p>
          </div>

          <div className="player-box-ai">
            <h3>ИИ</h3>
            <p>HP: {ai.hp}</p>
            <p>Мана: {ai.mana}/{ai.maxMana} ✨</p>
            <p>Броня: {ai.armor} 🛡️</p>
            <p>Карт на руке: {ai.hand.length}</p>
          </div>
        </div>

        <p className="game-message">{message}</p>
      </div>

      <div className="player-hand">
        {player.hand.map((card, i) => {
          const isPlayable = player.mana >= card.cost && turn === 'player';
          return (
            <div
              key={card.uuid}
              onClick={() => playCard(i)}
              className={`hand-card ${isPlayable ? 'playable' : ''}`}
              style={{
                pointerEvents: turn === 'player' ? 'auto' : 'none',
              }}
              title={`${card.name}: ${card.description}`}
            >
              <span className="card-cost">{card.cost}</span>
              <h4>{card.name}</h4>
              <p>{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState('landing');
  const [selectedChar, setSelectedChar] = useState(null);
  const [difficulty, setDifficulty] = useState(1);

  const handleConfirmChar = () => {
    if (selectedChar) {
      setStage('difficultySelect');
    }
  };

  const handleConfirmDifficulty = (difficultyMultiplier) => {
    setDifficulty(difficultyMultiplier);
    setStage('game');
  };

  const playerClass = characters.find(c => c.id === selectedChar) || characters[0];

  return (
    <div className="App">
      {stage === 'landing' && (
        <Landing
          onPlay={() => setStage('characterSelect')}
          onOpenInfo={() => setStage('info')}
        />
      )}
      {stage === 'info' && <InfoModal onClose={() => setStage('landing')} />}
      {stage === 'characterSelect' && (
        <CharacterSelect
          characters={characters}
          selectedChar={selectedChar}
          onSelect={setSelectedChar}
          onBack={() => {
            setStage('landing');
            setSelectedChar(null);
          }}
          onConfirm={handleConfirmChar}
        />
      )}
      {stage === 'difficultySelect' && (
        <DifficultySelect
          onSelect={handleConfirmDifficulty}
          onBack={() => {
            setStage('characterSelect');
            setDifficulty(1);
          }}
        />
      )}
      {stage === 'game' && (
        <Game
          playerClass={playerClass}
          difficulty={difficulty}
          onExit={() => {
            setStage('landing');
            setSelectedChar(null);
            setDifficulty(1);
          }}
        />
      )}
    </div>
  );
}

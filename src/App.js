import React, { useState, useEffect, useRef } from 'react';
import { characters, allCards } from './gameData';
import './animations.css';
import './modal.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

// Компонент, отображающий анимированный оверлей во время перехода
function TransitionOverlay() {
  return (
    <div className="transition-overlay">
      <div className="spinner"></div>
    </div>
  );
}

// Компонент модального окна с информацией
function InfoModal({ onAnimationEnd }) {
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);

  const handleClose = () => {
    setShouldAnimateOut(true);
  };

  useEffect(() => {
    if (shouldAnimateOut) {
      const timer = setTimeout(() => {
        onAnimationEnd(); // Полностью скрываем компонент, когда анимация закончится
      }, 300); // Длительность анимации закрытия в CSS (должна соответствовать CSS)
      return () => clearTimeout(timer);
    }
  }, [shouldAnimateOut, onAnimationEnd]);

  return (
    <div className={`modal-backdrop ${shouldAnimateOut ? 'modal-fade-out' : 'modal-fade-in'}`}>
      <div className="modal-content">
        <h2>О Manafall</h2>
        <p>Версия: Alpha</p>
        <p>Dante Morrigan 🧑‍💻</p>
        <p>Минималистичная карточная игра, в которой побеждает тот, кто лучше управляет маной и стратегией. Основана на простой механике и стильном дизайне.</p>
        <button onClick={handleClose} className="modal-close-button">Закрыть</button>
      </div>
    </div>
  );
}

// Главная страница с анимацией
function Landing({ onPlay, onOpenInfo, isFadingOut, isMuted, onToggleMute, volume, onVolumeChange, animateStep }) {
  return (
    <div className={`game-container landing-page ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="animated-gradient"></div>

      <h1 style={{
        opacity: animateStep >= 1 ? 1 : 0,
        transform: animateStep >= 1 ? 'translateY(0)' : 'translateY(-50px)',
        transition: 'all 0.6s ease',
        position: 'relative',
        zIndex: 2,
      }}>
        Manafall
      </h1>

      <p style={{
        marginTop: 20, maxWidth: 450, fontSize: '1.2rem',
        opacity: animateStep >= 2 ? 1 : 0,
        transform: animateStep >= 2 ? 'translateX(0)' : 'translateX(-50px)',
        transition: 'all 0.6s ease',
        position: 'relative',
        zIndex: 2,
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
          position: 'relative',
          zIndex: 2,
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
          zIndex: 2,
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

      {/* Элементы управления музыкой */}
      <div style={{
        position: 'absolute', bottom: 20, left: 20,
        opacity: animateStep >= 3 ? 1 : 0,
        transition: 'opacity 0.6s ease',
        display: 'flex', alignItems: 'center', gap: '10px',
        zIndex: 2,
      }}>
        {/* Кнопка Mute/Unmute */}
        <button
          onClick={onToggleMute}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-light-text)', padding: 0,
          }}
          title={isMuted ? "Включить музыку" : "Выключить музыку"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          )}
        </button>
        {/* Ползунок громкости */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={onVolumeChange}
          className="w-24 appearance-none h-1 bg-gray-600 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}

// Карточка персонажа
function CharacterCard({ char, selected, onSelect }) {
  const emoji = char.id === 'warrior' ? '⚔️' : char.id === 'mage' ? '✨' : '';
  return (
    <div
      onClick={() => onSelect(char.id)}
      className={`character-card ${selected ? 'selected' : ''}`}
    >
      <h3>{char.name} {emoji}</h3>
      <p>{char.desc}</p>
    </div>
  );
}

// Меню выбора персонажа
function CharacterSelect({ characters, selectedChar, onSelect, onBack, onConfirm, isFadingOut }) {
  return (
    <div className={`game-container character-select-page ${isFadingOut ? 'fade-out' : ''}`}>
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
function DifficultySelect({ onSelect, onBack, isFadingOut }) {
  const difficulties = [
    { level: 'Легкий', emoji: '🌱', multiplier: 0.5, desc: 'ИИ играет случайные карты.' },
    { level: 'Средний', emoji: '🧠', multiplier: 0.8, desc: 'ИИ играет самые сильные карты.' },
    { level: 'Высокий', emoji: '🔥', multiplier: 1.0, desc: 'ИИ ищет лучшую атаку.' },
    { level: 'Магистр', emoji: '👑', multiplier: 1.2, desc: 'ИИ выбирает идеальную стратегию.' },
  ];
  return (
    <div className={`game-container difficulty-select-page ${isFadingOut ? 'fade-out' : ''}`}>
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
            <h3 style={{color: 'var(--color-light-text)'}}>{d.level} {d.emoji}</h3>
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

// Компонент полосы состояния (HP, Mana, Armor)
function StatusBar({ label, current, max, color, isArmor }) {
  const effectiveMax = max || current;
  const percentage = effectiveMax > 0 ? (current / effectiveMax) * 100 : 0;

  return (
    <div className="status-bar-container">
      <span className="status-bar-label">{label}: {current}</span>
      <div className="status-bar-bg">
        <div
          className={`status-bar-fill ${isArmor ? 'armor' : ''}`}
          style={{
            width: `${isArmor ? Math.min((current / 15) * 100, 100) : percentage}%`, // Armor max is 15
            backgroundColor: isArmor ? 'var(--color-armor)' : color
          }}
        />
      </div>
    </div>
  );
}

// Функция для перемешивания колоды (алгоритм Фишера-Йетса)
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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

// Функция для создания сбалансированной колоды
const createBalancedDeck = (baseCards, totalSize) => {
  const shuffledCards = shuffle(baseCards);
  const deck = [];
  const cardCounts = {};

  // Функция для безопасного добавления карты
  const addCard = (cardId) => {
    const cardToAdd = allCards.find(c => c.id === cardId);
    if (cardToAdd) {
      deck.push({ ...cardToAdd, uuid: uuidv4() });
      cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;
      return true;
    }
    return false;
  };
  
  // Создание колоды с заданным составом
  const deckComposition = {
    'attack': 6,
    'defense': 4,
    'utility': 2,
    'heal': 1
  };

  const cardPool = [...shuffledCards];
  const finalDeck = [];

  for (const [type, count] of Object.entries(deckComposition)) {
    const cardsOfType = cardPool.filter(c => c.type === type);
    finalDeck.push(...cardsOfType.slice(0, count));
  }

  // Добиваем до нужного размера, если нужно
  while (finalDeck.length < totalSize && cardPool.length > 0) {
    finalDeck.push({ ...cardPool.pop(), uuid: uuidv4() });
  }

  return shuffle(finalDeck);
};


function Game({ playerClass, difficulty, onExit, isFadingOut }) {
  const [player, setPlayer] = useState(null);
  const [ai, setAi] = useState(null);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(1);
  const maxArmor = 15; // Ограничение на броню

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

    let actionMessage = '';

    if (card.type === 'attack') {
      if (newAi.reflect > 0) {
        newPlayer = takeDamage(newPlayer, newAi.reflect);
        actionMessage = `ИИ отражает ${newAi.reflect} урона! `;
      }
      newAi = takeDamage(newAi, card.value);
      actionMessage = `Вы нанесли ${card.value} урона ИИ. 💥`;
    } else if (card.type === 'defense') {
      newPlayer.armor = Math.min(newPlayer.armor + card.value, maxArmor);
      actionMessage = `Вы получили ${card.value} брони. 🛡️`;
    } else if (card.id === 'reflect') {
      newPlayer.reflect = 3;
      actionMessage = 'Вы активировали отражение урона. ✨';
    } else if (card.type === 'heal') {
      newPlayer.hp = Math.min(newPlayer.hp + card.value, newPlayer.maxHp);
      actionMessage = `Вы восстановили ${card.value} HP. 💖`;
    } else if (card.id === 'draw_cards') {
      for (let i = 0; i < card.value; i++) {
        const cardToDraw = newPlayer.deck.shift();
        if (cardToDraw) {
          newPlayer.hand.push(cardToDraw);
        }
      }
      actionMessage = `Вы взяли ${card.value} карт из колоды. 🃏`;
    } else if (card.id === 'mana_drain') {
      newAi.mana = Math.max(0, newAi.mana - card.value);
      actionMessage = `Вы вытянули ${card.value} маны у ИИ. 🌀`;
    } else {
      actionMessage = 'Карта сыграна.';
    }

    setPlayer(newPlayer);
    setAi(newAi);
    setMessage(actionMessage);

    setTurn('ai');
    setTimeout(() => setMessage('Ход ИИ...'), 1000);
  };

  // Логика инициализации игры
  useEffect(() => {
    // Создаем сбалансированные колоды для игрока и ИИ
    const pDeck = createBalancedDeck(playerClass.deck, 15);
    const aiClass = characters.find(c => c.id !== playerClass.id) || characters[0];
    const aiDeck = createBalancedDeck(aiClass.deck, 15);

    // Инициализация состояний игры с новыми колодами
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
      // Добавляем задержку перед началом хода ИИ
      const aiTurnTimeout = setTimeout(() => {
        let newAi = { ...ai, hand: [...ai.hand], deck: [...ai.deck] };
        let newPlayer = { ...player, hand: [...player.hand], deck: [...player.deck] };

        // Логика начала хода для ИИ
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

        const playableCards = newAi.hand.filter(c => c.cost <= newAi.mana);
        if (playableCards.length === 0) {
          setMessage('ИИ пропускает ход (нет маны или карт)');
          setTurn('player');
          return;
        }

        let card;
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
          } else if (newAi.hp <= 10 && defenseCards.length > 0) {
            card = defenseCards.sort((a, b) => b.value - a.value)[0];
          } else {
            card = playableCards.sort((a, b) => b.cost - a.cost)[0];
          }
        }

        if (!card) {
            // Если нет играбельной карты, ИИ пропускает ход
            setMessage('ИИ пропускает ход (нет маны или карт)');
        } else {
          const cardIndex = newAi.hand.findIndex(c => c.uuid === card.uuid);
          newAi.mana -= card.cost;
          newAi.hand.splice(cardIndex, 1);

          let actionMessage = '';

          if (card.type === 'attack') {
            if (newPlayer.reflect > 0) {
              newAi = takeDamage(newAi, newPlayer.reflect);
              actionMessage = `Вы отражаете ${newPlayer.reflect} урона! `;
            }
            newPlayer = takeDamage(newPlayer, card.value);
            actionMessage = `ИИ наносит вам ${card.value} урона. 💥`;
          } else if (card.type === 'defense') {
            newAi.armor = Math.min(newAi.armor + card.value, maxArmor);
            actionMessage = `ИИ получает ${card.value} брони. 🛡️`;
          } else if (card.id === 'reflect') {
            newAi.reflect = 3;
            actionMessage = 'ИИ активировал отражение урона. ✨';
          } else if (card.type === 'heal') {
            newAi.hp = Math.min(newAi.hp + card.value, newAi.maxHp);
            actionMessage = `ИИ восстановил ${card.value} HP. 💖`;
          } else if (card.id === 'draw_cards') {
            for (let i = 0; i < card.value; i++) {
              const cardToDraw = newAi.deck.shift();
              if (cardToDraw) {
                newAi.hand.push(cardToDraw);
              }
            }
            actionMessage = `ИИ взял ${card.value} карт из колоды. 🃏`;
          } else if (card.id === 'mana_drain') {
            newPlayer.mana = Math.max(0, newPlayer.mana - card.value);
            actionMessage = `ИИ вытянул ${card.value} маны у вас. 🌀`;
          } else {
            actionMessage = 'ИИ сыграл карту.';
          }
          setMessage(actionMessage);
        }

        // Завершение хода ИИ и начало хода игрока
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
        }, 1500); // Задержка перед началом хода игрока
      }, 1000); // Задержка перед началом хода ИИ

      return () => clearTimeout(aiTurnTimeout);
    }
  }, [turn, ai, player, difficulty, round]);

  if (!player || !ai) {
    return (
      <div className={`game-container game-page ${isFadingOut ? 'fade-out' : ''}`}>
        <h2>Инициализация игры...</h2>
      </div>
    );
  }

  return (
    <div className={`game-container game-page ${isFadingOut ? 'fade-out' : ''}`}>
      {player.hp <= 0 ? (
        <div className="victory-defeat-screen">
          <h1>Вы проиграли 😞</h1>
          <button onClick={onExit} className="button-hover">
            Попробовать снова
          </button>
        </div>
      ) : ai.hp <= 0 ? (
        <div className="victory-defeat-screen">
          <h1>Вы выиграли! 🎉</h1>
          <button onClick={onExit} className="button-hover">
            Играть снова
          </button>
        </div>
      ) : (
        <>
          <button onClick={() => { setPlayer({ ...player, hp: 0 }); }} className="surrender-button-styled">
            Сдаться 🏳️
          </button>

          <div className="game-info-container">
            <h2>Раунд: {round}</h2>
            <div className="game-players-container">
              <div className="player-box">
                <h3>Игрок</h3>
                <StatusBar label="HP" current={player.hp} max={player.maxHp} color="var(--color-error)" />
                <StatusBar label="Мана" current={player.mana} max={player.maxMana} color="var(--color-mana)" />
                <StatusBar label="Броня" current={player.armor} max={maxArmor} color="var(--color-armor)" isArmor={true} />
              </div>

              <div className="player-box-ai">
                <h3>ИИ</h3>
                <StatusBar label="HP" current={ai.hp} max={ai.maxHp} color="var(--color-error)" />
                <StatusBar label="Мана" current={ai.mana} max={ai.maxMana} color="var(--color-mana)" />
                <StatusBar label="Броня" current={ai.armor} max={maxArmor} color="var(--color-armor)" isArmor={true} />
                <p>Карт в колоде: {ai.deck.length}</p>
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
        </>
      )}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState('landing');
  const [selectedChar, setSelectedChar] = useState(null);
  const [difficulty, setDifficulty] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const TRANSITION_DURATION = 500;
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleStageChange = (newStage, callback = () => {}) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(newStage);
      setIsTransitioning(false);
      callback();
    }, TRANSITION_DURATION);
  };

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Ошибка при воспроизведении музыки:", error);
      }
    }
    handleStageChange('characterSelect');
  };

  const handleConfirmChar = () => {
    if (selectedChar) {
      handleStageChange('difficultySelect');
    }
  };

  const handleConfirmDifficulty = (difficultyMultiplier) => {
    handleStageChange('game', () => {
      setDifficulty(difficultyMultiplier);
    });
  };

  const handleExitGame = () => {
    handleStageChange('landing', () => {
      setSelectedChar(null);
      setDifficulty(1);
    });
  };

  const handleBackFromCharSelect = () => {
    handleStageChange('landing', () => setSelectedChar(null));
  };
  
  const handleBackFromDifficultySelect = () => {
    handleStageChange('characterSelect');
  };
  
  const handleOpenInfo = () => setIsInfoModalVisible(true);
  const handleCloseInfo = () => setIsInfoModalVisible(false);

  const playerClass = characters.find(c => c.id === selectedChar) || characters[0];
  
  const [animateStep, setAnimateStep] = useState(0);
  useEffect(() => {
    if (stage === 'landing' && !isTransitioning) {
      const timers = [
        setTimeout(() => setAnimateStep(1), 300),
        setTimeout(() => setAnimateStep(2), 900),
        setTimeout(() => setAnimateStep(3), 1300),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setAnimateStep(0);
    }
  }, [stage, isTransitioning]);

  return (
    <div className="App">
      {isTransitioning && <TransitionOverlay />}
      {stage === 'landing' && (
        <Landing
          onPlay={handlePlay}
          onOpenInfo={handleOpenInfo}
          isFadingOut={isTransitioning}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          animateStep={animateStep}
        />
      )}
      {isInfoModalVisible && (
        <InfoModal
          onClose={handleCloseInfo}
          onAnimationEnd={() => setIsInfoModalVisible(false)}
        />
      )}
      {stage === 'characterSelect' && (
        <CharacterSelect
          characters={characters}
          selectedChar={selectedChar}
          onSelect={setSelectedChar}
          onBack={handleBackFromCharSelect}
          onConfirm={handleConfirmChar}
          isFadingOut={isTransitioning}
        />
      )}
      {stage === 'difficultySelect' && (
        <DifficultySelect
          onSelect={handleConfirmDifficulty}
          onBack={handleBackFromDifficultySelect}
          isFadingOut={isTransitioning}
        />
      )}
      {stage === 'game' && (
        <Game
          playerClass={playerClass}
          difficulty={difficulty}
          onExit={handleExitGame}
          isFadingOut={isTransitioning}
        />
      )}
    </div>
  );
}
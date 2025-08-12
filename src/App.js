import React, { useState, useEffect } from 'react';
import { characters } from './gameData';
import './animations.css';

// Главная страница с анимацией
function Landing({ onPlay }) {
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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', padding: 20,
      backgroundColor: '#1e3a22', color: '#b8d8b8',
      fontFamily: "'Orbitron', sans-serif",
      position: 'relative', overflow: 'hidden', textAlign: 'center', userSelect: 'none',
    }}>
      <h1 style={{
        fontSize: '4rem', margin: 0,
        opacity: animateStep >= 1 ? 1 : 0,
        transform: animateStep >= 1 ? 'translateY(0)' : 'translateY(-50px)',
        transition: 'all 0.6s ease',
      }}>
        CardGame
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
          marginTop: 40, padding: '16px 50px', fontSize: '1.3rem',
          borderRadius: 12, border: 'none', cursor: 'pointer',
          backgroundColor: '#8ccf8c', color: '#1e3a22',
          opacity: animateStep >= 3 ? 1 : 0,
          transform: animateStep >= 3 ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.6s ease',
          animation: animateStep >= 3 ? 'pulse 2s infinite' : 'none',
        }}
      >
        Играть
      </button>

      <div style={{
        position: 'absolute', top: '-20%', left: '-20%',
        width: '140%', height: '140%',
        background: 'radial-gradient(circle at center, #2a5f38, transparent 70%)',
        opacity: 0.1, pointerEvents: 'none', zIndex: 0,
      }} />
    </div>
  );
}

// Карточка персонажа
function CharacterCard({ char, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(char.id)}
      className={`character-card ${selected ? 'selected' : ''}`}
      style={{
        cursor: 'pointer',
        borderRadius: 10,
        minWidth: 160,
        backgroundColor: '#2a4d25',
        padding: 20,
        userSelect: 'none',
        border: selected ? '2px solid #7cff9c' : '2px solid transparent',
        transition: 'border-color 0.3s',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: '#b8d8b8' }}>{char.name}</h3>
      <p style={{ fontSize: '0.9rem', color: '#c7dbbe' }}>{char.desc}</p>
    </div>
  );
}

// Меню выбора персонажа
function CharacterSelect({ characters, selectedChar, onSelect, onBack, onConfirm }) {
  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#1e3a22', color: '#b8d8b8',
      fontFamily: "'Orbitron', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20,
      userSelect: 'none',
    }}>
      <h2 style={{ marginBottom: 20 }}>Выберите персонажа</h2>
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
          marginTop: 30, padding: '12px 25px', fontSize: '1rem',
          borderRadius: 6, border: 'none',
          backgroundColor: selectedChar ? '#8ccf8c' : '#555',
          color: selectedChar ? '#1e3a22' : '#aaa',
          cursor: selectedChar ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.3s',
          userSelect: 'none',
        }}
      >
        Подтвердить
      </button>

      <button
        onClick={onBack}
        style={{
          marginTop: 15, background: 'none', border: 'none',
          color: '#b8d8b8', cursor: 'pointer', textDecoration: 'underline',
          userSelect: 'none',
        }}
      >
        Назад
      </button>
    </div>
  );
}

// Класс игрока с базовой логикой
class Player {
  constructor(name, deck) {
    this.name = name;
    this.maxHp = 30;
    this.hp = 30;
    this.mana = 0;
    this.maxMana = 2; // Начальное значение маны
    this.armor = 0;
    this.deck = [...deck];
    this.hand = [];
    this.reflect = 0;
  }

  drawCard() {
    if (this.hand.length < 7 && this.deck.length > 0) {
      const cardToDraw = this.deck.shift();
      this.hand.push(cardToDraw);
    }
  }

  startTurn() {
    this.maxMana = Math.min(this.maxMana + 1, 10); // Увеличиваем ману каждый ход
    this.mana = this.maxMana;
    this.drawCard();
    this.reflect = 0;
  }

  takeDamage(amount) {
    let damage = amount;
    if (this.armor > 0) {
      const blocked = Math.min(this.armor, damage);
      this.armor -= blocked;
      damage -= blocked;
    }
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
  }
}

function Game({ playerClass, onExit }) {
  const [player, setPlayer] = useState(null);
  const [ai, setAi] = useState(null);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('');

  // Логика игры
  const playCard = (cardIndex) => {
    if (!player || turn !== 'player') return;
    const card = player.hand[cardIndex];
    if (!card) return;

    if (card.cost > player.mana) {
      setMessage('Недостаточно маны ✨');
      return;
    }

    const newPlayer = new Player(player.name, player.deck);
    Object.assign(newPlayer, { ...player, hand: [...player.hand] });

    const newAi = new Player(ai.name, ai.deck);
    Object.assign(newAi, { ...ai, hand: [...ai.hand] });

    newPlayer.mana -= card.cost;
    newPlayer.hand.splice(cardIndex, 1);

    if (card.type === 'attack') {
      if (newAi.reflect > 0) {
        newPlayer.takeDamage(newAi.reflect);
        setMessage(`ИИ отражает ${newAi.reflect} урона! 💥`);
      }
      newAi.takeDamage(card.value);
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

    setTimeout(() => {
      setTurn('ai');
      setMessage('Ход ИИ...');
    }, 1000);
  };

  // Логика инициализации игры
  useEffect(() => {
    if (!player && !ai) {
      const p = new Player('Игрок', [...playerClass.deck]);
      const aiClass = characters.find(c => c.id !== playerClass.id) || characters[0];
      const aiPlayer = new Player('ИИ', [...aiClass.deck]);

      // Начальный добор карт
      for (let i = 0; i < 5; i++) {
        p.drawCard();
        aiPlayer.drawCard();
      }

      p.maxMana = 2;
      p.mana = p.maxMana;

      aiPlayer.maxMana = 2;
      aiPlayer.mana = aiPlayer.maxMana;

      setPlayer(p);
      setAi(aiPlayer);
      setTurn('player');
      setMessage('Ваш ход ✨');
    }
  }, [playerClass, player, ai]);

  // Логика хода ИИ
  useEffect(() => {
    if (turn === 'ai' && ai && player) {
      const newAi = new Player(ai.name, ai.deck);
      Object.assign(newAi, { ...ai, hand: [...ai.hand] });

      const newPlayer = new Player(player.name, player.deck);
      Object.assign(newPlayer, { ...player, hand: [...player.hand] });

      newAi.startTurn();

      // ИИ играет самую дорогую карту, которую может себе позволить
      const playableCards = newAi.hand
        .filter(c => c.cost <= newAi.mana)
        .sort((a, b) => b.cost - a.cost);

      if (playableCards.length === 0) {
        setMessage('ИИ пропускает ход (нет маны или карт)');
      } else {
        const card = playableCards[0];
        const cardIndex = newAi.hand.indexOf(card);

        newAi.mana -= card.cost;
        newAi.hand.splice(cardIndex, 1);

        if (card.type === 'attack') {
          if (newPlayer.reflect > 0) {
            newAi.takeDamage(newPlayer.reflect);
            setMessage(`Вы отражаете ${newPlayer.reflect} урона! 💥`);
          }
          newPlayer.takeDamage(card.value);
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
        setPlayer(newPlayer);
        setAi(newAi);
        setTurn('player');
        newPlayer.startTurn();
        setMessage('Ваш ход ✨');
      }, 1500);
    }
  }, [turn, ai, player]);

  // Условие рендеринга "Инициализация"
  if (!player || !ai) {
    return (
      <div style={styles.container}>
        <h2>Инициализация игры...</h2>
      </div>
    );
  }

  // Проверка победы/поражения
  if (player.hp <= 0) {
    return (
      <div style={styles.container}>
        <h1>Вы проиграли 😞</h1>
        <button onClick={onExit} style={styles.button}>
          Попробовать снова
        </button>
      </div>
    );
  }

  if (ai.hp <= 0) {
    return (
      <div style={styles.container}>
        <h1>Вы выиграли! 🎉</h1>
        <button onClick={onExit} style={styles.button}>
          Играть снова
        </button>
      </div>
    );
  }

  // Игровое поле
  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#1e3a22', color: '#b8d8b8',
      fontFamily: "'Orbitron', sans-serif",
      padding: 20, userSelect: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15,
    }}>
      <h2>Ход: {turn === 'player' ? 'Игрока' : 'ИИ'}</h2>
      <div style={{ display: 'flex', gap: 60, justifyContent: 'center', width: '100%', maxWidth: 900 }}>
        {/* Игрок */}
        <div style={styles.playerBox}>
          <h3>Игрок</h3>
          <p>HP: {player.hp}</p>
          <p>Мана: {player.mana}/{player.maxMana} ✨</p>
          <p>Броня: {player.armor} 🛡️</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {player.hand.map((card, i) => (
              <div
                key={card.id + i}
                onClick={() => playCard(i)}
                className="character-card button-hover"
                style={{
                  minWidth: 120,
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: '#2a4d25',
                  border: player.mana >= card.cost ? '2px solid #7cff9c' : '2px solid #555',
                  opacity: player.mana >= card.cost ? 1 : 0.5,
                  cursor: player.mana >= card.cost ? 'pointer' : 'not-allowed',
                  userSelect: 'none',
                  flexGrow: 1,
                }}
                title={`${card.name} (${card.cost} маны): ${card.description}`}
              >
                <b>{card.name}</b>
                <p style={{ fontSize: '0.8rem', marginTop: 5 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ИИ */}
        <div style={styles.playerBoxAi}>
          <h3>ИИ</h3>
          <p>HP: {ai.hp}</p>
          <p>Мана: {ai.mana}/{ai.maxMana} ✨</p>
          <p>Броня: {ai.armor} 🛡️</p>
          <p>Карт на руке: {ai.hand.length}</p>
        </div>
      </div>

      <p style={{ marginTop: 20, minHeight: 40, fontWeight: 'bold' }}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh', backgroundColor: '#1e3a22', color: '#b8d8b8',
    fontFamily: "'Orbitron', sans-serif",
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center', userSelect: 'none',
  },
  button: {
    marginTop: 20, padding: '12px 30px', fontSize: '1.3rem',
    borderRadius: 10, border: 'none', cursor: 'pointer',
    backgroundColor: '#8ccf8c', color: '#1e3a22',
  },
  playerBox: {
    flex: 1,
    border: '2px solid #8ccf8c',
    borderRadius: 15,
    padding: 15,
  },
  playerBoxAi: {
    flex: 1,
    border: '2px solid #a5d6a7',
    borderRadius: 15,
    padding: 15,
  },
};

// Основной компонент приложения
export default function App() {
  const [stage, setStage] = useState('landing');
  const [selectedChar, setSelectedChar] = useState(null);

  const handleConfirm = () => {
    if (selectedChar) {
      setStage('game');
    }
  };

  const playerClass = characters.find(c => c.id === selectedChar) || characters[0];

  return (
    <>
      {stage === 'landing' && <Landing onPlay={() => setStage('characterSelect')} />}
      {stage === 'characterSelect' && (
        <CharacterSelect
          characters={characters}
          selectedChar={selectedChar}
          onSelect={setSelectedChar}
          onBack={() => {
            setStage('landing');
            setSelectedChar(null);
          }}
          onConfirm={handleConfirm}
        />
      )}
      {stage === 'game' && (
        <Game
          playerClass={playerClass}
          onExit={() => {
            setStage('landing');
            setSelectedChar(null);
          }}
        />
      )}
    </>
  );
}
import React, { useState } from 'react';
import './App.css';

function MultiplayerLobby({ onBack, currentUser, onChallengeSent, isChallengingOpponent }) {
  const [opponentUsername, setOpponentUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleChallenge = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (opponentUsername.trim() === '') {
      setMessage('Введите имя противника.');
      return;
    }
    if (opponentUsername.trim() === currentUser.username) {
      setMessage('Нельзя вызвать самого себя.');
      return;
    }
    if (!users[opponentUsername]) {
        setMessage('Игрок с таким именем не найден.');
        return;
    }

    setMessage(`Вызов отправлен игроку ${opponentUsername}. Ожидание ответа...`);
    onChallengeSent(opponentUsername);
  };

  return (
    <div className="game-container placeholder-page modal-fade-in">
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-glow-green)' }}>
        Сетевая игра
      </h2>
      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        Бросьте вызов другому игроку по его логину.
      </p>

      {/* Форма для вызова противника */}
      <div className="multiplayer-lobby">
        <input
          type="text"
          placeholder="Логин противника"
          value={opponentUsername}
          onChange={(e) => setOpponentUsername(e.target.value)}
          className="multiplayer-input"
          disabled={isChallengingOpponent}
        />
        <button
          onClick={handleChallenge}
          className="button-primary button-hover"
          disabled={isChallengingOpponent}
        >
          {isChallengingOpponent ? 'Ожидание...' : 'Бросить вызов'}
        </button>
      </div>

      {/* Сообщение о статусе */}
      {message && (
        <p className="game-message" style={{ marginTop: '15px' }}>
          {message}
        </p>
      )}

      <button onClick={onBack} className="link-button" style={{ marginTop: '40px' }}>
        Назад
      </button>
    </div>
  );
}

export default MultiplayerLobby;
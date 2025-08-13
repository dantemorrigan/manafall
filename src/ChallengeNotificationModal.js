import React from 'react';
import './modal.css'; // Используем стили для модальных окон

function ChallengeNotificationModal({ challenger, onAccept, onDecline }) {
  return (
    <div className="modal-backdrop modal-fade-in">
      <div className="modal-content auth-modal incoming-challenge-modal">
        <h2>Входящий вызов!</h2>
        <p>Игрок **{challenger}** бросает вам вызов на дуэль.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          <button onClick={onAccept} className="button-primary button-hover">
            Принять
          </button>
          <button onClick={onDecline} className="modal-close-button">
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChallengeNotificationModal;
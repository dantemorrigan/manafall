// src/gameData.js
export const characters = [
  {
    id: 'hero',
    name: 'Герой',
    desc: 'Сбалансированный персонаж, обладающий как атакой, так и защитой.',
    deck: [
      { id: 'attack1', name: 'Удар', type: 'attack', cost: 2, value: 5, description: 'Наносит 5 урона.' },
      { id: 'shield1', name: 'Щит', type: 'defense', cost: 1, value: 4, description: 'Получает 4 брони.' },
      { id: 'strongAttack1', name: 'Сильный удар', type: 'attack', cost: 3, value: 8, description: 'Наносит 8 урона.' },
      { id: 'reflect1', name: 'Отражение', type: 'reflect', cost: 2, value: 3, description: 'Отражает 3 урона в следующем ходу.' },
      { id: 'block1', name: 'Блок', type: 'defense', cost: 0, value: 2, description: 'Получает 2 брони (бесплатно!).' },
      { id: 'quickStrike1', name: 'Быстрый удар', type: 'attack', cost: 1, value: 3, description: 'Наносит 3 урона.' },
      { id: 'manaSurge1', name: 'Прилив маны', type: 'special', cost: 0, value: 1, description: 'Получает 1 дополнительную ману.' },
      { id: 'heavyBlow1', name: 'Тяжелый удар', type: 'attack', cost: 4, value: 10, description: 'Наносит 10 урона.' },
    ]
  },
  {
    id: 'mage',
    name: 'Маг',
    desc: 'Специалист по мане и мощным заклинаниям.',
    deck: [
      { id: 'fireball', name: 'Огненный шар', type: 'attack', cost: 4, value: 10, description: 'Наносит 10 урона.' },
      { id: 'iceBarrier', name: 'Ледяной барьер', type: 'defense', cost: 3, value: 7, description: 'Получает 7 брони.' },
      { id: 'manaDrain', name: 'Осушение маны', type: 'special', cost: 1, value: 0, description: 'Отнимает 1 ману у врага.' },
      { id: 'arcaneBlast', name: 'Тайный взрыв', type: 'attack', cost: 2, value: 5, description: 'Наносит 5 урона.' },
      { id: 'shieldOfMana', name: 'Щит маны', type: 'defense', cost: 2, value: 5, description: 'Получает 5 брони.' },
      { id: 'manaSteal', name: 'Кража маны', type: 'special', cost: 1, value: 0, description: 'Крадет 1 ману у врага.' },
      { id: 'frostbolt', name: 'Ледяная стрела', type: 'attack', cost: 1, value: 3, description: 'Наносит 3 урона.' },
      { id: 'teleport', name: 'Телепорт', type: 'reflect', cost: 3, value: 5, description: 'Отражает 5 урона в следующем ходу.' },
    ]
  }
];

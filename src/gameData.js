// gameData.js
export const characters = [
  {
    id: 'warrior',
    name: 'Воин',
    desc: 'Крепкий защитник, который наносит сильные удары.',
    deck: [
      { id: 'strike', name: 'Удар', description: 'Наносит 5 урона', type: 'attack', value: 5, cost: 2 },
      { id: 'shield_up', name: 'Щит', description: 'Получает 4 брони', type: 'defense', value: 4, cost: 1 },
      { id: 'heavy_blow', name: 'Сильный удар', description: 'Наносит 8 урона', type: 'attack', value: 8, cost: 3 },
      { id: 'strike', name: 'Удар', description: 'Наносит 5 урона', type: 'attack', value: 5, cost: 2 },
      { id: 'shield_up', name: 'Щит', description: 'Получает 4 брони', type: 'defense', value: 4, cost: 1 },
      { id: 'heavy_blow', name: 'Сильный удар', description: 'Наносит 8 урона', type: 'attack', value: 8, cost: 3 },
      { id: 'strike', name: 'Удар', description: 'Наносит 5 урона', type: 'attack', value: 5, cost: 2 },
      { id: 'shield_up', name: 'Щит', description: 'Получает 4 брони', type: 'defense', value: 4, cost: 1 },
      { id: 'heavy_blow', name: 'Сильный удар', description: 'Наносит 8 урона', type: 'attack', value: 8, cost: 3 },
    ],
  },
  {
    id: 'mage',
    name: 'Маг',
    desc: 'Загадочный волшебник, способный отражать атаки.',
    deck: [
      { id: 'fireball', name: 'Огненный шар', description: 'Наносит 6 урона', type: 'attack', value: 6, cost: 2 },
      { id: 'reflect', name: 'Отражение', description: 'Отражает 3 урона', type: 'special', cost: 2 },
      { id: 'frost_armor', name: 'Ледяная броня', description: 'Получает 3 брони', type: 'defense', value: 3, cost: 1 },
      { id: 'fireball', name: 'Огненный шар', description: 'Наносит 6 урона', type: 'attack', value: 6, cost: 2 },
      { id: 'reflect', name: 'Отражение', description: 'Отражает 3 урона', type: 'special', cost: 2 },
      { id: 'frost_armor', name: 'Ледяная броня', description: 'Получает 3 брони', type: 'defense', value: 3, cost: 1 },
      { id: 'fireball', name: 'Огненный шар', description: 'Наносит 6 урона', type: 'attack', value: 6, cost: 2 },
      { id: 'reflect', name: 'Отражение', description: 'Отражает 3 урона', type: 'special', cost: 2 },
      { id: 'frost_armor', name: 'Ледяная броня', description: 'Получает 3 брони', type: 'defense', value: 3, cost: 1 },
    ],
  },
];
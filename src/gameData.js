import { v4 as uuidv4 } from 'uuid';

// Единый пул всех карт в игре
export const allCards = [
    // Карты атаки
    { id: 'strike', name: 'Удар', type: 'attack', cost: 1, value: 5, description: 'Наносит 5 урона.' },
    { id: 'double_strike', name: 'Двойной Удар', type: 'attack', cost: 2, value: 8, description: 'Наносит 8 урона.' },
    { id: 'heavy_blow', name: 'Мощный Удар', type: 'attack', cost: 3, value: 12, description: 'Наносит 12 урона.' },
    { id: 'rapid_fire', name: 'Шквал Стрел', type: 'attack', cost: 2, value: 3, description: 'Наносит 3 урона 2 раза.' },
    { id: 'fireball', name: 'Огненный Шар', type: 'attack', cost: 2, value: 7, description: 'Наносит 7 урона.' },

    // Карты защиты
    { id: 'shield', name: 'Щит', type: 'defense', cost: 1, value: 3, description: 'Получает 3 брони.' },
    { id: 'heavy_shield', name: 'Тяжелый Щит', type: 'defense', cost: 2, value: 5, description: 'Получает 5 брони.' },
    { id: 'barrier', name: 'Магический Барьер', type: 'defense', cost: 2, value: 6, description: 'Получает 6 брони.' },

    // Утилитарные карты
    { id: 'reflect', name: 'Отражение', type: 'utility', cost: 1, value: 3, description: 'Следующая атака отражает 3 урона.' },
    { id: 'mana_potion', name: 'Зелье Маны', type: 'utility', cost: 0, value: 2, description: 'Восстанавливает 2 маны.' },
    { id: 'mana_drain', name: 'Вытягивание Маны', type: 'utility', cost: 1, value: 2, description: 'Отнимает 2 маны у противника.' },
    { id: 'draw_cards', name: 'Взять Карты', type: 'utility', cost: 1, value: 2, description: 'Берёт 2 карты из колоды.' },
    
    // Карты лечения
    { id: 'heal_potion', name: 'Зелье Лечения', type: 'heal', cost: 2, value: 5, description: 'Восстанавливает 5 HP.' },
];

export const characters = [
    {
        id: 'warrior',
        name: 'Воин',
        desc: 'Специализируется на сильных атаках и броне.',
        deck: [
            ...allCards.filter(c => c.type === 'attack'),
            ...allCards.filter(c => c.type === 'defense'),
            allCards.find(c => c.id === 'reflect'),
        ].filter(Boolean),
    },
    {
        id: 'mage',
        name: 'Маг',
        desc: 'Использует магию для контроля и мощных заклинаний.',
        deck: [
            allCards.find(c => c.id === 'fireball'),
            allCards.find(c => c.id === 'mana_drain'),
            allCards.find(c => c.id === 'draw_cards'),
            allCards.find(c => c.id === 'heal_potion'),
            allCards.find(c => c.id === 'barrier'),
        ].filter(Boolean),
    },
];
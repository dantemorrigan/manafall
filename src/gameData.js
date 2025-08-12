 // src/gameData.js
 
 export const cards = {
   // Базовые карты
   strike: { id: 'strike', name: 'Удар', type: 'attack', cost: 1, value: 5, description: 'Наносит 5 урона.' },
   block: { id: 'block', name: 'Блок', type: 'defense', cost: 1, value: 5, description: 'Получает 5 брони.' },
 
   // Новые карты
   heavy_strike: { id: 'heavy_strike', name: 'Мощный удар', type: 'attack', cost: 2, value: 8, description: 'Наносит 8 урона.' },
   shield_wall: { id: 'shield_wall', name: 'Стена щитов', type: 'defense', cost: 2, value: 8, description: 'Получает 8 брони.' },
   heal: { id: 'heal', name: 'Лечение', type: 'heal', cost: 3, value: 10, description: 'Восстанавливает 10 HP.' },
   draw_cards: { id: 'draw_cards', name: 'Прозрение', type: 'utility', cost: 2, value: 2, description: 'Возьмите 2 карты.' },
   mana_drain: { id: 'mana_drain', name: 'Вытяжка маны', type: 'utility', cost: 1, value: 2, description: 'Снижает ману противника на 2.' },
 
   // Карты мага
   fireball: { id: 'fireball', name: 'Огненный шар', type: 'attack', cost: 2, value: 7, description: 'Наносит 7 урона.' },
   ice_barrier: { id: 'ice_barrier', name: 'Ледяной барьер', type: 'defense', cost: 2, value: 6, description: 'Получает 6 брони.' },
   arcane_blast: { id: 'arcane_blast', name: 'Тайный взрыв', type: 'attack', cost: 3, value: 10, description: 'Наносит 10 урона.' },
   mana_burst: { id: 'mana_burst', name: 'Всплеск маны', type: 'utility', cost: 1, value: 1, description: 'Получает 1 дополнительную ману.'},
   teleport: { id: 'teleport', name: 'Телепорт', type: 'utility', cost: 0, value: 1, description: 'Позволяет взять 1 карту.'}
 };
 
 export const characters = [
   {
     id: 'warrior',
     name: 'Герой',
     desc: 'Сбалансированный персонаж, обладающий как атакой, так и защитой.',
     deck: [
       cards.strike, cards.strike, cards.strike, cards.strike,
       cards.block, cards.block, cards.block, cards.block,
       cards.heavy_strike, cards.heavy_strike,
       cards.shield_wall, cards.shield_wall,
       cards.heal, cards.heal,
       cards.draw_cards, cards.draw_cards,
       cards.mana_drain, cards.mana_drain,
       cards.strike, cards.block,
     ],
   },
   {
     id: 'mage',
     name: 'Маг',
     desc: 'Специалист по мане и мощным заклинаниям.',
     deck: [
       cards.fireball, cards.fireball, cards.fireball,
       cards.ice_barrier, cards.ice_barrier, cards.ice_barrier,
       cards.arcane_blast, cards.arcane_blast,
       cards.mana_burst, cards.mana_burst, cards.mana_burst, cards.mana_burst,
       cards.teleport, cards.teleport, cards.teleport, cards.teleport,
       cards.mana_drain, cards.mana_drain,
       cards.heal, cards.heal,
     ],
   },
 ];
 
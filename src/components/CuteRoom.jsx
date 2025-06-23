import React, { useState } from 'react';
import './CuteRoom.css';

const furnitureList = [
  { id: 1, name: '沙發', emoji: '🛋️', color: '#f8c8dc' },
  { id: 2, name: '桌子', emoji: '🪑', color: '#ffe5b4' },
  { id: 3, name: '床', emoji: '🛏️', color: '#b4e7ff' },
  { id: 4, name: '立燈', emoji: '💡', color: '#fffbe7' },
  { id: 5, name: '玩偶', emoji: '🧸', color: '#ffe0b2' },
];

function CuteRoom() {
  const [furnitures, setFurnitures] = useState([]);
  const [dragged, setDragged] = useState(null);
  const [dragPos, setDragPos] = useState(null);
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (item, e, idx) => {
    setDragged(item);
    setDraggedIdx(idx);
    setDragPos({ x: e.clientX, y: e.clientY });
  };
  const handleDrag = (e) => {
    if (dragged && e.clientX && e.clientY) {
      setDragPos({ x: e.clientX, y: e.clientY });
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (dragged) {
      const rect = e.target.getBoundingClientRect();
      setFurnitures([
        ...furnitures,
        {
          ...dragged,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      ]);
      setDragged(null);
      setDragPos(null);
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="cute-room-container">
      <div className="furniture-bar">
        {furnitureList.map((item, idx) => (
          <div
            key={item.id}
            className={`furniture-item${draggedIdx === idx ? ' dragging-outline' : ''}`}
            draggable
            style={{ background: item.color, boxShadow: '0 2px 8px #0001', borderRadius: '1rem' }}
            onDragStart={(e) => handleDragStart(item, e, idx)}
            onDrag={handleDrag}
            onDragEnd={() => { setDragged(null); setDraggedIdx(null); setDragPos(null); }}
          >
            <span className="emoji">{item.emoji}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div
        className="room-area real-room"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="room-bg-3d">
          <div className="floor"></div>
          <div className="wall"></div>
        </div>
        {furnitures.map((item, idx) => (
          <div
            key={idx}
            className="furniture-placed furniture-shadow"
            style={{ left: item.x - 30, top: item.y - 30, background: item.color, boxShadow: '0 8px 24px #0002', borderRadius: '1rem' }}
          >
            <span className="emoji big">{item.emoji}</span>
          </div>
        ))}
        {dragged && dragPos && draggedIdx === null && (
          <div
            className="furniture-placed furniture-dragging"
            style={{ left: dragPos.x - 60, top: dragPos.y - 60, background: dragged.color, opacity: 0.7, pointerEvents: 'none', borderRadius: '1rem', boxShadow: '0 8px 24px #0003' }}
          >
            <span className="emoji big">{dragged.emoji}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CuteRoom;

import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { Trash2 } from 'lucide-react';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eee;
    border-radius: 10px;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 16px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${props => props.color || '#eee'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemDesc = styled.span`
  font-weight: 600;
  color: var(--text);
`;

const ItemDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Amount = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.type === 'income' ? '#4CAF50' : '#FF5252'};
`;

const DeleteBtn = styled.button`
  background: none;
  color: #ddd;
  padding: 5px;
  border-radius: 50%;
  
  &:hover {
    background-color: #ffebee;
    color: #ff5252;
  }
`;

const getCategoryEmoji = (category) => {
  const map = {
    '식비': '🍔',
    '생활': '🛒',
    '교통': '🚕',
    '쇼핑': '🛍️',
    '문화': '🎬',
    '수입': '💰',
    '기타': '📝'
  };
  return map[category] || '📄';
};

const getCategoryColor = (category) => {
  const map = {
    '식비': '#FFECB3',
    '생활': '#E1BEE7',
    '교통': '#BBDEFB',
    '쇼핑': '#FFCDD2',
    '문화': '#C8E6C9',
    '수입': '#FFF9C4',
    '기타': '#F5F5F5'
  };
  return map[category] || '#eee';
};

const TransactionList = ({ transactions }) => {
  const { deleteTransaction } = useAppContext();

  return (
    <ListContainer>
      {transactions.map(t => (
        <ListItem key={t.id}>
          <ItemLeft>
            <CategoryIcon color={getCategoryColor(t.category)}>
              {getCategoryEmoji(t.category)}
            </CategoryIcon>
            <ItemInfo>
              <ItemDesc>{t.desc}</ItemDesc>
              <ItemDate>{t.date} • {t.category}</ItemDate>
            </ItemInfo>
          </ItemLeft>
          <ItemRight>
            <Amount type={t.type}>
              {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()}원
            </Amount>
            <DeleteBtn onClick={() => deleteTransaction(t.id)}>
              <Trash2 size={16} />
            </DeleteBtn>
          </ItemRight>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default TransactionList;

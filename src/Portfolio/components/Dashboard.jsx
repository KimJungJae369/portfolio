import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import PieChartComponent from './PieChartComponent';
import TransactionList from './TransactionList';
import { Plus } from 'lucide-react';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: var(--text);
`;

const AddButton = styled.button`
  background-color: var(--primary);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(255, 183, 178, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background-color: ${props => props.bg || '#fff'};
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardLabel = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 600;
`;

const CardValue = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
`;

const CardCount = styled.span`
  font-size: 12px;
  color: #999;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  height: 100%;
`;

const Section = styled.section`
  background-color: #F8F9FA;
  border-radius: 20px;
  padding: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: var(--text);
`;

const Dashboard = () => {
  const { state, addTransaction } = useAppContext();
  
  // Calculate totals
  const incomeTransactions = state.transactions.filter(t => t.type === 'income');
  const expenseTransactions = state.transactions.filter(t => t.type === 'expense');
  
  const income = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const expense = expenseTransactions.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  
  const incomeCount = incomeTransactions.length;
  const expenseCount = expenseTransactions.length;

  const balance = income - expense;
  const dailyAverage = expense / 7;

  console.log('디버깅:', {
    전체거래: state.transactions.length,
    수입건수: incomeCount,
    지출건수: expenseCount,
    총지출: expense,
    일평균지출: dailyAverage
  });

  const handleAdd = () => {
    // Simple prompt for demo purposes
    const desc = prompt('내용을 입력하세요');
    const amount = Number(prompt('금액을 입력하세요 (지출은 -로 입력)'));
    if (desc && amount) {
      addTransaction({
        date: new Date().toISOString().split('T')[0],
        desc,
        amount,
        category: '기타',
        type: amount > 0 ? 'income' : 'expense'
      });
    }
  };

  return (
    <div>
      <Header>
        <div>
          <Title>12월의 가계부</Title>
          <p style={{color: '#888'}}>이번 달 흐름을 한눈에 확인하세요</p>
        </div>
        <AddButton onClick={handleAdd}>
          <Plus size={18} />
          내역 추가
        </AddButton>
      </Header>

      <CardsGrid>
        <Card bg="#E3F2FD">
          <CardLabel>이번 달 수입</CardLabel>
          <CardValue>+{income.toLocaleString()}원</CardValue>
          <CardCount>{incomeCount}건</CardCount>
        </Card>
        <Card bg="#FFEBEE">
          <CardLabel>이번 달 지출</CardLabel>
          <CardValue>-{expense.toLocaleString()}원</CardValue>
          <CardCount>{expenseCount}건</CardCount>
        </Card>
        <Card bg="#FFF3E0">
          <CardLabel>일평균 지출</CardLabel>
          <CardValue>-{Math.round(dailyAverage).toLocaleString()}원</CardValue>
        </Card>
        <Card bg="#E8F5E9">
          <CardLabel>현재 잔액</CardLabel>
          <CardValue>{balance.toLocaleString()}원</CardValue>
        </Card>
      </CardsGrid>

      <ContentGrid>
        <Section>
          <SectionTitle>지출 분석</SectionTitle>
          <PieChartComponent transactions={state.transactions} />
        </Section>
        <Section>
          <SectionTitle>최근 거래 내역</SectionTitle>
          <TransactionList transactions={state.transactions} />
        </Section>
      </ContentGrid>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';

type Value = Date | null | [Date | null, Date | null];

// 화면 크기 감지 hook
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

function Left({ isMobile }: { isMobile: boolean }){
    const [date, setDate] = useState<Value>(new Date());
    const { state } = useAppContext();
    
    // 특정 날짜의 거래 금액 계산
    const getTransactionsByDate = (date: Date) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // YYYY-MM-DD 형식
        return state.transactions.filter((t: any) => t.date === dateString);
    };
    
    const getTotalByDate = (date: Date) => {
        const transactions = getTransactionsByDate(date);
        const income = transactions
            .filter((t: any) => t.type === 'income')
            .reduce((sum: number, t: any) => sum + t.amount, 0);
        const expense = transactions
            .filter((t: any) => t.type === 'expense')
            .reduce((sum: number, t: any) => sum + t.amount, 0);
        return { income, expense };
    };
    
    const LeftStyle: React.CSSProperties = {
        width : isMobile ? '100%' : '49%',
        backgroundColor : 'white',
        borderRadius : 20,
        boxShadow : '0 0 10px rgba(8, 5, 44, 0.1)',
        padding : isMobile ? 15 : 30,
    }

    return(
        <aside style={LeftStyle}>
             <div className="calendar-container">
                <Calendar 
                    onChange={setDate} 
                    value={date}
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            const { income, expense } = getTotalByDate(date);
                            
                            return (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    fontSize: '10px',
                                    marginTop: '2px',
                                    gap: '1px'
                                }}>
                                    {income > 0 && (
                                        <div style={{
                                            color: '#2196F3',
                                            fontWeight: 'bold'
                                        }}>
                                            +{income.toLocaleString()}
                                        </div>
                                    )}
                                    {expense < 0 && (
                                        <div style={{
                                            color: '#F44336',
                                            fontWeight: 'bold'
                                        }}>
                                            {expense.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    }}
                    formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
                    next2Label={null}
                    prev2Label={null}
                />
            </div>
        </aside>
    )
}
// Left END

function Right({ isMobile }: { isMobile: boolean }){
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { state, deleteTransaction } = useAppContext();
    
    // 날짜 포맷팅 함수
    const formatDate = (date: Date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const dayOfWeek = weekDays[date.getDay()];
        
        return `${month}월 ${day}일 ${dayOfWeek}`;
    };
    
    // 수입과 지출 계산
    const totalIncome = state.transactions
        .filter((t: any) => t.type === 'income')
        .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpense = state.transactions
        .filter((t: any) => t.type === 'expense')
        .reduce((sum: number, t: any) => sum + t.amount, 0);

     const RightStyle: React.CSSProperties = {
        width : isMobile ? '100%' : '49%',
        height : isMobile ? 'auto' : '560px',
        backgroundColor : 'white',
        borderRadius : 20,
        boxShadow : '0 0 10px rgba(8, 5, 44, 0.1)',
        padding : isMobile ? 15 : 20,
        boxSizing : 'border-box',
        overflow : 'hidden'
    }
        const MemoStyle: React.CSSProperties = {
            padding : 20,
            backgroundColor : '#FFFBE6',
            border : '1px solid #FFE066',
            borderRadius : 10,
            margin : '20px 0'
        }

        const TransactionStyle: React.CSSProperties = {
            padding : 20,
        }

        const TransactionItemStyle: React.CSSProperties = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            borderBottom: '1px solid #f0f0f0',
            marginBottom: '5px'
        }

        const SubStyle: React.CSSProperties = {
            color:'lightGray',
            textAlign : 'center',
            display : 'block',
            marginBottom : '75px',
        }
    return(
        <div style={RightStyle}>
            <h2 style={{marginBottom : 15}}>{formatDate(currentDate)}</h2>

            <div style={{marginBottom : 15,}}>
                <span style={{marginRight : 20}}>수입 : <span style={{color:'blue'}}>+{totalIncome.toLocaleString()}원</span></span>
                <span>지출 : <span style={{color:'red'}}>{totalExpense.toLocaleString()}원</span></span>
            </div>

            <div style={MemoStyle}>
                <h3><FontAwesomeIcon icon={faStickyNote} style={{color: "#FFD43B",marginRight : 10,}} />오늘의 메모 <FontAwesomeIcon icon={faStickyNote} style={{color: "#c2c2c2", float : 'right'}} /></h3>
                <br />
                <span style={{color:'#333'}}>메모가 없습니다. 메모를 작성해보세요!</span>
            </div>

            <div style={TransactionStyle}>
                <h3>거래내역</h3>
                <br />
                <div style={{
                    height : "200px", 
                    overflowY: 'auto',
                    border: '1px solid #f0f0f0',
                    borderRadius: '10px',
                    padding: '10px'
                }}>
                    {state.transactions.length === 0 ? (
                        <div style={{textAlign: 'center', color: '#999', paddingTop: '80px'}}>
                            거래 내역이 없습니다
                        </div>
                    ) : (
                        state.transactions.map((transaction: any) => (
                            <div key={transaction.id} style={TransactionItemStyle}>
                                <div>
                                    <span style={{fontWeight: 'bold', marginRight: '10px'}}>
                                        {transaction.category}
                                    </span>
                                    <span style={{
                                        color: transaction.type === 'income' ? 'blue' : 'red',
                                        fontWeight: 'bold'
                                    }}>
                                        {transaction.type === 'income' ? '+' : ''}
                                        {transaction.amount.toLocaleString()}원
                                    </span>
                                </div>
                                <FontAwesomeIcon 
                                    icon={faTrash} 
                                    style={{
                                        color: '#999',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s'
                                    }}
                                    onClick={() => deleteTransaction(transaction.id)}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#F44336'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
// Right END


export default function Article() {
    const { width } = useWindowSize();
    const isMobile = width < 768; // 모바일/ 태블릿

    const MainArticle: React.CSSProperties = {
        marginTop : isMobile ? '30px' : '50px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '20px' : '0',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }

    return (
        <div style={MainArticle}>
            <Left isMobile={isMobile} />
            <Right isMobile={isMobile} />
        </div>
    )
}
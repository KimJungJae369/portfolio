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

function Left({ isMobile, dailyMemos, onDateClick }: { isMobile: boolean, dailyMemos: {[key: string]: string}, onDateClick: (dateString: string) => void }){
    const [date, setDate] = useState<Value>(new Date());
    const { state } = useAppContext();
    
    // 특정 날짜의 거래 금액 계산
    const getTransactionsByDate = (date: Date) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // YYYY-MM-DD 형식
        return state.transactions.filter((t: any) => t.date === dateString);
    };
    
    // 특정 날짜에 메모가 있는지 확인
    const hasMemo = (date: Date) => {
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return !!dailyMemos[dateString];
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
                    onClickDay={(value) => {
                        const dateString = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
                        if (dailyMemos[dateString]) {
                            onDateClick(dateString);
                        }
                    }}
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            const { income, expense } = getTotalByDate(date);
                            const memo = hasMemo(date);
                            
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
                                    {memo && (
                                        <div style={{
                                            color: '#FFD43B',
                                            fontSize: '12px'
                                        }}>
                                            📝
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

function Right({ isMobile, dailyMemos, setDailyMemos }: { isMobile: boolean, dailyMemos: {[key: string]: string}, setDailyMemos: React.Dispatch<React.SetStateAction<{[key: string]: string}>> }){
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [isEditingDailyMemo, setIsEditingDailyMemo] = useState<boolean>(false);
    const [tempDailyMemo, setTempDailyMemo] = useState<string>('');
    const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
    const [tempMemo, setTempMemo] = useState<string>('');
    const { state, deleteTransaction, updateTransaction } = useAppContext();
    
    // 현재 날짜 문자열
    const currentDateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const currentMemo = dailyMemos[currentDateString] || '';
    
    // 메모 저장하기
    const saveDailyMemo = () => {
        if (tempDailyMemo.trim() === '') {
            // 빈 메모는 삭제
            const newMemos = { ...dailyMemos };
            delete newMemos[currentDateString];
            setDailyMemos(newMemos);
            localStorage.setItem('dailyMemos', JSON.stringify(newMemos));
        } else {
            const newMemos = { ...dailyMemos, [currentDateString]: tempDailyMemo };
            setDailyMemos(newMemos);
            localStorage.setItem('dailyMemos', JSON.stringify(newMemos));
        }
        setIsEditingDailyMemo(false);
        setTempDailyMemo('');
    };
    
    // 메모 삭제하기
    const deleteDailyMemo = () => {
        const newMemos = { ...dailyMemos };
        delete newMemos[currentDateString];
        setDailyMemos(newMemos);
        localStorage.setItem('dailyMemos', JSON.stringify(newMemos));
        setIsEditingDailyMemo(false);
        setTempDailyMemo('');
    };
    
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
                <h3>
                    <FontAwesomeIcon icon={faStickyNote} style={{color: "#FFD43B",marginRight : 10,}} />
                    오늘의 메모
                    <div style={{float: 'right', display: 'flex', gap: '10px', alignItems: 'center'}}>
                        {currentMemo && (
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                style={{
                                    color: '#999',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s',
                                    fontSize: '14px'
                                }} 
                                onClick={deleteDailyMemo}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#F44336'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                            />
                        )}
                        <FontAwesomeIcon 
                            icon={faStickyNote} 
                            style={{
                                color: currentMemo ? "#FFD43B" : "#c2c2c2", 
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }} 
                            onClick={() => {
                                if (isEditingDailyMemo) {
                                    saveDailyMemo();
                                } else {
                                    setIsEditingDailyMemo(true);
                                    setTempDailyMemo(currentMemo);
                                }
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = currentMemo ? '#FFC107' : '#999'}
                            onMouseLeave={(e) => e.currentTarget.style.color = currentMemo ? '#FFD43B' : '#c2c2c2'}
                        />
                    </div>
                </h3>
                <br />
                {isEditingDailyMemo ? (
                    <>
                        <textarea
                            value={tempDailyMemo}
                            onChange={(e) => setTempDailyMemo(e.target.value)}
                            placeholder="오늘의 메모가 없습니다! 메모를 작성해보세요..."
                            style={{
                                width: '100%',
                                minHeight: '60px',
                                border: '1px solid #FFE066',
                                backgroundColor: 'white',
                                color: '#333',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                resize: 'none',
                                outline: 'none',
                                padding: '8px',
                                borderRadius: '5px'
                            }}
                            autoFocus
                        />
                        <div style={{marginTop: '10px', display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                            <button
                                onClick={saveDailyMemo}
                                style={{
                                    padding: '5px 15px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                저장
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditingDailyMemo(false);
                                    setTempDailyMemo('');
                                }}
                                style={{
                                    padding: '5px 15px',
                                    backgroundColor: '#999',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                취소
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{
                        color: '#333',
                        fontSize: '14px',
                        minHeight: '60px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                    }}>
                        메모가 없습니다. 메모를 작성해보세요!
                    </div>
                )}
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
                            <div key={transaction.id}>
                                <div style={TransactionItemStyle}>
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
                                    <div style={{display: 'flex', gap: '50px', alignItems: 'center'}}>
                                        <FontAwesomeIcon 
                                            icon={faStickyNote} 
                                            style={{
                                                color: transaction.memo ? '#FFD43B' : '#ccc',
                                                cursor: 'pointer',
                                                transition: 'color 0.2s',
                                                fontSize: '16px'
                                            }}
                                            onClick={() => {
                                                if (editingMemoId === transaction.id) {
                                                    updateTransaction(transaction.id, { memo: tempMemo });
                                                    setEditingMemoId(null);
                                                    setTempMemo('');
                                                } else {
                                                    setEditingMemoId(transaction.id);
                                                    setTempMemo(transaction.memo || '');
                                                }
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = transaction.memo ? '#FFC107' : '#999'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = transaction.memo ? '#FFD43B' : '#ccc'}
                                        />
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
                                </div>
                                {editingMemoId === transaction.id && (
                                    <div style={{
                                        padding: '10px',
                                        backgroundColor: '#FFFBE6',
                                        borderRadius: '5px',
                                        marginTop: '5px',
                                        marginBottom: '10px'
                                    }}>
                                        <textarea
                                            value={tempMemo}
                                            onChange={(e) => setTempMemo(e.target.value)}
                                            placeholder="메모를 입력하세요..."
                                            style={{
                                                width: '100%',
                                                minHeight: '50px',
                                                border: '1px solid #FFE066',
                                                borderRadius: '5px',
                                                padding: '8px',
                                                fontSize: '13px',
                                                fontFamily: 'inherit',
                                                resize: 'vertical',
                                                outline: 'none'
                                            }}
                                            autoFocus
                                        />
                                        <div style={{marginTop: '8px', display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                                            <button
                                                onClick={() => {
                                                    updateTransaction(transaction.id, { memo: tempMemo });
                                                    setEditingMemoId(null);
                                                    setTempMemo('');
                                                }}
                                                style={{
                                                    padding: '5px 15px',
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                저장
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingMemoId(null);
                                                    setTempMemo('');
                                                }}
                                                style={{
                                                    padding: '5px 15px',
                                                    backgroundColor: '#999',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                )}
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
    const [dailyMemos, setDailyMemos] = useState<{[key: string]: string}>({});
    const [popupMemo, setPopupMemo] = useState<{date: string, content: string} | null>(null);
    
    // 메모 불러오기
    useEffect(() => {
        const savedMemos = localStorage.getItem('dailyMemos');
        if (savedMemos) {
            setDailyMemos(JSON.parse(savedMemos));
        }
    }, []);
    
    // 날짜 클릭 시 팝업 표시
    const handleDateClick = (dateString: string) => {
        setPopupMemo({
            date: dateString,
            content: dailyMemos[dateString]
        });
    };

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
            <Left isMobile={isMobile} dailyMemos={dailyMemos} onDateClick={handleDateClick} />
            <Right isMobile={isMobile} dailyMemos={dailyMemos} setDailyMemos={setDailyMemos} />
            
            {popupMemo && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}
                onClick={() => setPopupMemo(null)}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '15px',
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    onClick={(e) => e.stopPropagation()}>
                        <h3 style={{marginBottom: '15px', color: '#333'}}>
                            <FontAwesomeIcon icon={faStickyNote} style={{color: "#FFD43B", marginRight: '10px'}} />
                            {popupMemo.date} 메모
                        </h3>
                        <div style={{
                            backgroundColor: '#FFFBE6',
                            padding: '15px',
                            borderRadius: '10px',
                            border: '1px solid #FFE066',
                            minHeight: '100px',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: '#333'
                        }}>
                            {popupMemo.content}
                        </div>
                        <button
                            onClick={() => setPopupMemo(null)}
                            style={{
                                marginTop: '20px',
                                padding: '8px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                float: 'right'
                            }}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
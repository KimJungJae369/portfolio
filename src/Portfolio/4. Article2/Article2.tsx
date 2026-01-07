import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faWallet, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';

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

function Article2Left({ isMobile }: { isMobile: boolean }){
    const [activeType, setActiveType] = useState('수입');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [memo, setMemo] = useState('');
    const { addTransaction } = useAppContext();
    
    const Article2LeftStyle: React.CSSProperties = {
        width : isMobile ? '100%' : '35%',
        backgroundColor : 'white',
        borderRadius : 20,
        boxShadow : '0 0 10px rgba(8, 5, 44, 0.1)',
        padding : isMobile ? 15 : 20,
        boxSizing : 'border-box',
        overflow : 'hidden',
       
    }

    const MenuStyle = {
        margin: '10px 0',
    }

    const Button1Style = {
        width : '48%',
        height : 60,
        borderRadius : 10,
        border : '2px solid #ddd',
        backgroundColor : '#f5f5f5',
        paddingLeft : '4%',
        fontSize : 18,
        cursor : 'pointer',
        transition : 'all 0.2s ease-in',
    }

     const Button2Style = {
        width : '48%',
        height : 60,
        borderRadius : 10,
        border : '2px solid #ddd',
        backgroundColor : '#f5f5f5',
        fontSize : 18,
        cursor : 'pointer',
        marginLeft : '4%',
        transition : 'all 0.2s ease-in',
    }

    const catgoryStyle: React.CSSProperties = {
        width : '100%',
        height : 60,
        borderRadius : 10,
        border : '2px solid #ddd',
        backgroundColor : '#f5f5f5',
        color : '#333',
        textAlign : 'center',
        fontSize : 18,
        cursor : 'pointer',
    }

    const amountStyle: React.CSSProperties = {
        color : '#acacacff',
        width : '100%',
        height : 60,
        borderRadius : 10,
        border : '2px solid #ddd',
        backgroundColor : '#f5f5f5',
        paddingLeft : '1%',
        fontSize : 18,
        cursor : 'pointer',
        padding : '2%'
    }

    const dateStyle: React.CSSProperties = {
        width : '100%',
        height : 60,
        borderRadius : 10,
        border : '2px solid #ddd',
        backgroundColor : '#f5f5f5',
        padding : '2%', 
        fontSize : 18,
    }

    const buttonStyle = {
        width : '100%',
        height : 60,
        borderRadius : 10,
        border : '2px solid #ddd',
        backgroundColor : '#2196F3',
        color : 'white',
        fontSize : 18,
        cursor : 'pointer',
    }
    return(
        <div style={Article2LeftStyle}>
            <div style={MenuStyle}>
                <h3>새로운 거래</h3>
                <br />
                <button 
                    style={{
                        ...Button1Style,
                        backgroundColor: activeType === '수입' ? '#2196F3' : '#f5f5f5',
                        color: activeType === '수입' ? 'white' : 'black',
                    }}
                    onClick={() => {
                        setActiveType('수입');
                        setCategory(''); // 카테고리 초기화
                    }}
                >
                    수입
                </button>
                <button 
                    style={{
                        ...Button2Style,
                        backgroundColor: activeType === '지출' ? '#F44336' : '#f5f5f5',
                        color: activeType === '지출' ? 'white' : 'black',
                    }}
                    onClick={() => {
                        setActiveType('지출');
                        setCategory(''); // 카테고리 초기화
                    }}
                >
                    지출
                </button>
            </div>
            <div style={MenuStyle}>
                <h5 style={{color:'#333', marginTop : 20}}>카테고리</h5>
                <br />
                <select 
                    style={catgoryStyle}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">선택하세요</option>
                    {activeType === '수입' ? (
                        <>
                            <option value="월급">월급</option>
                            <option value="보너스">보너스</option>
                            <option value="용돈">용돈</option>
                            <option value="기타수입">기타수입</option>
                        </>
                    ) : (
                        <>
                            <option value="식비">식비</option>
                            <option value="교통비">교통비</option>
                            <option value="쇼핑">쇼핑</option>
                            <option value="문화생활">문화생활</option>
                            <option value="통신비">통신비</option>
                            <option value="주거비">주거비</option>
                            <option value="의료">의료</option>
                            <option value="기타">기타</option>
                        </>
                    )}
                </select>
            </div>

            <div style={MenuStyle}>
                <h5 style={{color:'#333',  marginTop : 20}}>금액</h5>
                <br />
                <input 
                    type="number" 
                    style={{
                        ...amountStyle,
                        color: amount ? 'black' : '#acacacff'
                    }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder='0'
                />
            </div>

            <div style={MenuStyle}>
                <h5 style={{color:'#333',  marginTop : 20}}>날짜</h5>
                <br />
                <input 
                    type="date" 
                    style={dateStyle}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div style={MenuStyle}>
                <h5 style={{color:'#333',  marginTop : 20}}>메모 (선택)</h5>
                <br />
                <input 
                    type="text" 
                    style={dateStyle} 
                    placeholder='메모를 입력하세요.'
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
            </div>

            <div style={{textAlign : 'center', marginTop : 30}}>
                <button 
                    style={buttonStyle}
                    onClick={() => {
                        if (!amount || !category || !date) {
                            alert('금액, 카테고리, 날짜를 모두 입력해주세요.');
                            return;
                        }
                        
                        const transaction = {
                            date: date,
                            desc: memo || category,
                            amount: activeType === '수입' ? Number(amount) : -Number(amount),
                            category: category,
                            type: activeType === '수입' ? 'income' : 'expense'
                        };
                        
                        addTransaction(transaction);
                        
                        // 입력 필드 초기화
                        setAmount('');
                        setCategory('');
                        setDate('');
                        setMemo('');
                    }}
                >
                    + 추가하기
                </button>
            </div>
        </div>
    )
}
// left End

function Article2Right({ isMobile, isTablet }: { isMobile: boolean, isTablet: boolean }) {
    const [hoveredExpense, setHoveredExpense] = useState<string | null>(null);
    const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
    const { state } = useAppContext();
    
    // 지출 총액 및 건수 계산
    const expenseTransactions = state.transactions.filter((t: any) => t.type === 'expense');
    const totalExpense = expenseTransactions.reduce((acc: number, curr: any) => acc + Math.abs(curr.amount), 0);
    const totalTransactionCount = state.transactions.length; // 수입 + 지출 전체 건수
    const dailyAverage = totalExpense / 7;
    
    // 카테고리별 금액 계산
    const getCategoryData = (type: string) => {
        const transactions = state.transactions.filter((t: any) => t.type === type);
        const categoryMap = new Map<string, number>();
        
        transactions.forEach((t: any) => {
            const current = categoryMap.get(t.category) || 0;
            categoryMap.set(t.category, current + Math.abs(t.amount));
        });
        
        const data = Array.from(categoryMap.entries()).map(([category, amount]) => ({
            category,
            amount
        }));
        
        // 금액 기준으로 정렬
        data.sort((a, b) => b.amount - a.amount);
        
        return data;
    };
    
    const maxAmount = (data: any[]) => {
        if (data.length === 0) return 1;
        return Math.max(...data.map(d => d.amount));
    };
    
    const Article2RightStyle: React.CSSProperties = {
        width : isMobile ? '100%' : '60%',
        backgroundColor : 'white',
        borderRadius : 20,
        boxShadow : '0 0 10px rgba(8, 5, 44, 0.1)',
        padding : isMobile ? 15 : 20,
        boxSizing : 'border-box',
        overflow : 'hidden',
    }

    const expenseStyle = {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        gap : isMobile ? '8px' : '12px',
        width : isMobile ? '100%' : '48%',
        cursor : 'pointer',
        borderRadius : 10,
        padding : '10px 0',
        transition : 'all 0.2s ease-in',
        marginBottom : isMobile ? '10px' : '0'
    }

    const getBackgroundColor = (type: string) => {
        if (activeAnalysis === type) {
            return type === '지출' ? '#F44336' : '#2196F3';
        }
        return hoveredExpense === type ? '#f5f5f5' : 'transparent';
    }

    const getTextColor = (type: string) => {
        return activeAnalysis === type ? 'white' : 'black';
    }

    const getIconStyle = (type: string, baseColor: string, bgColor: string) => {
        if (activeAnalysis === type) {
            return { padding: 13, backgroundColor: 'white', borderRadius: '30%', color: baseColor };
        }
        return { padding: 13, backgroundColor: bgColor, borderRadius: '30%', color: baseColor };
    }

    const dayaverageStyle : React.CSSProperties = {
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        gap : '10px',
    }

  return (
    <div style={{width: '100%'}}>
        {/* 수입분석/지출분석 섹션 */}
        <div style={{...Article2RightStyle, width: '100%', marginBottom: 20}}>
            <div style={{display : 'flex', flexDirection: isMobile ? 'column' : 'row', gap : '4%'}}>
                <div 
                    className="expense" 
                    style={{
                        ...expenseStyle,
                        backgroundColor: getBackgroundColor('수입')
                    }}
                    onMouseEnter={() => setHoveredExpense('수입')}
                    onMouseLeave={() => setHoveredExpense(null)}
                    onClick={() => setActiveAnalysis(activeAnalysis === '수입' ? null : '수입')}
                >
                    <FontAwesomeIcon icon={faArrowTrendUp} style={getIconStyle('수입', '#2196F3', 'rgba(33, 150, 243, 0.1)')} />
                    <span style={{fontSize : 18, fontWeight : 'bold', textAlign : 'center', color: getTextColor('수입')}}>수입 분석</span>
                </div>
                {/* 수입분석 */}

                <div 
                    className="expense" 
                    style={{
                        ...expenseStyle,
                        backgroundColor: getBackgroundColor('지출')
                    }}
                    onMouseEnter={() => setHoveredExpense('지출')}
                    onMouseLeave={() => setHoveredExpense(null)}
                    onClick={() => setActiveAnalysis(activeAnalysis === '지출' ? null : '지출')}
                >
                    <FontAwesomeIcon icon={faArrowTrendDown} style={getIconStyle('지출', '#F44336', 'rgba(244, 67, 54, 0.1)')} />
                    <span style={{fontSize : 18, fontWeight : 'bold', textAlign : 'center', color: getTextColor('지출')}}>지출 분석</span>
                </div>
                {/* 지출분석 */}
            </div>
        </div>

        {/* 일평균 지출/거래건수 섹션 */}
        <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '15px' : '4%', width: '100%', marginBottom: 20}}>
            <div style={{...Article2RightStyle, width: isMobile ? '100%' : '48%'}}>
                <div style={dayaverageStyle}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <FontAwesomeIcon icon={faCalendar} style={{color: "#B197FC"}} />
                        <h3 style={{color : "#B197FC", margin: 0}}>일평균 지출</h3>
                    </div>
                    <h2>{Math.round(dailyAverage).toLocaleString()}원</h2>
                </div>
            </div>
            {/* 일평균 지출 */}

            <div style={{...Article2RightStyle, width: isMobile ? '100%' : '48%'}}>
                <div style={dayaverageStyle}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <FontAwesomeIcon icon={faWallet} style={{color: "#f3672b"}} />
                        <h3 style={{color : '#f3672b', margin: 0}}>거래 건수</h3>
                    </div>
                    <h2>{totalTransactionCount}건</h2>
                </div>
            </div>
            {/* 거래건수 */}
        </div>

        {/* 지출 내역 안내 섹션 / 분석 그래프 */}
        <div style={{...Article2RightStyle, width: '100%'}}>
            {activeAnalysis === null ? (
                <div style={{textAlign: 'center', padding: '80px 0'}}>
                    <p style={{fontSize: 18, color: '#666', marginBottom: 10}}>이번 달 지출 내역이 없습니다</p>
                    <p style={{fontSize: 16, color: '#999'}}>거래를 추가해보세요! ✨</p>
                </div>
            ) : (
                <div style={{padding: '20px'}}>
                    <h3 style={{marginBottom: '20px', color: activeAnalysis === '수입' ? '#2196F3' : '#F44336'}}>
                        {activeAnalysis} 카테고리별 분석
                    </h3>
                    {(() => {
                        const data = getCategoryData(activeAnalysis === '수입' ? 'income' : 'expense');
                        const max = maxAmount(data);
                        
                        if (data.length === 0) {
                            return (
                                <div style={{textAlign: 'center', padding: '40px 0', color: '#999'}}>
                                    {activeAnalysis} 내역이 없습니다
                                </div>
                            );
                        }
                        
                        return data.map((item, index) => (
                            <div key={index} style={{marginBottom: '15px'}}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '5px',
                                    fontSize: '14px'
                                }}>
                                    <span style={{fontWeight: 'bold', color: '#333'}}>{item.category}</span>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: activeAnalysis === '수입' ? '#2196F3' : '#F44336'
                                    }}>
                                        {activeAnalysis === '수입' ? '+' : '-'}{item.amount.toLocaleString()}원
                                    </span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '20px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${(item.amount / max) * 100}%`,
                                        height: '100%',
                                        backgroundColor: activeAnalysis === '수입' ? '#2196F3' : '#F44336',
                                        borderRadius: '10px',
                                        transition: 'width 0.5s ease-in-out'
                                    }}></div>
                                </div>
                            </div>
                        ));
                    })()}
                </div>
            )}
        </div>
    </div>
  )
}


export default function Article2() {
    const { width } = useWindowSize();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    const Article2Style = {
        width : '100%',
        marginTop : isMobile ? 30 : 50,
        display : 'flex',
        flexDirection: (isMobile ? 'column' : 'row') as 'column' | 'row',
        gap : isMobile ? '20px' : '5%',
        alignItems : 'flex-start'
  }
  return (
    <div style={Article2Style}>
        <Article2Left isMobile={isMobile} />
        <Article2Right isMobile={isMobile} isTablet={isTablet} />
    </div>
  )
}

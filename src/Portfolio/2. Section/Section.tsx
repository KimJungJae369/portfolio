import {useState, useEffect} from 'react'
import {useAppContext} from './AppContext'
import './Section.css'

function useWindowSize(){
    // 윈도우 사이즈 상태 관리
        const [windowSize, setWindowSize] = useState({
            width : typeof window !== 'undefined' ? window.innerWidth : 0,
        });

    // 컴포넌트가 마운트될 때와 윈도우 사이즈가 변경될 때마다 이벤트 리스너 등록 
    useEffect(() => {
        function clickHandler(){
            setWindowSize({
                width : window.innerWidth
            })
    }
    
        // 윈도우 사이즈 변경 이벤트 리스너 등록
        window.addEventListener('resize', clickHandler);
        return () => window.removeEventListener('resize', clickHandler);
    }, []);
    return windowSize;
}





export default function Article(){
    const {state} = useAppContext();
    const {width} = useWindowSize();
    void width;
    

    // 수입 총액
    const totalIncome = state.transactions
        .filter(t => t.type === 'income') 
        .reduce((sum, t) => sum + t.amount, 0);

    // 지출 총액
    const totalExpense = state.transactions
        .filter(t => t.type === 'expense') 
        .reduce((sum, t) => sum - t.amount, 0);

    // 잔액
    const balance = totalIncome - totalExpense;
    return(
        <div className="MainMenu">
            <div className="itemStyle">
                <div className="itemIcon">
                    <h2 style={{ color: 'blue' }}>수입 : {totalIncome}원</h2>
                </div>
            </div>

            <div className="itemStyle">
                <div className="itemIcon">
                    <h2 style={{color : 'red'}}>지출 : {totalExpense}원</h2>
                </div>
            </div>

            <div className="itemStyle">
                <h2>잔액 : {balance}원</h2>
            </div>
        </div>
    )
}





import React from 'react'
// 아이콘
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';

export default function Section() {
    const { state } = useAppContext();
    
    // 수입, 지출, 잔액 계산
    const totalIncome = state.transactions
        .filter((t: any) => t.type === 'income')
        .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const totalExpense = state.transactions
        .filter((t: any) => t.type === 'expense')
        .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const balance = totalIncome + totalExpense;
    const MainMenu = {
        marginTop : '50px',
        display : 'flex',
        justifyContent : 'space-evenly',
    }

    const itemstyle = {
        width : '60%',
        padding : 30,
        backgroundColor : 'white',
        borderRadius : 20,
        boxShadow : '0 0 10px rgba(22, 5, 253, 0.1)',
        float : 'left' as 'left',
    }

    const itemicon = {
         display : 'flex',
    }
  return (
    <div style={MainMenu}>
        <div style={itemstyle}>
            <div style={itemicon}>
                <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: "#006be6ff", padding : 13, backgroundColor : 'rgba(26, 115, 232, 0.1)', borderRadius : '30%'}} />
                <span style={{margin : '12px', fontSize : '17px', color : '#414040ff', display : 'inline-block', verticalAlign : 'middle', alignItems: 'center'}}>수입</span>
            </div>
            <h2 style={{color : '#006be6ff', paddingTop : 20,}}>+{totalIncome.toLocaleString()}원</h2>
        </div>

         <div style={{...itemstyle, margin : '0 20px'}}>
           <div style={itemicon}>
                 <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: "#e60000ff", padding : 13, backgroundColor : 'rgba(217, 48, 37, 0.1)', borderRadius : '30%'}} />
                <span style={{margin : '12px', fontSize : '17px', color : '#414040ff', display : 'inline-block', verticalAlign : 'middle', alignItems: 'center'}}>지출</span>
           </div>
            <h2 style={{color : '#e60000ff', paddingTop : 20,}}>{totalExpense.toLocaleString()}원</h2>
        </div>

         <div style={itemstyle}>
            <div style={itemicon}>
                <FontAwesomeIcon icon={faWallet} style={{ color: "#00b12cff", padding : 13,  backgroundColor : 'rgba(24, 128, 56, 0.1)', borderRadius : '30%'}} />
                <span style={{margin : '12px', fontSize : '17px', color : '#414040ff', display : 'inline-block', verticalAlign : 'middle', alignItems: 'center'}}>잔액</span>
            </div>
            <h2 style={{color : '#00b12cff', paddingTop : 20,}}>{balance >= 0 ? '+' : ''}{balance.toLocaleString()}원</h2>
        </div>
    </div>
  )
}

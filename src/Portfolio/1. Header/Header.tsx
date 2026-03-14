export default function Header() {
     const subMenu = {
        color : '#414040ff',
        fontSize : '14px',   
        marginTop : '5px'
    }
    
    //  현재 날짜를 한국어 형식으로 표시하는 코드
    const today = new Date(); // 현재 날짜 객체 생성
    const year = today.getFullYear(); // 연도 가져오기
    const month = today.getMonth() + 1; // 월 가져오기 (0부터 시작하므로 +1)
    const day = today.getDate(); // 일 가져오기
    const formattedDate = `${year}년 ${month}월 ${day}일`; // 한국어 형식으로 날짜 포맷팅
    
  return (
   
    <div>
        <h1>나의 가계부</h1>
        <p style={subMenu}> {formattedDate} </p>
    </div>
  )
}

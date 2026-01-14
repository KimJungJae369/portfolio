export default function Header() {
     const subMenu = {
        color : '#414040ff',
        fontSize : '14px',   
        marginTop : '5px'
    }
    
    // 현재 날짜를 가져와서 한국어 형식으로 포맷팅
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}년 ${month}월 ${day}일`;
    
  return (
   
    <div>
        <h1>나의 가계부</h1>
        <p style={subMenu}> {formattedDate} </p>
    </div>
  )
}

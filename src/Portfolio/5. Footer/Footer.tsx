import React from 'react';
import { FaBuilding, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaQuestion } from 'react-icons/fa'; // 아이콘 임포트

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'white',
      color: '#333',
      padding: '40px 20px',
      marginTop: '50px',
      width: '100%',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* 편지형 소개 카드 (추가) */}
        <div style={{
          background: '#fffaf0',
          border: '1px solid #f0e0b8',
          padding: '20px',
          borderRadius: '8px',
          margin: '0 auto 30px',
          maxWidth: '900px',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: '#333',
          boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
        }}>
          <p style={{ margin: '0 0 8px', color: '#666' }}>받는 사람: 채용 담당자 / 협업 파트너님께</p>
          <p style={{ margin: '0 0 12px', lineHeight: '1.6' }}>
            안녕하세요. 저는 부산에 거주하는 프론트엔드 개발자입니다.<br />
            UI/UX 중심의 웹 애플리케이션을 만들며 사용자 경험을 개선하는 일을 즐깁니다.<br />
            문의나 협업 요청은 아래 연락처로 편하게 연락 주세요.
          </p>
          <p style={{ margin: '0', fontStyle: 'italic', color: '#444' }}>
            연락처: <strong>010-1234-5678</strong> · 이메일: <strong>ktk662002@naver.com</strong>
          </p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href="mailto:ktk662002@naver.com?subject=포트폴리오%20문의&body=안녕하세요%2C%20포트폴리오를%20보고%20연락드립니다." style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600
            }}>메일 보내기</a>
            <a href="tel:01012345678" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 600 }}>전화걸기</a>
          </div>
          <p style={{ marginTop: '14px', textAlign: 'right', fontWeight: 700 }}>— ktk662002</p>
        </div>

        {/* 상단 섹션: 3단 컬럼 */}
        <div style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          
          {/* 1. 회사 정보 (왼쪽) */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px',
              fontSize: '20px'
            }}>
              <FaBuilding style={{ color: '#3498db' }} />
              정재회사
            </h3>
            <p style={{ margin: '5px 0', color: '#666' }}>편리하고 간편한 가계부 서비스</p>
            <p style={{ margin: '5px 0', color: '#666' }}>당신의 재무 관리를 돕는 든든한 파트너</p>
          </div>

          {/* 2. 연락처 (중간) */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>연락처</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                <FaPhoneAlt style={{ color: '#3498db' }} /> 
                <span>010-1234-5678</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                <FaEnvelope style={{ color: '#3498db' }} /> 
                <span>ktk662002@naver.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '10px 0' }}>
                <FaMapMarkerAlt style={{ color: '#3498db', marginTop: '3px' }} /> 
                <div>
                  <span>부산광역시 사하구 장림동</span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#999' }}>우편번호: 49315</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 3. 서비스 안내 (오른쪽) */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>서비스 안내</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ margin: '8px 0' }}>
                <a href="#terms" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                  이용약관
                </a>
              </li>
              <li style={{ margin: '8px 0' }}>
                <a href="#privacy" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                  개인정보처리방침
                </a>
              </li>
              <li style={{ margin: '8px 0' }}>
                <a href="#faq" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                  자주 묻는 질문
                </a>
              </li>
              <li style={{ margin: '8px 0' }}>
                <a href="#center" style={{ color: '#333', textDecoration: 'none', transition: 'color 0.3s' }}>
                  고객센터
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #e0e0e0',
          margin: '20px 0'
        }}></div>

        {/* 하단 섹션: 저작권 및 안내 */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '10px 0', fontSize: '14px' }}>© 2026 정재회사. All rights reserved.</p>
          <p style={{ margin: '10px 0', fontSize: '13px', color: '#999' }}>
            본 서비스는 개인의 재무 관리를 돕기 위한 목적으로 제공됩니다.
          </p>
        </div>
      </div>

      {/* 우측 하단 플로팅 버튼 (선택사항) */}
      <button style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s'
      }}>
        <FaQuestion />
      </button>
    </footer>
  );
};

export default Footer;

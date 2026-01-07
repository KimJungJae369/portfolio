import React from 'react';
import styled from 'styled-components';
import { LayoutDashboard, PieChart, Settings, User } from 'lucide-react';

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    color: var(--text);
  }
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  border-radius: 16px;
  color: ${props => props.active ? 'var(--text)' : '#999'};
  background-color: ${props => props.active ? 'var(--secondary)' : 'transparent'};
  font-weight: ${props => props.active ? '700' : '500'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #E0F7FA;
    color: var(--text);
    transform: translateX(5px);
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div>
        <Logo>
          ☁️ <span>몽글가계부</span>
        </Logo>
        <Menu>
          <MenuItem active>
            <LayoutDashboard size={20} />
            대시보드
          </MenuItem>
          <MenuItem>
            <PieChart size={20} />
            통계
          </MenuItem>
          <MenuItem>
            <Settings size={20} />
            설정
          </MenuItem>
        </Menu>
      </div>
      
      <UserProfile>
        <Avatar><User size={20} /></Avatar>
        <div>
          <div style={{fontWeight: 'bold'}}>사용자님</div>
          <div style={{fontSize: '12px', color: '#888'}}>Free Plan</div>
        </div>
      </UserProfile>
    </SidebarContainer>
  );
};

export default Sidebar;

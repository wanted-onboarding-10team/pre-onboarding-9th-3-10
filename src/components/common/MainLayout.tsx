import styled from '@emotion/styled';

interface MainLaoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLaoutProps) => {
  return <MainLayoutStyle>{children}</MainLayoutStyle>;
};

const MainLayoutStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
`;

export default MainLayout;

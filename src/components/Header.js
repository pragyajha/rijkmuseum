import React from "react";
import styled from 'styled-components';
import Text from '../components/Text';

const HeaderContainer = styled.div`
    padding:16px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = ()  =>  (
    <HeaderContainer>
      <Text size="34px" color="white">MUSEUM</Text>
    </HeaderContainer>
  );

export default Header;
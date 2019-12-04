import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { imageUrl } from '../utils/constants';
import styled from 'styled-components';
import Text from '../components/Text';

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${ imageUrl});
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Padding = styled.div`
    padding: 48px;
`;

const Button = styled.button`
    display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
  ${'' /* color: white; */}
  font-size: 12px;
  background-color: translucent;
  padding: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 30px;
`;

class LandingPage extends Component {
    render() {
        return (
            <React.Fragment>
                <ImageContainer>
                <Padding>
                    <Text color="white" size="30px">Welcome to the Museum</Text>
                    </Padding>
                    <Button onClick={()=> this.props.history.push('/eventlist/')}>View Events</Button>
                </ImageContainer>
            </React.Fragment>
        )
    }
}

export default withRouter(LandingPage);

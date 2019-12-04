import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../utils/theme';

const Button = styled(({ ...props }) => <button {...props} />) `
    display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
  color: ${props.color};
  font-size: ${props.fontSize};
  background-color: ${props.backgroundColor};
  padding: ${props.padding};
  width: ${(props) => (props.block ? '100%' : '')};
  border-width: 1px;
  border-style: solid;
  border-color: ${props.borderColor};
  border-radius: ${props.borderRadius};
  pointer-events: ${props.pointerEvents};
  opacity: ${props.opacity};
`;


Button.propTypes = {
  color: PropTypes.oneOf(Object.keys(theme.color)),
  kind: PropTypes.oneOf(['filled', 'outlined']),
  shape: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  color: 'paleRed',
  kind: 'filled',
  size: 'medium',
  shape: 'bluntEdged',
  block: false,
  disabled: false,
};

Button.contextTypes = {
  formik: PropTypes.object,
};

export default Button;
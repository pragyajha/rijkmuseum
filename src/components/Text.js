import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled(
  ({ component, color, size, weight, family, align, truncate, children, ...props }) =>
    React.createElement(component, props, children)
) `
  color: ${(props) => (props.color ? props.color : '')};
  font-size: ${(props) => (props.size ? props.size : '')};
  font-weight: ${(props) => (props.weight ? props.weight : '')};
  font-family: ${(props) => (props.family ? props.family : '')};
  line-height: ${(props) => (props.component === 'p' ? '1.5' : '')};
  text-align: ${(props) => props.align || ''};
  overflow: ${(props) => (props.truncate ? 'hidden' : '')};
  white-space: ${(props) => (props.truncate ? 'nowrap' : '')};
  text-overflow: ${(props) => (props.truncate ? 'ellipsis' : '')};
  padding: 0;
  margin: 0;
`;

Text.propTypes = {
  component: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  family: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  truncate: PropTypes.bool,
};

Text.defaultProps = {
  component: 'div',
};

export default Text;

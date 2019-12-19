import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { space } from "styled-system";

const activeClassName = "active";

const StyledNavLink = styled(NavLink).attrs({
  activeClassName: activeClassName
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #212121;
  padding: 20px;
  font-size: ${props => props.theme.textSize.smaller};
  ${space};
  svg {
    margin-bottom: 5px;
    stroke: ${props => props.theme.colors.dark};
  }
  img {
    width: 25px;
    height: 25px;
    border-radius: 30px;
  }
  &.${activeClassName} {
    color: ${props => props.theme.colors.primary};
    svg {
      stroke: ${props => props.theme.colors.primary} !important;
    }
    ::before {
      background-color: ${props => props.theme.colors.primary};
      content: " ";
      height: 2px;
      width: 90%;
      position: absolute;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      left: 50%;
      top: 8px;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
`;

export default StyledNavLink;

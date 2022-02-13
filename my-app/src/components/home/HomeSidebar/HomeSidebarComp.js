import styled from "styled-components";

export const SibebarContainer = styled.aside`
  position: fixed;
  height: 100%;
  z-index: 999;
  width: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isNavOpen }) => (isNavOpen ? "100%" : "0")};
  top: ${({ isNavOpen }) => (isNavOpen ? "0" : "-100%")};
`;

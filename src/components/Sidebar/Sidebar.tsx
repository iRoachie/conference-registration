import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import styled from '@styled';

type Props = {
  children: React.ReactNode;
} & RouteComponentProps;

const Sidebar: React.SFC<Props> = ({ children }) => (
  <Aside>
    <Link to="/">
      <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M406.069 512H105.931c-19.501 0-35.31-15.809-35.31-35.31V70.621c0-19.501 15.809-35.31 35.31-35.31h300.138c19.501 0 35.31 15.809 35.31 35.31V476.69c0 19.501-15.809 35.31-35.31 35.31z"
          fill="#e1c3a0"
        />
        <path
          d="M406.069 485.517H105.931a8.829 8.829 0 0 1-8.828-8.828V70.621a8.829 8.829 0 0 1 8.828-8.828h300.138a8.829 8.829 0 0 1 8.828 8.828V476.69a8.828 8.828 0 0 1-8.828 8.827z"
          fill="#eff2fa"
        />
        <path
          d="M308.966 35.31h-26.483v-8.828C282.483 11.857 270.626 0 256 0s-26.483 11.857-26.483 26.483v8.828h-26.483c-9.75 0-17.655 7.904-17.655 17.655v17.655H326.62V52.966c.001-9.752-7.904-17.656-17.654-17.656zm-52.966 0a8.829 8.829 0 1 1 .001-17.657A8.829 8.829 0 0 1 256 35.31z"
          fill="#c7cfe2"
        />
        <path
          d="M326.621 79.448H185.379a8.829 8.829 0 0 1 0-17.656H326.62a8.829 8.829 0 0 1 8.828 8.828 8.827 8.827 0 0 1-8.827 8.828z"
          fill="#afb9d2"
        />
        <path
          d="M167.724 203.034a8.796 8.796 0 0 1-6.241-2.586L135 173.965a8.825 8.825 0 0 1 0-12.483 8.825 8.825 0 0 1 12.483 0l20.241 20.242 37.897-37.897a8.825 8.825 0 0 1 12.483 0 8.825 8.825 0 0 1 0 12.483l-44.138 44.138a8.796 8.796 0 0 1-6.242 2.586z"
          fill="#82889d"
        />
        <path
          d="M317.793 167.724h-70.621a8.829 8.829 0 0 1 0-17.656h70.621a8.828 8.828 0 0 1 0 17.656z"
          fill="#afb9d2"
          opacity=".97"
        />
        <path
          d="M361.931 203.034H247.172a8.829 8.829 0 0 1 0-17.656h114.759a8.828 8.828 0 0 1 0 17.656z"
          fill="#c7cfe2"
          opacity=".97"
        />
        <path
          d="M167.724 414.897a8.796 8.796 0 0 1-6.241-2.586L135 385.827a8.825 8.825 0 0 1 0-12.483 8.825 8.825 0 0 1 12.483 0l20.241 20.242 37.897-37.897a8.825 8.825 0 0 1 12.483 0 8.825 8.825 0 0 1 0 12.483l-44.138 44.138a8.797 8.797 0 0 1-6.242 2.587z"
          fill="#82889d"
        />
        <path
          d="M317.793 379.586h-70.621a8.829 8.829 0 0 1 0-17.656h70.621a8.828 8.828 0 0 1 0 17.656z"
          fill="#afb9d2"
          opacity=".97"
        />
        <path
          d="M361.931 414.897H247.172a8.829 8.829 0 0 1 0-17.656h114.759a8.829 8.829 0 0 1 0 17.656z"
          fill="#c7cfe2"
          opacity=".97"
        />
        <path
          d="M167.724 308.966a8.796 8.796 0 0 1-6.241-2.586L135 279.896a8.825 8.825 0 0 1 0-12.483 8.825 8.825 0 0 1 12.483 0l20.241 20.242 37.897-37.897a8.825 8.825 0 0 1 12.483 0 8.825 8.825 0 0 1 0 12.483l-44.138 44.138a8.797 8.797 0 0 1-6.242 2.587z"
          fill="#82889d"
        />
        <path
          d="M317.793 273.655h-70.621a8.829 8.829 0 0 1 0-17.656h70.621a8.828 8.828 0 0 1 0 17.656z"
          fill="#afb9d2"
          opacity=".97"
        />
        <path
          d="M361.931 308.966H247.172a8.829 8.829 0 0 1 0-17.656h114.759a8.829 8.829 0 0 1 0 17.656z"
          fill="#c7cfe2"
          opacity=".97"
        />
      </Logo>
    </Link>

    {children}
  </Aside>
);

const Aside = styled.aside`
  padding-top: 30px;
  width: ${({ theme }) => theme.sidebarWidth};
  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  height: 100%;
  z-index: 3;
`;

const Logo = styled.svg`
  height: 100px;
  margin: 0 auto 30px;
  display: block;
`;

export default withRouter(Sidebar);

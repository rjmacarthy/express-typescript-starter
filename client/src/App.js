import React from "react";
import { HomeOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BuildingList } from "./Building/list";
import { BuildingCreate } from "./Building/create";
import { ROUTES } from "./constant";
import { BuildingView } from "./Building/view";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: 1,
    icon: <HomeOutlined />,
    label: <Link to={ROUTES.BULGING.list}> Buildings</Link>,
    title: "Buildings",
  },
  {
    key: 2,
    icon: <PlusSquareOutlined />,
    label: <Link to={ROUTES.BULGING.create}> Create Building</Link>,
    title: "Create Buildings",
  },
];

const App = () => (
  <Router>
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: "center",
              minHeight: "100vh",
            }}
          >
            {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
            <Switch>
              <Route exact path={ROUTES.BULGING.list}>
                <BuildingList />
              </Route>
              <Route exact path={ROUTES.BULGING.create}>
                <BuildingCreate />
              </Route>
              <Route exact path={ROUTES.BULGING.view}>
                <BuildingView />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  </Router>
);
export default App;

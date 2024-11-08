import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './router_page';  // Routes definition can stay here
import LanguageProvider from './lang/LanguageProvider';
import Header from "./component_page/layout/header";
import Footer from './component_page/layout/footer';

function App() {
  return (
    <>
    <Header/>
        <Routes>
          {routes.map((routeGroup, index) => (
            routeGroup.data.map((route, routeIndex) => (
              <Route
                key={routeIndex}
                path={route.path}
                element={route.element}
              />
            ))
          ))}
        </Routes>
        {/* <Routes>
        {routes.map((route, i) => {
          const Layout = route.layout;
          return (
            <Route key={i} element={<Layout />}>
              {route.data.map((item, idx) => {
                const Component = item.component;
                return (
                  <Route key={idx} path={item.path} element={<Component />} />
                );
              })}
            </Route>
          );
        })}
        <Route path='*' element={<NotFound />} />
      </Routes> */}
        <Footer/>
    </>
      
  );
}

export default App;


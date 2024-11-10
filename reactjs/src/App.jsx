import { BrowserRouter as Router, Route, Routes , useLocation} from 'react-router-dom';
import routes from './router_page';
import LanguageProvider from './lang/LanguageProvider';
import Header from "./component_page/layout/header";
import Footer from './component_page/layout/footer';
import axios from './util/axios';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    const fetchHelloWord = async() =>{
      const response = await axios.get(`/api`)
      console.log("Check api helloword: ", response)
    }

    fetchHelloWord();
  }, [])
  const location = useLocation();
  const route = routes.flatMap(routeGroup => routeGroup.data)
                      .find(route => route.path === location.pathname);

  const showHeader = route ? route.showHeader : true;  
  const showFooter = route ? route.showFooter : true;
  return (
    <>
    {showHeader && <Header />}
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
        {showFooter && <Footer />}
    </>
      
  );
}

export default App;


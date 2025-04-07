import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider} from "baseui";



const App: React.FC = () => {
  const engine = new Styletron();
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BaseProvider>
    </StyletronProvider>
  );
};

export default App;


import React from "react";
import Router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import Responsive from "./Responsive";
import "./Font/Fonts.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="Font">
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Responsive>
            <Router />
          </Responsive>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;

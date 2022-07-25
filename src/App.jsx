import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ThemeContextProvider } from './lib/context/theme';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import List from './pages/list';
import Home from './pages/home';
import Detail from './pages/detail';
import { Favorite } from './pages/favorite';

function App() {

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/list' element={<List/>}></Route>
          <Route path='/favourite' element={<Favorite/>}></Route>
          <Route path='/detail/:id' element={<Detail/>}></Route>
        </Routes>
      </ThemeContextProvider>
    </BrowserRouter>
  </ApolloProvider>
}

export default App;

import Home from "./pages/home/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Project from "./pages/project/Project";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache,
  });
  return (
    <ApolloProvider client={client}>
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project/:id' element={<Project/>}/>
      </Routes>
    </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;

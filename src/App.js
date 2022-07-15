import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import Menu from './components/Menu';
import PageList from './components/PageList';
import FourOhFour from './components/404';
import BlogPostDetail from './components/BlogPostDetail';
import SequenceDetail from './components/SequenceDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { useContext } from 'react';
import {ApiContextProvider, ApiContext} from './context/apiContext'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <ApiContextProvider>
        <Menu/>
        <div style={{"padding-top":"100px", "max-width":"900px", "margin":"auto"}}>
                <Container>     
                  <Switch>
                    <Route path="/sequences">
                        <SequenceList/>
                    </Route>
                    <Route path="/sequence/:slug">
                        <Sequence/>
                    </Route>
                    <Route path="/:slug">
                        <Post/>
                    </Route>
                    <Route path="/">
                        <PostList/>
                    </Route>
                  </Switch>
                </Container>
            </div>
      </ApiContextProvider>
    </Router>
  );
}

function PostList(){
  const apiContext = useContext(ApiContext)
  const posts = apiContext.getSortedPosts()
  if (!posts){
    <FourOhFour/>
  }
  return <PageList pages={posts}/>
}

function SequenceList(){
  const apiContext = useContext(ApiContext)
  const sequences = apiContext.getSortedSequences()
  if(!sequences){
    <FourOhFour/>
  }
  return <PageList pages={sequences}/>
}

function Post(){
    const {slug} = useParams()
    const apiContext = useContext(ApiContext)
    const post = apiContext.getPostBySlug(encodeURI(slug));
    if(!post)
      return <FourOhFour/>
    return <BlogPostDetail post={post}/>
}

function Sequence(){
    const {slug} = useParams()
    const apiContext = useContext(ApiContext)
    const sequence = apiContext.getSequenceBySlug(encodeURI(slug));
    console.log(sequence)
    if(!sequence)
      return <FourOhFour/>
    return <SequenceDetail sequence={sequence}/>
}

export default App;

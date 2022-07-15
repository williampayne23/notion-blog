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
import { useContext, useState, useMemo } from 'react';
import {ApiContextProvider, ApiContext} from './context/apiContext'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <ApiContextProvider>
        <Menu/>
        <div style={{"paddingTop":"100px", "maxWidth":"900px", "margin":"auto"}}>
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
  const [filterMonth, setFilterMonth] = useState("")


  const filteredPosts = useMemo(() => {
    if(filterMonth === "")
      return posts
    return posts.filter(p => {
      console.log(p["Months"])
      
      return p["Months"] && p["Months"].includes(filterMonth)
    })
  }, [posts, filterMonth])

  if (!posts){
    <FourOhFour/>
  }
  return <>
    <h6>Filter by month visible:
      <select name="month" onChange={(e) => setFilterMonth(e.target.value)} style={{"backgroundColor":"var(--bg1)"}}>
        <option defaultValue value="">All constellations</option>
          <option value="January">January</option>
          <option value="Febuary">Febuary</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
      </select>
    </h6>
    <br/>
    <PageList pages={filteredPosts}/>
  </>
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
    if(!sequence)
      return <FourOhFour/>
    return <SequenceDetail sequence={sequence}/>
}

export default App;
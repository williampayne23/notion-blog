import { Container } from "react-bootstrap"
import { NotionRenderer } from "react-notion"
import SequenceFooter from "./SequenceFooter"

export default function BlogPostDetail({ post}){
    return <Container style={{"padding-top": '4.5%', 'max-width': "900px", "margin":"auto"}}>
    <Container>
        <h3>{post.Name}</h3>
        <hr/>
        <NotionRenderer blockMap={post.blocks} />
        <hr/>
        <SequenceFooter sequencestuff={post.sequenceDetail}/>
        <br/>  
        <br/>  
        <br/>  
    </Container>
</Container>

}
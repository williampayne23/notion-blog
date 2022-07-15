import { Container } from "react-bootstrap"
import { NotionRenderer } from "react-notion"
import SequenceFooter from "./SequenceFooter"

export default function BlogPostDetail({ post}){
    return <Container style={{"paddingTop": '4.5%', 'maxWidth': "900px", "margin":"auto"}}>
    <Container>
        <h3>{post.Name}</h3>
        <hr/>
        <NotionRenderer blockMap={post.blocks} />
        <hr/>
        {post?.Sequence && <SequenceFooter sequencestuff={post.sequenceDetail}/>}
        <br/>  
        <br/>  
        <br/>  
    </Container>
</Container>

}
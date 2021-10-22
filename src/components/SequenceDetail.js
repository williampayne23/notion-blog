import { NotionRenderer } from "react-notion"
import PageList from "./PageList"

export default function SequenceDetail({sequence}) {
    return  (<span>
                <h3> { sequence.Name } </h3>
                <hr className="w3-opacity"/>
                <div className="row">
                    <div className="col-sm-8">
                        <NotionRenderer blockMap={sequence.blocks} />
                    </div>
                    <div className="col-sm-4">
                        <hr className="d-sm-none"/>
                        <h4>Articles</h4>
                        <br/>
                        <PageList pages={sequence.posts}></PageList>
                    </div>
                </div>
            </span>)
}
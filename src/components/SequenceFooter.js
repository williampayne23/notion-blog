export default function SequenceFooter({sequencestuff}){
    let previous = '';
    if(sequencestuff.previous)
        previous = <a href={"/" + sequencestuff.previous.slug} style={{"textDecoration":"none"}}>Previous : { sequencestuff.previous.Name }</a>
    else
        previous = (<a href="{% url 'blog:sequence' sequencestuff.sequence.id %}">
                            Back to the { sequencestuff.sequence } Sequence page
                    </a>)

    let next = '';
    if(sequencestuff.next)
        next = <a href={"/" + sequencestuff.next.slug} style={{"textDecoration":"none"}}>Next : { sequencestuff.next.Name }</a>

    return (
        <div className="row">
            <div className='col-sm-4' style={{"textAlign":"center"}}>
                {previous}
            </div>
            <hr className="d-sm-none" style={{"width":"80%", "marginLeft":"auto", "marginRight":"auto"}}/>
            <div className='col-sm-4' style={{"textAlign":"center"}}>
            Keep moving along the { sequencestuff.sequence } Sequence
            </div>
            <hr className="d-sm-none" style={{"width":"80%", "marginLeft":"auto", "marginRight":"auto"}}/>
            <div className='col-sm-4' style={{"textAlign":"center"}}>
                {next}
            </div>
        </div>
    )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"

export default function PageList({ pages }) {
    return (
      <div>
        {pages.map((page, i) => (
            <span key={i}>
            <Link to={'/' + page.slug}>
              <div className="link">
                <div className="row">
                  <h5 className="col-12 col-sm-7" style={page['Draft?']? {'color': 'red'} : {}}>{page['Pinned?']? <FontAwesomeIcon icon={faThumbtack} /> : ""} {page.Name}</h5>
                </div>
                <p style={{"color":"var(--fg2)"}}>{page.Description}</p>
              </div>
            </Link>
            <hr/>
            </span>
          ))}
      </div>
    )
}
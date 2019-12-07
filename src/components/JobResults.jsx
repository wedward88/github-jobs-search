import React from 'react';


class JobResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: new Set(),
        }
    }

    toggleActive (id) {
        // Checks if the listing ID is in the active state, if it is, it removes it. If it isn't, it adds it.
        // This allows to have multiple list items expanded at once

        let currentActive = this.state.active;

        if (currentActive.has(id)) {
            // removes from active state
            this.setState(prevState => {
                const newActive = new Set(prevState.active);
                newActive.delete(id);
                return { active: newActive }
            });
        } else {
            // adds to active state
            this.setState(prevState => {
                return { active: new Set(prevState.active).add(id) }
            })
        }
    }

    render () {
        const { results, changePage, currentPage } = this.props;
        const { active } = this.state;
        
        return (
            <>
                {results.length ? 
                    <section className="job-results">
                        <div className="section-head">
                            <h1>Page {currentPage}</h1>
                            <div className="nav-buttons">
                                {/* Currently shows the next button unless there's less than 50 results, indicating the end of results.
                                    This would only be an issue if the number of results was a multiple of 50 */}
                                { currentPage > 1 ? <button onClick={() => changePage('back')}>Previous</button> : null }
                                { results.length < 50 ? null : <button onClick={() => changePage('next')}>Next</button> }
                            </div>
                        </div>
                        <ul className="results-list">
                            {results.map(listing => {
                                return (
                                    <li
                                        key={listing.id}
                                        className={active.has(listing.id) ? "listing active-listing" : "listing inactive-listing"}
                                    >
                                        <h2 onClick={() => this.toggleActive(listing.id)}>
                                            {listing.title}
                                        </h2>
                                        {active.has(listing.id) ? (
                                            <>
                                                {listing.company_logo ? <a href={listing.company_url} target="_blank" rel="noopener noreferrer"><img alt="company-logo" src={listing.company_logo} /></a> : null}
                                                <div className="listing-details" dangerouslySetInnerHTML={{ __html: listing.description }} />
                                                <h3>How to Apply:</h3>
                                                <div className="listing-apply" dangerouslySetInnerHTML={{ __html: listing.how_to_apply }} />
                                            </>
                                        ) : null}
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </section> : null }
            </>
        )
    }
}

export default JobResults;
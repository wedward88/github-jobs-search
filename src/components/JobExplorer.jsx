import React from 'react';
import Header from './Header';
import JobForm from './JobForm';
import JobResults from './JobResults';

class JobExplorer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            results: [],
            currentPage: null,
            currentUrl: null,
        };
    }


    saveResults = (results, url, page) => {
        this.setState({
            results,
            currentUrl: url,
            currentPage: page,
        })
    }

    changePage = (direction) => {      
        const { currentPage , currentUrl} = this.state;
        let newPage;

        // increments the current page by 1, or decrements by 1
        if (direction === 'next'){
            newPage = currentPage + 1;
        } else if (direction === 'back'){
            newPage = currentPage - 1;
        }

        // Interpolates the relevant fields into a new query string, and sends a GET request to the API,
        // then sets the state with the new data
        const fullQuery = `${currentUrl}&page=${newPage}`

        fetch(fullQuery)
            .then(res => res.json())
            .then(data => {
                this.saveResults(data, currentUrl, newPage);
            })
    }

    render () {
        const { currentPage, currentUrl } = this.state;
        return (
            <>
                <Header />
                <JobForm saveResults={this.saveResults} />
                <JobResults 
                    results={this.state.results} 
                    currentPage={currentPage}
                    changePage={this.changePage} 
                    currentUrl={currentUrl}
                />
            </>
        )
    }
}

export default JobExplorer;
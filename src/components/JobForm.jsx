import React from 'react';

class JobForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            description: '',
            location: '',
            fullTime: false,
            currentSearch: null,
            currentPage: null
        }
    }

    handleSubmit = (e, page) => {
        e.preventDefault();
        const { description, location, fullTime } = this.state;
        const { saveResults } = this.props;

        // Interpolates the relevant fields into the query string, and sends a GET request to the API
        const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${fullTime}`;
        const fullQuery = `${url}&page=${page}`

        fetch(fullQuery)
            .then(res => res.json())
            .then(data => {
                saveResults(data, url, page);
            })
    }


    handleChange (e, field) {

        // Checks if the field is the checkbox, if so, toggles the checkbox.
        // Otherwise, it updates the text input field state

        if (field === 'fullTime') {
            this.setState(prevState => {
                return { fullTime: !prevState.fullTime, }
            })
        } else {
            this.setState({ [field]: e.target.value });
        }
    }

    render () {

        const { 
            description,
            location,
            fullTime 
        } = this.state;

        return (
            <form onSubmit={(e) => this.handleSubmit(e, 1)}>
                <input 
                    type="search"
                    value={description}
                    onChange={(e)=>this.handleChange(e, 'description')}
                    placeholder="Enter job search term (React, JavaScript, etc...)" 
                />
                <input 
                    type="search"
                    value={location}
                    onChange={(e)=>this.handleChange(e, 'location')} 
                    placeholder="Enter search location..."
                />
                <div className="check-box">
                    <input 
                        type="checkbox"
                        value={fullTime}
                        onChange={(e) => this.handleChange(e, 'fullTime')}  
                    />
                    <label>Limit results to full-time positions</label>
                </div>
                <button onClick={(e) => this.handleSubmit(e, 1)}>Submit</button>
            </form>
        )
    }
}

export default JobForm;
import React from 'react';

class Form extends React.Component {   

    constructor(props) {
        super(props);
        this.state = {
            success : true,
            showMessage: false,
            message: '',
            fruitname : '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {

        return (
            <div>
                {
                    this.state.showMessage ?
                        this.state.success ? 
                        (
                            <div className="alert alert-success" role="alert" >
                                { this.state.message }
                            </div>
                        ) : (
                            <div className="alert alert-danger" role="alert">
                                { this.state.message }
                            </div>
                        )
                    : null
                }
                <form>
                    <div className="form-group">
                        <label htmlFor="fruitName">Fruit Name</label>
                        <input type="text" name="fruitname" onChange={ this.handleChange } value={ this.state.fruitname } className="form-control" id="fruitName" placeholder="Enter fruit name" />
                        <small className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={ this.handleSubmit }>Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {

        fetch('http://localhost:9001/input', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fruit: this.state.fruitname
            })
        })
        .then(response => {
            if (response.ok && response.status === 200) {
                this.setState({
                    success: true,
                    showMessage : true,
                    message : 'Successfully saved the fruit name.',
                    fruitname : '',
                });
                return response.json();
            } else {
                this.setState({
                    success: false,
                    showMessage : true,
                    message : 'Failed to save fruit name.'
                });
            }
        })
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            this.setState({
                success: false,
                showMessage : true,
                message : 'An exception has occurred.'
            });
            console.log(error)
        });
    }
}

export default Form;

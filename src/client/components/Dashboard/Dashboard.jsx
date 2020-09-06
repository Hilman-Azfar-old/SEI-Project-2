import React from 'react';
import auth from '../../Auth/Auth'
import PropTypes from 'prop-types'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1> Welcome </h1>
                <button onClick = {() => {
                    auth.logout(() => {
                        this.props.history.push("/user/login")
                    })
                }
                } > Logout </button>
            </div>
        );
    }
}

Dashboard.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Dashboard;
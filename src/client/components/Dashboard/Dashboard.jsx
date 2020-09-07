import React from 'react';
import auth from '../../Auth/Auth'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { Link, Switch } from 'react-router-dom'
import ProtectedRoute from '../../Auth/ProtectedRoute'

import About from '../PrefillForms/About'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user : [
            {
                about: {
                    name: 'Hilman',
                    description: "long long long long"
                },
            },
            {
                contact: {
                    name: 'Hilman',
                    number: '123456789',
                    email: 'here@there',
                }
            },
            {
                album: 'pen'
            },
            {
                album: 'paper'
            },
            {
                album: 'scissors'
            }
            ],
            routes: null
        }

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleDescriptionChange(value) {
        let key = 'about';
        this.setState(prevState => ({
                user: prevState.user.map( item =>
            Object.keys(item)[0] === key ? { about: {...item.about, description: value}} : item
                )
            })
        )
        console.log(this.state.user, '-- dash');
    }

    componentDidMount() {

        //get user

        let routes = this.state.user.map((item) => {
            let id = Object.keys(item)[0];
            let exact = true;
            let element;
            switch(id) {
                case 'about':
                    element = <About about={item}
                                     onDescriptionChange={this.handleDescriptionChange}/>
                    break
                case 'contact':
                    element = <h1> {id} </h1>
                    break
                case 'album':
                    id = item[id]
                    element = <h1> {id} </h1>
                    break
            }

            let output = {
                id: id,
                path: `/user/dashboard/${id}`,
                exact: exact,
                display: () => element
            }
            return output
        })
        this.setState({
            routes: routes
        })
    }

    render() {
        let style = {
            position: 'fixed',
            height: '100vh',
        }

        return (
            <div>
                { this.state.routes ?
                (<div>
                    <div style={style}
                         className="col-sm-3">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/user/dashboard">dashboard</Link>
                        </li>
                    {this.state.routes.map((route, index) => (
                        <li key={index}>
                            <Link to={route.path}>{route.id}</Link>
                        </li>
                    ))}
                    </ul>
                    <button onClick = {() => {
                        auth.logout(() => {
                            this.props.history.push("/user/login")
                        })
                    }
                    } > Logout </button>
                </div>
                <Row>
                    <Col sm={{span: 9, offset: 3}}>
                        <Switch>
                            <ProtectedRoute
                                exact
                                path="/user/dashboard"
                                component={() =>(<div> dashboard </div>)}
                            />
                            {this.state.routes.map((route, index) => (
                                <ProtectedRoute
                                    key={index}
                                    exact={route.exact}
                                    path={route.path}
                                    component={route.display}
                                />
                            ))}
                        </Switch>
                    </Col>
                </Row>
                </div>)
                : (<h4> rendering </h4>)
            }
            </div>
        );
    }
}

Dashboard.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Dashboard;
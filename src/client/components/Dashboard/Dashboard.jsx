import React from 'react';
import auth from '../../Auth/Auth'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { Link, Switch } from 'react-router-dom'
import ProtectedRoute from '../../Auth/ProtectedRoute'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let style = {
            position: 'fixed',
            height: '100vh',
        }

        let db = [
            {
                album: 'pen'
            },
            {
                album: 'paper'
            },
            {
                album: 'scissors'
            }
        ]

        let profile = [
            {
                profile: {
                    name : 'Hilman'
                },
                description: "long long long long"
            },
            {
                contact: {
                    name : 'Hilman',
                    number: '123456789',
                    email: 'here@there',
                }
            }
        ]

        // create routes dynamically from db
        let albumRoutes = db.map(( item ) => {
            let album = item.album;
          return {
            id: album,
            path: `/user/dashboard/${album}`,
            exact: true,
            display: () => <div> {album} </div>
          }
        })

        let profileRoutes = profile.map(( item ) => {
            let ext = Object.keys(item)[0]
            console.log(ext);
            return {
              id: ext,
              path: `/user/dashboard/${ext}`,
              exact: true,
              display: () => <div> {ext} </div>
            }
        })

        let routes = [...profileRoutes, ...albumRoutes];
        console.log(albumRoutes);

        return (
            <div>
                <div style={style}
                         className="col-sm-3">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/user/dashboard">dashboard</Link>
                        </li>
                    {routes.map((route, index) => (
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
                            {routes.map((route, index) => (
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
            </div>
        );
    }
}

Dashboard.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Dashboard;
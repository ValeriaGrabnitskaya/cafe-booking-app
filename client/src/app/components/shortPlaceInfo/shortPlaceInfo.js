import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';

class ShortPlaceInfo extends React.PureComponent {

    static propTypes = {
        mainInfo: PropTypes.object.isRequired
    }

    state = {
        userName: '',
        email: ''
    }

    render() {
        return (
            <Fragment>
                {
                    (Object.keys(this.props.mainInfo).length !== 0) &&
                    <Fragment>
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <h4>Место бронирования: {this.props.mainInfo.name}</h4>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <form className="SearchForm" onSubmit={this.validateForm}>
                                    <div className="form-group" style={{ textAlign: "center" }}>
                                        <h5>Заполните данные</h5>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <span className="p-float-label">
                                                <InputText id="float-input" type="text" className="form-control Input" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} />
                                                <label className="Label" htmlFor="float-input" style={{ fontSize: "16px" }}>Имя</label>
                                            </span>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <span className="p-float-label">
                                                <InputText id="float-input" type="text" className="form-control Input" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                                <label className="Label" htmlFor="float-input" style={{ fontSize: "16px" }}>E-mail</label>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                }
            </Fragment>
        )
    }
}

export default ShortPlaceInfo;
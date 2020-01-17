import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { withRouter } from "react-router";
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';

import { addCommentAC } from '../../../../core/middleware/addComment';
import './CommentForm.css';

class CommentForm extends React.PureComponent {

    static propTypes = {
        places: PropTypes.array,
        place: PropTypes.object.isRequired
    };

    state = {
        placeId: parseInt(this.props.match.params.placeId),
        id: null,
        userName: '',
        email: '',
        service: 0,
        dishQuality: 0,
        costQuality: 0,
        atmosphere: 0,
        text: '',
        date: dateFormat(new Date(), "isoDate"),
        isUserNameValid: true,
        isEmailValid: true,
        isServiceMarkValid: true,
        isDishQualityMarkValid: true,
        isCostQualityMarkValid: true,
        isAtmosphereMarkValid: true,
        isTextValid: true,
        isFormValid: true
    }

    validateForm = (e) => {
        e.preventDefault();
        this.setState({
            isUserNameValid: this.state.userName ? true : false,
            isEmailValid: this.state.email ? true : false,
            isServiceMarkValid: this.state.service ? true : false,
            isDishQualityMarkValid: this.state.dishQuality ? true : false,
            isCostQualityMarkValid: this.state.costQuality ? true : false,
            isAtmosphereMarkValid: this.state.atmosphere ? true : false,
            isTextValid: this.state.text ? true : false,
            isFormValid: this.state.userName && this.state.email && this.state.service && this.state.dishQuality && this.state.costQuality && this.state.atmosphere && this.state.text
        }, this.onSubmit)
    }

    onSubmit = () => {
        if (this.state.isFormValid) {
            let searchForm = {
                placeId: this.state.placeId,
                id: this.props.place.commentsInfo.length,
                userName: this.state.userName,
                email: this.state.email,
                service: this.state.service,
                dishQuality: this.state.dishQuality,
                costQuality: this.state.costQuality,
                atmosphere: this.state.atmosphere,
                text: this.state.text,
                date: this.state.date
            }
            this.props.dispatch(addCommentAC({ body: { searchForm: searchForm, places: this.props.places } }));
            this.resetSearchForm();
        }
    }

    resetSearchForm = () => {
        this.setState({
            placeId: parseInt(this.props.match.params.placeId),
            id: null,
            userName: '',
            email: '',
            service: 0,
            dishQuality: 0,
            costQuality: 0,
            atmosphere: 0,
            text: '',
            date: dateFormat(new Date(), "isoDate")
        })
    }

    onReset = (e) => {
        e.preventDefault();
        this.resetSearchForm();
    }

    render() {
        return (
            <Fragment>
                <div className="CommentFormContainer mb-md-5">
                    <form className="CommentForm" onSubmit={this.validateForm}>
                        <div className="form-group mb-5" style={{ textAlign: "center" }}>
                            <h2>Оставить отзыв</h2>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <span className="p-float-label">
                                    <InputText id="float-input" type="text" className="form-control Input" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} />
                                    <label className="Label" htmlFor="float-input" style={{ fontSize: "16px" }}>Имя<span style={{ color: "red" }}>*</span></label>
                                    <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isUserNameValid) && 'Заполните поле'}</p>
                                </span>
                            </div>
                            <div className="form-group col-md-6">
                                <span className="p-float-label">
                                    <InputText id="float-input" type="text" className="form-control Input" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                    <label className="Label" htmlFor="float-input" style={{ fontSize: "16px" }}>E-mail<span style={{ color: "red" }}>*</span></label>
                                    <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isEmailValid) && 'Заполните поле'}</p>
                                </span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-sm-6 col-12" style={{textAlign: 'center'}}>
                                <label className="Label" htmlFor="inputEmail4">Обслуживание<span style={{ color: "red" }}>*</span></label>
                                <Rating value={this.state.service} cancel={false} onChange={(e) => this.setState({ service: e.value })} />
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isServiceMarkValid) && 'Заполните поле'}</p>
                            </div>
                            <div className="form-group col-md-6 col-sm-6 col-12" style={{textAlign: 'center'}}>
                                <label className="Label" htmlFor="inputEmail4">Питание<span style={{ color: "red" }}>*</span></label>
                                <Rating value={this.state.dishQuality} cancel={false} onChange={(e) => this.setState({ dishQuality: e.value })} />
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isDishQualityMarkValid) && 'Заполните поле'}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-sm-6 col-12" style={{textAlign: 'center'}}>
                                <label className="Label" htmlFor="inputEmail4">Цена/качество<span style={{ color: "red" }}>*</span></label>
                                <Rating value={this.state.costQuality} cancel={false} onChange={(e) => this.setState({ costQuality: e.value })} />
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isCostQualityMarkValid) && 'Заполните поле'}</p>
                            </div>
                            <div className="form-group col-md-6 col-sm-6 col-12" style={{textAlign: 'center'}}>
                                <label className="Label" htmlFor="inputEmail4">Атмосфера<span style={{ color: "red" }}>*</span></label>
                                <Rating value={this.state.atmosphere} cancel={false} onChange={(e) => this.setState({ atmosphere: e.value })} />
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isAtmosphereMarkValid) && 'Заполните поле'}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="Label" htmlFor="exampleFormControlTextarea1">Комментарий<span style={{ color: "red" }}>*</span></label>
                            <InputTextarea className="form-control TextArea" rows={3} cols={20} autoResize={true} value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })}></InputTextarea>
                            <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isTextValid) && 'Заполните поле'}</p>
                        </div>
                        <div className="form-group" style={{ textAlign: "right" }}>
                            <button type="submit" className="btn btn-primary">Отправить отзыв</button>
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        places: state.placesReducer.places
    };
};

export default connect(mapStateToProps)(withRouter(CommentForm));
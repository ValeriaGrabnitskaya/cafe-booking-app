import React from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { withRouter } from "react-router";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Prompt } from "react-router-dom";

import { getOpenTimeAC } from '../../middleware/getOpenTime';
import { searchAvailableTablesAC } from '../../middleware/searchAvailableTables';
import { bookTableAC } from '../../middleware/bookTable';
import { bookingEvents } from '../events';
import './BookingForm.css';

class BookingForm extends React.PureComponent {

    static propTypes = {
        openTime: PropTypes.array.isRequired,
        mainInfo: PropTypes.object.isRequired,
        places: PropTypes.array
    };

    state = {
        userName: '',
        email: '',
        phone: '',
        date: null,
        timeFrom: null,
        timeTo: null,
        placeId: null,
        selectedTableId: null,
        isUserNameValid: true,
        isEmailValid: true,
        isPhoneValid: true,
        isDateValid: true,
        isTimeFromValid: true,
        isTimeToValid: true,
        isTimePeriodValid: true,
        isFirstFormValid: true,
        isSearchFormValid: true,
        isPromptShow: true
    }

    componentDidMount() {
        bookingEvents.addListener('GetSelectedTable', this.getSelectedTable);

        this.props.dispatch(getOpenTimeAC(this.props.dispatch));
    }

    componentWillUnmount() {
        bookingEvents.removeListener('GetSelectedTable', this.getSelectedTable);
    }

    componentDidUpdate(oldProps, oldState) {
        this.setState({
            isPromptShow: true
        })
    }

    getSelectedTable = (tableId) => {
        this.setState({ selectedTableId: tableId })
    }

    configTime = (time, isTimeFrom) => {
        if (time && Object.keys(this.props.mainInfo).length !== 0) {
            if (isTimeFrom) {
                return time.slice(this.props.mainInfo.openTimeFrom.value - 1, this.props.mainInfo.openTimeTo.value - 1)
            } else {
                return time.slice(this.props.mainInfo.openTimeFrom.value, this.props.mainInfo.openTimeTo.value)
            }
        }
    }

    validateForm = (e) => {
        e.preventDefault();
        this.setState({
            isDateValid: this.state.date ? true : false,
            isTimeFromValid: this.state.timeFrom ? true : false,
            isTimeToValid: this.state.timeTo ? true : false,
            isTimePeriodValid: this.state.timeFrom && this.state.timeTo && this.state.timeFrom.value < this.state.timeTo.value,
            isSearchFormValid: this.state.date && this.state.timeFrom && this.state.timeTo && this.state.timeFrom.value < this.state.timeTo.value,
            isPromptShow: false
        }, this.onSubmit)
    }

    onSubmit = () => {
        if (this.state.isSearchFormValid) {
            this.searchPlaces();
        }
    }

    searchPlaces = () => {
        let searchForm = {
            date: this.state.date ? dateFormat(this.state.date, "isoDate") : null,
            timeFrom: this.state.timeFrom ? this.state.timeFrom.value : null,
            timeTo: this.state.timeTo ? this.state.timeTo.value : null,
            placeId: this.props.mainInfo ? this.props.mainInfo.id : null,
        };
        this.props.dispatch(searchAvailableTablesAC({ body: { searchForm: searchForm, places: this.props.places } }));
        bookingEvents.emit('SearchAvailableTables', true);
    }

    onReset = (e) => {
        e.preventDefault();
        this.setState({
            date: null,
            timeFrom: null,
            timeTo: null,
            placeId: null,
            isPromptShow: false            
        }, this.searchPlaces);
    }

    validateFirstForm = (e) => {
        e.preventDefault();
        this.setState({
            isUserNameValid: this.state.userName ? true : false,
            isEmailValid: this.state.email ? true : false,
            isPhoneValid: this.state.phone ? true : false,
            isFirstFormValid: this.state.userName && this.state.email && this.state.phone,
            isPromptShow: false            
        }, this.onBook)
    }

    onBook = () => {
        if (this.state.isFirstFormValid && this.state.isSearchFormValid) {
            let searchForm = {
                userName: this.state.userName,
                email: this.state.email,
                phone: this.state.phone,
                date: dateFormat(this.state.date, "isoDate"),
                timeFrom: this.state.timeFrom.value,
                timeTo: this.state.timeTo.value,
                placeId: this.props.mainInfo.id,
                selectedTableId: this.state.selectedTableId
            };
            this.props.dispatch(bookTableAC({ body: { places: this.props.places, searchForm: searchForm } }));
            this.props.history.push('/reservation-info');
        }
    }

    render() {
        let isFormFilled = this.state.userName !== '' || this.state.email !== '' || this.state.phone !== '' ||
            this.state.date !== null || this.state.timeFrom !== null || this.state.timeTo !== null;
        return (
            <div className="container BookingFormContainer">
                <form className="BookingForm">
                    <div className="form-group mb-md-4" style={{ textAlign: "center" }}>
                        <h4>Заполните поля</h4>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <span className="p-float-label">
                                <h5 className="LabelInput">Имя<span style={{ color: "red" }}>*</span></h5>
                                <InputText id="float-input" type="text" className="form-control Input" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} />
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isUserNameValid) && 'Заполните поле'}</p>
                            </span>
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <span className="p-float-label">
                                <h5 className="LabelInput">E-mail<span style={{ color: "red" }}>*</span></h5>
                                <InputText id="float-input" type="text" className="form-control Input" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isEmailValid) && 'Заполните поле'}</p>
                            </span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 col-sm-12">
                            <span className="p-float-label">
                                <h5 className="LabelInput">Телефон<span style={{ color: "red" }}>*</span></h5>
                                <InputMask className="form-control Input" mask="+(375)(99) 999-99-99" value={this.state.phone} placeholder="+(375)(99) 999-99-99" onChange={(e) => this.setState({ phone: e.value })}></InputMask>
                                <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isPhoneValid) && 'Заполните поле'}</p>
                            </span>
                        </div>
                    </div>
                </form>
                <form className="BookingForm" onSubmit={this.validateForm}>
                    <div className="form-group mb-md-4" style={{ textAlign: "center" }}>
                        <h4>Выберите дату и время бронирования:</h4>
                    </div>
                    <div className="form-row mb-md-3">
                        <div className="col-md-12">
                            <h5 className="LabelInput">Дата<span style={{ color: "red" }}>*</span></h5>
                            <Calendar className="Calendar" dateFormat="dd.mm.yy" value={this.state.date} onChange={(e) => this.setState({ date: e.value })} showIcon={true} />
                            <p style={{ color: "red" }}>{(!this.state.isSearchFormValid && !this.state.isDateValid) && 'Заполните поле'}</p>
                        </div>
                    </div>
                    <div className="form-row mb-md-5">
                        <div className="col-md-6 col-sm-12">
                            <h5 className="LabelInput">Время с<span style={{ color: "red" }}>*</span></h5>
                            <Dropdown className="Input" value={this.state.timeFrom} options={this.configTime(this.props.openTime, true)} onChange={(e) => this.setState({ timeFrom: e.value })}
                                filter={true} placeholder="Выберите время" filterBy="id,value" showClear={true} optionLabel="id" />
                            <p style={{ color: "red" }}>{(!this.state.isSearchFormValid && !this.state.isTimeFromValid) && 'Заполните поле'}</p>
                            <p style={{ color: "red" }}>{(!this.state.isSearchFormValid && !this.state.isTimePeriodValid) && 'Выберите корректный промежуток времени'}</p>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h5 className="LabelInput">Время по<span style={{ color: "red" }}>*</span></h5>
                            <Dropdown className="Input" value={this.state.timeTo} options={this.configTime(this.props.openTime, false)} onChange={(e) => this.setState({ timeTo: e.value })}
                                filter={true} placeholder="Выберите время" filterBy="id,value" showClear={true} optionLabel="id" />
                            <p style={{ color: "red" }}>{(!this.state.isSearchFormValid && !this.state.isTimeToValid) && 'Заполните поле'}</p>
                            <p style={{ color: "red" }}>{(!this.state.isSearchFormValid && !this.state.isTimePeriodValid) && 'Выберите корректный промежуток времени'}</p>
                        </div>
                    </div>
                    <div className="form-group" style={{ textAlign: "right" }}>
                        <Button label="Сброс" type="button" onClick={this.onReset} style={{ marginRight: "20px" }} />
                        <Button label="Поиск" type="submit" />
                    </div>
                </form>
                <div className="BookingButtonContainer">
                    <Button className="BookingButton" label="Забронировать" type="button" onClick={this.validateFirstForm} />
                </div>
                <Prompt when={isFormFilled && this.state.isPromptShow} message="Вы действительно хотите перейти на другую страницу? Все данные будут утеряны" />
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        openTime: state.dictionaryReducer.openTime,
        places: state.placesReducer.places,
    };
};

export default connect(mapStateToProps)(withRouter(BookingForm));
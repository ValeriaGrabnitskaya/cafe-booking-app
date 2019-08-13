import React from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { withRouter } from "react-router";

import { getOpenTimeAC } from '../../middleware/getOpenTime';
import { getPlacesForDropdownAC } from '../../middleware/getPlacesForDictionary';
import { searchPlacesAC } from '../../middleware/searchPlaces';
import { getPlacesTypesAC } from '../../middleware/getPlacesTypes';
import { saveSearchFormAC } from '../../actions/placesActions';
import entryPointsForSearchForm from '../../constants/entryPointsForSearchForm';

import './CafeSearch.css';

class CafeSearch extends React.PureComponent {

    static propTypes = {
        openTime: PropTypes.array.isRequired,
        dropdownPlaces: PropTypes.array.isRequired,
        places: PropTypes.array,
        placesTypes: PropTypes.array.isRequired,
        searchForm: PropTypes.object,
        entryPoint: PropTypes.number.isRequired
    };

    componentDidMount() {
        this.props.dispatch(getOpenTimeAC(this.props.dispatch));
        this.props.dispatch(getPlacesForDropdownAC(this.props.places));
        this.props.dispatch(getPlacesTypesAC(this.props.dispatch));
        this.searchPlaces();
    }
    state = {
        date: parseInt(this.props.match.params.entry) === entryPointsForSearchForm.CATALOG ? this.props.searchForm.date : null,
        timeFrom: parseInt(this.props.match.params.entry) === entryPointsForSearchForm.CATALOG ? this.props.searchForm.timeFrom : null,
        timeTo: parseInt(this.props.match.params.entry) === entryPointsForSearchForm.CATALOG ? this.props.searchForm.timeTo : null,
        placeId: parseInt(this.props.match.params.entry) === entryPointsForSearchForm.CATALOG ? this.props.searchForm.placeId : null,
        placeTypeId: parseInt(this.props.match.params.entry) === entryPointsForSearchForm.CATALOG ? this.props.searchForm.placeTypeId : null,
        minDate: new Date(new Date().setHours(0, 0, 0, 0)),
        isDateValid: true,
        isTimeFromValid: true,
        isTimeToValid: true,
        isTimePeriodValid: true,
        isFormValid: true
    }

    onSubmit = () => {
        if (this.state.isFormValid) {
            let formForSave = {
                date: this.state.date,
                timeFrom: this.state.timeFrom,
                timeTo: this.state.timeTo,
                placeId: this.state.placeId,
                placeTypeId: this.state.placeTypeId
            };
            this.props.dispatch(saveSearchFormAC(formForSave));
            this.searchPlaces();
            if (this.props.entryPoint === entryPointsForSearchForm.CATALOG) {
                this.props.history.push("/catalog/" + 1);
            } else {
                this.props.history.push("/catalog/" + 1 + '/' + entryPointsForSearchForm.CATALOG);
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
            isFormValid: this.state.date && this.state.timeFrom && this.state.timeTo && this.state.timeFrom.value < this.state.timeTo.value,
            isPromptShow: false
        }, this.onSubmit)
    }

    searchPlaces = () => {
        let searchForm = {
            date: this.state.date ? dateFormat(this.state.date, "isoDate") : null,
            timeFrom: this.state.timeFrom ? this.state.timeFrom.value : null,
            timeTo: this.state.timeTo ? this.state.timeTo.value : null,
            placeId: this.state.placeId ? this.state.placeId.value : null,
            placeTypeId: this.state.placeTypeId ? this.state.placeTypeId.value : null
        };
        this.props.dispatch(searchPlacesAC({ body: { searchForm: searchForm, places: this.props.places } }));
    }

    onReset = (e) => {
        e.preventDefault();
        this.setState({
            date: null,
            timeFrom: null,
            timeTo: null,
            placeId: null,
            placeTypeId: null,
            isDateValid: true,
            isTimeFromValid: true,
            isTimeToValid: true,
            isTimePeriodValid: true,
            isFormValid: true
        }, this.searchPlaces);
        if (this.props.entryPoint === entryPointsForSearchForm.CATALOG) {
            this.props.history.push("/catalog/" + 1);
        }
    }

    render() {
        return (
            <div className="container SearchFormContainer">
                <form className="SearchForm" onSubmit={this.validateForm}>
                    <div className="form-group" style={{ textAlign: "center" }}>
                        <h2>Поиск свободных столиков</h2>
                    </div>
                    <div className="form-row">
                        <div className="p-col-12 p-md-4 col-md-4">
                            <h5 className="Label">Дата<span style={{ color: "red" }}>*</span></h5>
                            <Calendar className="Input Dropdown" dateFormat="dd.mm.yy" value={this.state.date} onChange={(e) => this.setState({ date: e.value })} minDate={this.state.minDate} showIcon={true} />
                            <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isDateValid) && 'Заполните поле'}</p>
                        </div>
                        <div className="p-col-12 p-md-4 col-md-4">
                            <h5 className="Label">Время с<span style={{ color: "red" }}>*</span></h5>
                            <Dropdown className="Input" value={this.state.timeFrom} options={this.props.openTime} onChange={(e) => this.setState({ timeFrom: e.value })}
                                filter={true} placeholder="Выберите время" filterBy="id,value" showClear={true} optionLabel="id" />
                            <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isTimeFromValid) && 'Заполните поле'}</p>
                            <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isTimePeriodValid) && 'Выберите корректный промежуток времени'}</p>
                        </div>
                        <div className="p-col-12 p-md-4 col-md-4">
                            <h5 className="Label">Время по<span style={{ color: "red" }}>*</span></h5>
                            <Dropdown className="Input" value={this.state.timeTo} options={this.props.openTime} onChange={(e) => this.setState({ timeTo: e.value })}
                                filter={true} placeholder="Выберите время" filterBy="id,value" showClear={true} optionLabel="id" />
                            <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isTimeToValid) && 'Заполните поле'}</p>
                            <p style={{ color: "red" }}>{(!this.state.isFormValid && !this.state.isTimePeriodValid) && 'Выберите корректный промежуток времени'}</p>
                        </div>
                        <div className="p-col-12 p-md-4  col-md-4">
                            <h5 className="Label">Тип заведения</h5>
                            <Dropdown className="Input" value={this.state.placeTypeId} options={this.props.placesTypes} onChange={(e) => this.setState({ placeTypeId: e.value })}
                                filter={true} placeholder="Выберите тип заведения" filterBy="id,value" showClear={true} optionLabel="id" />
                        </div>
                        <div className="p-col-12 p-md-4  col-md-4">
                            <h5 className="Label">Название заведения</h5>
                            <Dropdown className="Input" value={this.state.placeId} options={this.props.dropdownPlaces} onChange={(e) => this.setState({ placeId: e.value })}
                                filter={true} placeholder="Выберите заведение" filterBy="id,value" showClear={true} optionLabel="id" />
                        </div>
                    </div>
                    <div className="form-group ButtonGroup" style={{ textAlign: "right" }}>
                        <Button className="SearchButtom btn btn-primary" label="Сбросить" type="button" onClick={this.onReset} style={{ marginRight: "20px" }} />
                        <Button className="SearchButtom btn btn-primary" label="Начать поиск" type="submit" id="submitBtn" />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        openTime: state.dictionaryReducer.openTime,
        dropdownPlaces: state.placesReducer.dropdownPlaces,
        places: state.placesReducer.places,
        placesTypes: state.dictionaryReducer.placesTypes,
        searchForm: state.placesReducer.searchForm
    };
};

export default connect(mapStateToProps)(withRouter(CafeSearch));
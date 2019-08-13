const OpenTime = require('../DB/OpenTime');

exports.getPlacesForDropdown = function (req, res) {
    let placesForDropdowns = [];
    req.body.forEach((place) => {
        placesForDropdowns.push({ value: place.mainPlaceInfo.id, id: place.mainPlaceInfo.name });
    })
    res.send(placesForDropdowns);
};

exports.searchPlaces = function (req, res) {
    res.send(searchPlacesByParams(req.body.body));
};

const searchPlacesByParams = (request) => {
    let places = request.places;
    let searchForm = request.searchForm;

    for (var key in searchForm) {
        if (searchForm[key]) {
            switch (key) {
                case 'placeId':
                    places = places.filter((place) => place.mainPlaceInfo.id === searchForm[key])
                    break;
                case 'placeTypeId':
                    places = places.filter((place) => place.mainPlaceInfo.placeType.value === searchForm[key])
                    break;
            }
        }
    }
    return filterResultByTime(searchForm, places);
}

const filterResultByTime = (request, result) => {
    if (request.date && request.timeFrom && request.timeTo) {
        let filteredResult = [];
        result.forEach((place) => {
            let correctTablesCount = 0;
            place.tablesInfo.forEach((table) => {
                if (table.dateTimeBooked.length) {
                    correctTablesCount += isFreeDateTimeBookTable(table.dateTimeBooked, place, request) ? 1 : 0;
                } else { correctTablesCount += 1; }
            })
            if (correctTablesCount > 0) {
                filteredResult.push(place);
            }
        })
        return filteredResult;
    } else {
        return result;
    }
}

const isFreeDateTimeBookTable = (bookList, place, request) => {
    let countCorrectTable = 0;
    let isDateExistInBookList = false;
    bookList.forEach((oneDateBookInfo) => {
        if (oneDateBookInfo.date === request.date) {
            isDateExistInBookList = true;
            countCorrectTable += checkTime(place, oneDateBookInfo, request);
        }
    })
    if (!isDateExistInBookList) {
        countCorrectTable += 1;
    }
    return countCorrectTable > 0;
}

const checkTime = (place, dateTimeBookInfo, request) => {
    if (request.timeFrom > place.mainPlaceInfo.openTimeFrom.value && request.timeTo < place.mainPlaceInfo.openTimeTo.value) {
        let configTimeFrom = configTime(request.timeFrom, request.timeTo, true);
        let configTimeTo = configTime(request.timeFrom, request.timeTo, false);

        if (isFreeTime(configTimeFrom, dateTimeBookInfo.timeFrom) && isFreeTime(configTimeTo, dateTimeBookInfo.timeTo)) {
            return 1;
        } else { return 0; }
    }
}

const configTime = (timeFrom, timeTo, isTimeFrom) => {
    if (timeFrom + 1 !== timeTo) {
        let timeInterval = [];

        for (let i = timeFrom; i < timeTo + 1; i++) {
            timeInterval.push(i);
        }

        let newTimeFrom = timeInterval.slice(0, timeInterval.length - 1);
        let newTimeTo = timeInterval.slice(1, timeInterval.length);

        return isTimeFrom ? newTimeFrom : newTimeTo
    } else {
        return isTimeFrom ? [timeFrom] : [timeTo]
    }
}

const isFreeTime = (configTime, timeBook) => {
    let configTimeLength = configTime.length;
    let copyConfigTime = configTime;

    copyConfigTime.forEach((timeFrom) => {
        if (timeBook.includes(timeFrom)) {
            copyConfigTime.splice(copyConfigTime.length - 1, 1);
        }
    })
    return copyConfigTime.length === configTimeLength;
}

exports.getPlaceById = function (req, res) {
    let id = req.body.body.placeId;
    let places = req.body.body.places;
    let foundPlace = places.filter((place) => place.mainPlaceInfo.id === id)[0];
    res.send(foundPlace)
};

exports.getAvailableTables = function (req, res) {
    let form = req.body.body.searchForm;
    let places = req.body.body.places;
    let foundPlace = places.filter((place) => place.mainPlaceInfo.id === form.placeId)[0];
    let updatedPlace = configAvailableTables(form, foundPlace);
    let updatedPlaces = places.splice(places.indexOf(foundPlace), 1, updatedPlace);
    res.send({places: updatedPlaces, place: updatedPlace})
};

const configAvailableTables = (request, place) => {
    if (request.date && request.timeFrom && request.timeTo) {
        place.tablesInfo.map((table) => {
            table['isAvailable'] = isFreeDateTimeBookTable(table.dateTimeBooked, place, request);
            return table;
        });
        return place;
    } else {
        return place;
    }
}

exports.addBookTableInfo = function (req, res) {
    let request = req.body.body.searchForm;
    let requestPlaces = req.body.body.places;

    let isExistDate = checkDateInTable(request, requestPlaces);

    let isPush = false;

    if (isExistDate) {
        requestPlaces.map((place) => {
            if (place.mainPlaceInfo.id === request.placeId) {
                place.tablesInfo.forEach((table) => {
                    if (table.id === request.selectedTableId) {
                        table.dateTimeBooked.forEach((oneDateInfo) => {
                            if (oneDateInfo.date === request.date) {
                                oneDateInfo.timeFrom.push(configTime(request.timeFrom, request.timeTo, true));
                                oneDateInfo.timeTo.push(configTime(request.timeFrom, request.timeTo, false));
                                isPush = !isPush;
                                return place;
                            }
                        })
                    }
                })
            }
        })
    } else {
        requestPlaces.map((place) => {
            if (place.mainPlaceInfo.id === request.placeId) {
                place.tablesInfo.forEach((table) => {
                    if (table.id === request.selectedTableId) {
                        table.dateTimeBooked.push({
                            date: request.date,
                            timeFrom: configTime(request.timeFrom, request.timeTo, true),
                            timeTo: configTime(request.timeFrom, request.timeTo, false)
                        });
                        isPush = !isPush;
                        return place;
                    }
                })
            }
        })
    }

    if (isPush) {
        res.send(configResonseForBooking(request, requestPlaces));
    } else {
        res.send({});
    }
};

const configResonseForBooking = (request, requestPlaces) => {
    let selectedPlace = requestPlaces.filter((place) => place.mainPlaceInfo.id === request.placeId)[0];
    let response = {
        userName: request.userName,
        email: request.email,
        phone: request.phone,
        placeName: selectedPlace.mainPlaceInfo.name,
        bookDate: request.date,
        bookTimeFrom: null,
        bookTimeTo: null,
        bookTable: request.selectedTableId
    }
    OpenTime.forEach((time) => {
        if (time.value === request.timeFrom) {
            response.bookTimeFrom = time.id;
        }
        if (time.value === request.timeTo) {
            response.bookTimeTo = time.id;
        }
    })
    return { bookInfo: response, places: requestPlaces };
}

const checkDateInTable = (form, places) => {
    let selectedPlace = places.filter((place) => place.mainPlaceInfo.id === form.placeId)[0];
    let selectedTable = selectedPlace.tablesInfo.filter((table) => table.id === form.selectedTableId)[0];
    return selectedTable.dateTimeBooked.filter((oneDateBookInfo) => oneDateBookInfo.date === form.date).length > 0;
}

exports.addComment = function (req, res) {
    let form = req.body.body.searchForm;
    let places = req.body.body.places;
    let updatedPlace = null;
    places = places.map((place) => {
        if (place.mainPlaceInfo.id === form.placeId) {
            place.commentsInfo.push({
                id: form.id,
                userName: form.userName,
                email: form.email,
                service: form.service,
                dishQuality: form.dishQuality,
                costQuality: form.costQuality,
                atmosphere: form.atmosphere,
                text: form.text,
                date: form.date
            });
            updatedPlace = place;
        }
        return place;
    });
    res.send({ places: places, place: updatedPlace })
}


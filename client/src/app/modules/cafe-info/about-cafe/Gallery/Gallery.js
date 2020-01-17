import React, { Fragment } from 'react';
import { Lightbox } from 'primereact/lightbox';

class Gallery extends React.PureComponent {

    render() {
        let images = [];
        this.props.place.mainPlaceInfo.gallery.forEach((photo) => {
            images.push({ source: `/src/img/${this.props.place.mainPlaceInfo.id}/${photo}.jpg`, thumbnail: `/src/img/${this.props.place.mainPlaceInfo.id}/small${photo}.jpg`, title: 'Sopranos 1' });
        })
        return (
            <Lightbox type="images" images={images} />
        )
    }

}

export default Gallery;
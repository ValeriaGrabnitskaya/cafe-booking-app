import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { DataView } from "primereact/dataview";
import dateFormat from 'dateformat';
import { Rating } from 'primereact/rating';

import './CommentTable.css';

class CommentTable extends React.PureComponent {

    static propTypes = {
        place: PropTypes.object.isRequired
    };

    renderListItem(comment) {
        var averageMark = 0;
        if (comment) {
            averageMark = (comment.service + comment.dishQuality + comment.costQuality + comment.atmosphere) / 4;
        }
        return (
            <Fragment>
                {
                    (comment) &&
                    <div key={comment.id} className="media position-relative CommentRow" style={{ padding: '2em', borderBottom: '1px solid #d9d9d9' }}>
                        <div className="media-body mr-3">
                            <h5 className="mt-0 Key">{comment.userName}</h5>
                            <div className="mb-md-3">
                                <span>Дата:</span> <span>{dateFormat(comment.date, 'dd.mm.yyyy')}</span>
                            </div>
                            <p>{comment.text}</p>
                            <span>Общая оценка:</span> <span> <Rating value={averageMark} readonly={true} stars={5} cancel={false} /></span>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }

    render() {
        var reversedComment = [];
        if (this.props.place.commentsInfo) {
            reversedComment = this.props.place.commentsInfo.reverse();
        }
        return (
            <Fragment>
                <h3 className="mb-md-3">Отзывы</h3>
                {
                    (this.props.place) &&
                    <DataView value={reversedComment} layout="list" className="CommentTable"
                        itemTemplate={this.renderListItem} paginatorPosition={'bottom'} paginator={true} rows={5} alwaysShowPaginator={this.props.place.commentsInfo && this.props.place.commentsInfo.length > 0} emptyMessage={'Пока нет комментариев'} />
                }
            </Fragment>
        )
    }
}

export default withRouter(CommentTable);
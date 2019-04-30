import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './daily-report.reducer';
import { IDailyReport } from 'app/shared/model/daily-report.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDailyReportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DailyReportDetail extends React.Component<IDailyReportDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dailyReportEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ivcenterserverApp.dailyReport.detail.title">DailyReport</Translate> [<b>{dailyReportEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="reportDate">
                <Translate contentKey="ivcenterserverApp.dailyReport.reportDate">Report Date</Translate>
              </span>
            </dt>
            <dd>{dailyReportEntity.reportDate}</dd>
            <dt>
              <span id="startTime">
                <Translate contentKey="ivcenterserverApp.dailyReport.startTime">Start Time</Translate>
              </span>
            </dt>
            <dd>{dailyReportEntity.startTime}</dd>
            <dt>
              <span id="endTime">
                <Translate contentKey="ivcenterserverApp.dailyReport.endTime">End Time</Translate>
              </span>
            </dt>
            <dd>{dailyReportEntity.endTime}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="ivcenterserverApp.dailyReport.content">Content</Translate>
              </span>
            </dt>
            <dd>{dailyReportEntity.content}</dd>
            <dt>
              <Translate contentKey="ivcenterserverApp.dailyReport.reporter">Reporter</Translate>
            </dt>
            <dd>{dailyReportEntity.reporter ? dailyReportEntity.reporter.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/daily-report" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/daily-report/${dailyReportEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ dailyReport }: IRootState) => ({
  dailyReportEntity: dailyReport.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyReportDetail);

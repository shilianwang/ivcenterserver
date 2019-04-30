import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './daily-report.reducer';
import { IDailyReport } from 'app/shared/model/daily-report.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDailyReportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DailyReport extends React.Component<IDailyReportProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dailyReportList, match } = this.props;
    return (
      <div>
        <h2 id="daily-report-heading">
          <Translate contentKey="ivcenterserverApp.dailyReport.home.title">Daily Reports</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="ivcenterserverApp.dailyReport.home.createLabel">Create new Daily Report</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ivcenterserverApp.dailyReport.reportDate">Report Date</Translate>
                </th>
                <th>
                  <Translate contentKey="ivcenterserverApp.dailyReport.startTime">Start Time</Translate>
                </th>
                <th>
                  <Translate contentKey="ivcenterserverApp.dailyReport.endTime">End Time</Translate>
                </th>
                <th>
                  <Translate contentKey="ivcenterserverApp.dailyReport.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="ivcenterserverApp.dailyReport.reporter">Reporter</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dailyReportList.map((dailyReport, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dailyReport.id}`} color="link" size="sm">
                      {dailyReport.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={dailyReport.reportDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={dailyReport.startTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={dailyReport.endTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{dailyReport.content}</td>
                  <td>{dailyReport.reporter ? <Link to={`employee/${dailyReport.reporter.id}`}>{dailyReport.reporter.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dailyReport.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dailyReport.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dailyReport.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ dailyReport }: IRootState) => ({
  dailyReportList: dailyReport.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyReport);

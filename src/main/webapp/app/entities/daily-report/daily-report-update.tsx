import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './daily-report.reducer';
import { IDailyReport } from 'app/shared/model/daily-report.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDailyReportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDailyReportUpdateState {
  isNew: boolean;
  reporterId: string;
}

export class DailyReportUpdate extends React.Component<IDailyReportUpdateProps, IDailyReportUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      reporterId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { dailyReportEntity } = this.props;
      const entity = {
        ...dailyReportEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/daily-report');
  };

  render() {
    const { dailyReportEntity, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ivcenterserverApp.dailyReport.home.createOrEditLabel">
              <Translate contentKey="ivcenterserverApp.dailyReport.home.createOrEditLabel">Create or edit a DailyReport</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dailyReportEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="daily-report-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="reportDateLabel" for="reportDate">
                    <Translate contentKey="ivcenterserverApp.dailyReport.reportDate">Report Date</Translate>
                  </Label>
                  <AvField id="daily-report-reportDate" type="date" className="form-control" name="reportDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="startTimeLabel" for="startTime">
                    <Translate contentKey="ivcenterserverApp.dailyReport.startTime">Start Time</Translate>
                  </Label>
                  <AvField id="daily-report-startTime" type="date" className="form-control" name="startTime" />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="endTime">
                    <Translate contentKey="ivcenterserverApp.dailyReport.endTime">End Time</Translate>
                  </Label>
                  <AvField id="daily-report-endTime" type="date" className="form-control" name="endTime" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="ivcenterserverApp.dailyReport.content">Content</Translate>
                  </Label>
                  <AvField id="daily-report-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label for="reporter.id">
                    <Translate contentKey="ivcenterserverApp.dailyReport.reporter">Reporter</Translate>
                  </Label>
                  <AvInput id="daily-report-reporter" type="select" className="form-control" name="reporter.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/daily-report" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  employees: storeState.employee.entities,
  dailyReportEntity: storeState.dailyReport.entity,
  loading: storeState.dailyReport.loading,
  updating: storeState.dailyReport.updating,
  updateSuccess: storeState.dailyReport.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyReportUpdate);

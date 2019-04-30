import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DailyReport from './daily-report';
import DailyReportDetail from './daily-report-detail';
import DailyReportUpdate from './daily-report-update';
import DailyReportDeleteDialog from './daily-report-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DailyReportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DailyReportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DailyReportDetail} />
      <ErrorBoundaryRoute path={match.url} component={DailyReport} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DailyReportDeleteDialog} />
  </>
);

export default Routes;

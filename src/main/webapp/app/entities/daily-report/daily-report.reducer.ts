import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDailyReport, defaultValue } from 'app/shared/model/daily-report.model';

export const ACTION_TYPES = {
  FETCH_DAILYREPORT_LIST: 'dailyReport/FETCH_DAILYREPORT_LIST',
  FETCH_DAILYREPORT: 'dailyReport/FETCH_DAILYREPORT',
  CREATE_DAILYREPORT: 'dailyReport/CREATE_DAILYREPORT',
  UPDATE_DAILYREPORT: 'dailyReport/UPDATE_DAILYREPORT',
  DELETE_DAILYREPORT: 'dailyReport/DELETE_DAILYREPORT',
  RESET: 'dailyReport/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDailyReport>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DailyReportState = Readonly<typeof initialState>;

// Reducer

export default (state: DailyReportState = initialState, action): DailyReportState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DAILYREPORT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DAILYREPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DAILYREPORT):
    case REQUEST(ACTION_TYPES.UPDATE_DAILYREPORT):
    case REQUEST(ACTION_TYPES.DELETE_DAILYREPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DAILYREPORT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DAILYREPORT):
    case FAILURE(ACTION_TYPES.CREATE_DAILYREPORT):
    case FAILURE(ACTION_TYPES.UPDATE_DAILYREPORT):
    case FAILURE(ACTION_TYPES.DELETE_DAILYREPORT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DAILYREPORT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DAILYREPORT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DAILYREPORT):
    case SUCCESS(ACTION_TYPES.UPDATE_DAILYREPORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DAILYREPORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/daily-reports';

// Actions

export const getEntities: ICrudGetAllAction<IDailyReport> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DAILYREPORT_LIST,
  payload: axios.get<IDailyReport>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDailyReport> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DAILYREPORT,
    payload: axios.get<IDailyReport>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDailyReport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DAILYREPORT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDailyReport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DAILYREPORT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDailyReport> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DAILYREPORT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

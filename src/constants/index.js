import AdminHomePage from '../container/AdminHomePage/index';
import Taskboard from '../container/Taskboard';

export const API_ENDPOINT = ' http://localhost:3000';

export const STATUSES = [
  {
    value: 0,
    label: 'READY',
  },
  {
    value: 1,
    label: 'IN PROGRESS',
  },
  {
    value: 2,
    label: 'COMPLETE',
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202,
};

export const ADMIN_ROUTES = [
  {
    name: 'Admin Page',
    path: '/',
    exact: true,
    component: AdminHomePage,
  },
  {
    name: 'Task Management',
    path: '/task-board',
    component: Taskboard,
  },
];

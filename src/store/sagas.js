import { all, fork } from "redux-saga/effects";

//public

import LayoutSaga from "./layout/saga";

import dashboardSaasSaga from "./dashboard-saas/saga";


export default function* rootSaga() {
  yield all([fork(LayoutSaga), fork(dashboardSaasSaga),  ]);
}

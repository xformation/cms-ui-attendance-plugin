export const AttendanceServices = {
  getDepartments,
  getDepartmentsByBranchId,
  getYears,
  getYearsByDepartmentId,
  getSubjects,
  getSubjectsByDepartmentAndBatchId,
  getBranches,
  getSections,
  getTypes,
  getSemesters,
  getLectures,
  getTeaches,
  getAttendanceMasters,
  updateStudentAttendance,
};

const url = 'http://18.234.66.133:8080/api/';

function getRequestOptions(method: any) {
  let requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return requestOptions;
}

function putRequestOptions(method: any, payLoad: any) {
  let requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  return requestOptions;
}

function getDepartments() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsdepartments`, requestOptions).then(response => response.json());
}

function getDepartmentsByBranchId(specificApi: any) {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}` + specificApi, requestOptions).then(response => response.json());
}

function getYears() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsbatches`, requestOptions).then(response => response.json());
}

function getYearsByDepartmentId(specificApi: any) {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}` + specificApi, requestOptions).then(response => response.json());
}

function getSubjects() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmssubjects`, requestOptions).then(response => response.json());
}

function getSubjectsByDepartmentAndBatchId(deptId: any, batchId: any) {
  let requestOptions = getRequestOptions('GET');
  return fetch(
    `${url}cmssubjects-bydepartment-batchid?departmentId=${deptId}&batchId=${batchId}`,
    requestOptions
  ).then(response => response.json());
}

function getBranches() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsbranches`, requestOptions).then(response => response.json());
}

function getSections() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}sections`, requestOptions).then(response => response.json());
}

function getTypes() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}studenttypes`, requestOptions).then(response => response.json());
}

function getSemesters() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmssemesters`, requestOptions).then(response => response.json());
}

function getLectures() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmslectures`, requestOptions).then(response => response.json());
}

function getTeaches() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsteaches`, requestOptions).then(response => response.json());
}

function getAttendanceMasters() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsattendance-masters`, requestOptions).then(response =>
    response.json()
  );
}

function updateStudentAttendance(payLoad: any) {
  let requestOptions = putRequestOptions('PUT', payLoad);
  return fetch(`${url}cmsstudent-attendances`, requestOptions).then(response =>
    response.json()
  );
}

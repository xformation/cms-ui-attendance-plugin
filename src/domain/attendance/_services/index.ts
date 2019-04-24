export const AttendanceServices = {
  getDepartments,
  getYears,
  getSubjects,
  getBranches,
  getSections,
  getTypes,
  getSemesters,
  getLectures,
  getTeaches,
  getAttendanceMasters,
};

const url = 'http://localhost:8080/api/'; //18.234.66.133

function getRequestOptions(method: any) {
  let requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return requestOptions;
}

function getDepartments() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsdepartments`, requestOptions).then(response => response.json());
}

function getYears() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmsbatches`, requestOptions).then(response => response.json());
}

function getSubjects() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmssubjects`, requestOptions).then(response => response.json());
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

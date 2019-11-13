// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------

export type StudentAttendanceData = {
  // id: string;
  attendanceStatus: string;
  comments: string;
  student: {
    studentName: any;
  };
  lecture: {
    id: any;
  };
};

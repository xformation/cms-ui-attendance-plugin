import gql from 'graphql-tag';

export const ADMIN_ATTENDANCE_CACHE = gql`
  query createStudentAttendanceCacheForAdmin(
    $branchId: String
    $departmentId: String
    $academicYearId: String
    $lectureDate: String
  ) {
    createStudentAttendanceCacheForAdmin(
      branchId: $branchId
      departmentId: $departmentId
      academicYearId: $academicYearId
      lectureDate: $lectureDate
    ) {
      departments {
        id
        name
        description
      }
      batches {
        id
        batch
        department {
          id
        }
      }
      subjects {
        id
        subjectType
        subjectCode
        subjectDesc
        department {
          id
        }
        batch {
          id
        }
      }
      sections {
        id
        section
        batch {
          id
        }
      }
      terms {
        id
        termsDesc
        strStartDate
        strEndDate
      }
      attendanceMasters {
        id
        teach {
          id
        }
        batch {
          id
        }
        section {
          id
        }
      }
      lectures {
        id
        lecDate
        startTime
        endTime
        strLecDate
        attendancemaster {
          id
          batch {
            id
            batch
          }
          section {
            id
            section
          }
          teach {
            id
            subject {
              id
              subjectType
              subjectCode
              subjectDesc
              department {
                id
              }
              batch {
                id
                batch
              }
            }
            teacher {
              id
              teacherName
            }
          }
        }
      }
    }
  }
`;

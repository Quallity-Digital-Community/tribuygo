import ls from 'local-storage'

export function getSchoolId(){
    return ls.get('schoolId')
}


import axios from 'axios'
export const Axios = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:5001/",
})

export const signin = async ({ login, password }) => {
    let response = await Axios.post('login', { login, password })
    return response.data
}

export const logout = async () => {
    let response = await Axios.get('logout')
    return response.data
}

export const addUser = async (user) => {
    let response = await Axios.post('addUser',user)
    return response.data
}

export const showUsers = async () => {
    let response = await Axios.get('users')
    return response.data
}

export const deleteUser = async (id) => {
    let response = await Axios.delete('user/'+id)
    return response.data
}
export const getStudents = async () => {
    let response = await Axios.get('students')
    return response.data
}
export const getTeachers = async () => {
    let response = await Axios.get('teachers')
    return response.data
}
export const addGroups = async (data) => {
    let response = await Axios.post('addGroup',data)
    return response.data
}
export const getGroups = async () => {
    let response = await Axios.get('groups')
    return response.data
}
export const deleteGroups = async (id) => {
    let response = await Axios.delete('group/'+id)
    return response.data
}
export const updateStudent = async (stud) => {
    let response = await Axios.put(`updateStudent/${stud.id}`, {name:stud.name, surname:stud.surname, group:stud.group})
    return response.data
}
export const changeGroupTeacher = async () => {
    let response = await Axios.put('changeGroupTeacher')
    return response.data
}
export const addTest = async (obj) => {
    let response = await Axios.post('addTest', obj)
    return response.data
}
export const getTest = async () => {
    let response = await Axios.get('allTests')
    return response.data
}
export const getTestId = async (id) => {
    let response = await Axios.get('test/'+id)
    return response.data
}
export const chuseAnswer = async (quest, id) => {
    let response = await Axios.get(`checkQuestion/${id}/${quest}`)
    return response.data
}
export const addHomework = async (obj) => {
    let response = await Axios.post('addHomework',obj)
    return response.data
}
export const getHomeworks = async (group) => {
    let response = await Axios.get('getHomeworks/'+group)
    return response.data
}


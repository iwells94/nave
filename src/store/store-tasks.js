// import Vue from 'vue'
import { uid, LocalStorage } from 'quasar'

const state = {
  tasks: [
    {
      id: 'ID1',
      title: 'Lavar ropa',
      description: 'Debo lavar la ropa sucia oe',
      done: false,
      taskOwner: 'Ian'
    }
  ],
  currentUser: '',
  users: [
    {
      username: 'Ian',
      password: 'asdf',
      insta: '@iwells94',
      firstname: 'Ian',
      lastname: 'Wells'
    },
    {
      username: 'Matias',
      password: 'hola123',
      insta: '@matiascampusano',
      firstname: 'Matias',
      lastname: 'Campusano'
    }
  ]
}

const mutations = {
  // Aqui van los metodos que manipulan el estado
  // No pueden ser asincronicos
  updateTask (state, payload) {
    // console.log('payload en updateTask mutation: ', payload)
    const task = state.tasks.find((task) => task.id === payload.id)
    task.done = payload.done
    LocalStorage.set('tareas', state.tasks)
  },
  deleteTask (state, id) {
    // console.log('eliminar id: ', id)
    const task = state.tasks.findIndex((task) => task.id === id)
    // console.log('ID a eliminar: ', task)
    state.tasks.splice(task, 1)
    LocalStorage.set('tareas', state.tasks)
  },
  addingTask (state, payload) {
    // console.log('payload(desde mutations): ', payload)
    payload.taskOwner = state.currentUser
    state.tasks.push({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      done: payload.done,
      taskOwner: payload.taskOwner
    })
    // console.log('payload(desde mutations): ', payload)
    LocalStorage.set('tareas', state.tasks)
  },
  setUser (state, payload) {
    // console.log('setUser: ', payload.data)
    const str = 'currentUser'
    state.currentUser = payload.data
    LocalStorage.set(str, state.currentUser)
    // console.log('Current User: ', LocalStorage.getItem(str))
  },
  logoutUser (state) {
    const str = 'currentUser'
    LocalStorage.remove(str)
    state.currentUser = ''
  },
  loadFromStorage (state, value) {
    state.tasks = value
    console.log('Tareas en tasks: ', state.tasks)
  },
  loadCurrentUser (state, value) {
    state.currentUser = value
    console.log('Tareas en tasks: ', state.currentUser)
  }
}

const actions = {
  // Metodos Asincronicos
  updateTask ({ commit }, payload) {
    // console.log('Payload:', payload)
    commit('updateTask', payload)
  },
  deleteTask ({ commit }, id) {
    commit('deleteTask', id)
  },
  addingTask ({ commit }, task) {
    const taskId = uid()
    const payload = {
      id: taskId,
      ...task
    }
    commit('addingTask', payload)
  },
  logoutUser ({ commit }) {
    console.log('LogOut User')
    commit('logoutUser')
  },
  setUser ({ commit }, userData) {
    commit('setUser', userData)
  },
  loadFromStorage ({ commit }) {
    if (LocalStorage.has('currentUser')) {
      if (LocalStorage.has('tareas')) {
        commit('loadFromStorage', LocalStorage.getItem('tareas'))
      }
    }
  },
  loadCurrentUser ({ commit }) {
    if (LocalStorage.has('currentUser')) {
      commit('loadCurrentUser', LocalStorage.getItem('currentUser'))
    }
  }
}

const getters = {
  // Aqui se crean los metodos que toman los datos del estado y usados por los componentes
  tasks: (state) => {
    return state.tasks.filter((task) => task.taskOwner === state.currentUser)
  },
  userInsta: (state) => {
    return state.users.find((user) => user.username === state.currentUser)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

// import Vue from 'vue'
import { uid, LocalStorage } from 'quasar'

const state = {
  tasks: [
    {
      id: 'ID1',
      title: 'Lavar ropa',
      description: 'Debo lavar la ropa sucia oe',
      done: false
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
    LocalStorage.set(payload.id, task)
  },
  deleteTask (state, id) {
    // console.log('eliminar id: ', id)
    const task = state.tasks.findIndex((task) => task.id === id)
    // console.log('ID a eliminar: ', task)
    LocalStorage.remove(id)
    state.tasks.splice(task, 1)
  },
  addingTask (state, payload) {
    // console.log('payload(desde mutations): ', payload)
    state.tasks.push({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      done: payload.done,
      taskOwner: state.currentUser
    })
    payload.taskOwner = state.currentUser
    console.log('payload(desde mutations): ', payload)
    LocalStorage.set(payload.id, payload)
  },
  setUser (state, payload) {
    // console.log('setUser: ', payload.data)
    state.currentUser = payload.data
    LocalStorage.set(state.currentUser, state.currentUser)
  },
  logoutUser (state) {
    LocalStorage.remove(state.currentUser)
    state.currentUser = ''
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
  }
}

const getters = {
  // Aqui se crean los metodos que toman los datos del estado y usados por los componentes
  tasks: (state) => {
    return state.tasks
  },
  userTasks: (state) => {
    const tasks = []
    Object.keys(state.tasks).forEach(function (key) {
      const task = state.tasks[key]
      if (state.currentUser === task.owner) {
        tasks[key] = task
      }
    })
    return tasks
  },
  userInsta: (state) => {
    const user = state.users.find((user) => user.username === state.currentUser)
    return user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

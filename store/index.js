import axios from 'axios'

export const state = () => ({
  authUser: null,
  projects: [],
  profiles: [],
  userProfile: null
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  },
  SET_PROJECTS (state,projects) {
    state.projects = projects
  },
  SET_USER_PROFILE (state, profile){
    state.userProfile = profile
  },
  SET_PROFILES(state, profiles){
    state.profiles = profiles
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login ({ commit }, { identifier, password }) {
    try {
      const { data } = await axios.post('http://localhost:1337/auth/local', { identifier, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout ({ commit }) {
    commit('SET_USER', null)
  },
  async getProfile({commit}){
    const options ={
      headers: {'Authorization': `Bearer ${this.state.authUser.jwt}`}
    } 
    const { data } = await axios.get("http://localhost:1337/users/me",options);
    const { data: profile } = await axios.get(`http://localhost:1337/profiles/${data.profile}`,options); // data.profile -> profile id
    commit('SET_USER_PROFILE', profile)
  },
  setProfile({commit}, { profile }){
    commit('SET_USER_PROFILE', profile)
  },
  async getItems ({ commit}, {resource, start }) {
    
    const { data } = await axios.get(`http://localhost:1337/${resource}?_start=${start}&_limit=5`);
    if(resource === "projects"){
      commit('SET_PROJECTS', data)
    }else{
      commit('SET_PROFILES', data)
    }
  }

}
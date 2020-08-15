import axios from 'axios'

const baseUrl = process.env.baseUrl;


export const state = () => ({
  authUser: null,
  projects: [],
  profiles: [],
  userProfile: null,
  project: {}
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
  },
  SET_PROJECT(state, project){
    state.project = project
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  // called on the server
  async nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }else{
      if (req.headers.cookie){
        const token = {}  
        const c = require('cookie').parse(req.headers.cookie);
        const jwt = c['jwt'];
        const id = c['user_id'];
        // if cookie with user_id is defined 
        if (id){
          const { data } = await axios.get(`${baseUrl}/profiles/${id}`)
          token.jwt = jwt
          commit('SET_USER', token)
          commit('SET_USER_PROFILE', data)
        }
        
      }
    }
  },
  async login ({ commit }, { identifier, password }) {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/local`, { identifier, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  
  async setUserFromCookie({ commit }, {jwt, id}){
    console.log('Got dispatch event')
    const user = {jwt}
    const {data} = await axios.get(`${baseUrl}/profiles/${id}`)
    commit('SET_USER', user)
    commit('SET_USER_PROFILE', data)
  },

  async logout ({ commit }) {
   
    document.cookie = "jwt="+ this.state.authUser.jwt + ";max-age=0";

    commit('SET_USER', null)
    commit('SET_USER_PROFILE', null)
  },
  
  async setProject({ commit }, {id}){
    const options ={
      headers: {'Authorization': `Bearer ${this.state.authUser.jwt}`}
    } 
    const { data } = await axios.get(`${baseUrl}/projects/${id}`,
    options);
    commit('SET_PROJECT', data)
  },
  
  async getMyProfile({state, commit}){
    const { data: profile } = await axios.get(`${baseUrl}/profiles/${state.userProfile.id}`); // data.profile -> profile id
    commit('SET_USER_PROFILE', profile)
  },

  // set profile after login
  async setProfileAfterLogin({state, commit}){
    const { data: profile } = await axios.get(`${baseUrl}/profiles/${state.authUser.user.id}`); // data.profile -> profile id
    commit('SET_USER_PROFILE', profile)
  },

  setProfile({commit}, { profile }){
    commit('SET_USER_PROFILE', profile)
  }

}
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light' as 'light' | 'dark'
  }),
  actions: {
    setTheme(theme: 'light' | 'dark') {
      if (this.currentTheme !== theme) {
        this.currentTheme = theme
      }
    }
  },
  persist: {
    key: 'vue-theme',
    storage: localStorage,
    pick: ['currentTheme']
  }
})

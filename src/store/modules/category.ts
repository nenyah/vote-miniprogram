import {Module} from "vuex"
import api from "@/api"
import Category from "@/model/category"
import {CategoryResponse} from "@/common/interface"

interface State {
    categories: CategoryResponse[]
    category: CategoryResponse
}


const init: Module<State, any> = {
    namespaced: true,
    state: {
        categories: [] as CategoryResponse[],
        category: new Category()
    },
    mutations: {
        setCategories: (state, data) => {
            state.categories = data
        },
        selectCateByID: (state, id) => {
            const category = state.categories.filter(el => el.id === id)[0]
            state.category = new Category(category)
        },
        setCategory: (state, o) => {
            state.category = new Category(o)
        },
        selectCateByIndex(state, index) {
            state.category = new Category(state.categories[index])
        }
    },
    getters: {},
    actions: {
        getCategories: async ({commit, rootState}) => {
            const res = await api.category.categories({activityId: rootState.activity.activity.id})
            if (res) {
                commit("setCategories", res)
                commit("setCategory", res[0])
            }
        }
    },
}
export default init

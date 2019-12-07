import { fetchItems } from "@/api";

const defaultState = {
    USER_INFO: {},
    LOGIN_STATE: true,
    // fake one
    ARTICLE_LIST: [
    ],
    PAGE_CONFIG: {
        pageSize: 20,
        pageNum: 1,
        totalNumber: 500
    }
}

export default (state = defaultState, action) => {
    // 处理dispatch内容
    if (action.type === 'addArticleListItem') {
        let backState = JSON.parse(JSON.stringify(state))
        backState.ARTICLE_LIST.push(action.value)
        return backState
    }
    // 更新全局文章列表
    if (action.type === 'updateArticleList') {
        // let backState = JSON.parse(JSON.stringify(state))
        state.ARTICLE_LIST = action.value
        return state
    }
    // 更改全局pageConfig
    // NextPage
    if (action.type === 'nextPage') {
        let pc =  state.PAGE_CONFIG
        let backState = JSON.parse(JSON.stringify(state))
        state.PAGE_CONFIG.pageNum += 1
        return backState.ARTICLE_LIST.slice(pc.pageNum*pc.pageSize, pc.pageNum*pc.pageSize+pc.pageNum)
    }

    // PrevPage
    if (action.type === 'prevPage') {
        let pc =  state.PAGE_CONFIG
        let backState = JSON.parse(JSON.stringify(state))
        state.PAGE_CONFIG.pageNum > 1 && (state.PAGE_CONFIG.pageNum -= 1)
        return backState.ARTICLE_LIST.slice(pc.pageNum*pc.pageSize, pc.pageNum*pc.pageSize+pc.pageNum)
    }
    // resetPage
    if (action.type === 'resetPage') {
        state.PAGE_CONFIG = {
            pageSize: 20,
            pageNum: 1,
            totalNumber: 500
        }
    }
    // getNumberdPage
    if (action.type === 'getPartialItems') {
        let pc =  state.PAGE_CONFIG
        let backState = JSON.parse(JSON.stringify(state))
        backState.ARTICLE_LIST = backState.ARTICLE_LIST.slice(pc.pageNum*pc.pageSize, pc.pageNum*pc.pageSize+pc.pageSize)
        console.log(backState.ARTICLE_LIST, 'BACK STATE');
        console.log('counted:', pc.pageNum*pc.pageSize, pc.pageNum*pc.pageSize+pc.pageNum);
        fetchItems(backState.ARTICLE_LIST).then(result => {
            backState.ARTICLE_LIST = result
        })
        return backState
    }

    return state
}
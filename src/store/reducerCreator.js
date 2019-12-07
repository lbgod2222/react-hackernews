import * as actTypes from "./reducerTypes"


// 构造Action
export function addArticleItem(value) {
    return {
        type: actTypes.ARTICLE_LIST_ADD_ITEM,
        value: value
    }
}
export function updateArticleList(value) {
    return {
        type: actTypes.ARTICLE_LIST_UPDATE,
        value: value
    }
}
export function getPartialArticleList() {
    return {
        type: actTypes.ARTICLE_PARTIAL,
    }
}

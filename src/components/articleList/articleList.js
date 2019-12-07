import React from 'react';
import s from "./articleList.less";
import Listitem from "@/components/listItem/listItem.js";
import store from "@/store";
import { updateArticleList, getPartialArticleList } from "@/store/reducerCreator";
import { connect } from "react-redux";
import { fetchIdsByType, fetchItems } from "@/api";

// 代主体组织
class Articlelist extends React.Component {
    constructor (props) {
        super(props)
        console.log(store.getState());
        // this.tempAddList = this.tempAddList.bind(this)
        // this.storeChange = this.storeChange.bind(this)
        // store.subscribe(this.storeChange)
        // this.state = store.getState();
        this.state = {
            useless: true,
            articleList: []
            // pageConfig
        }
    }

    // Mounted
    componentDidMount() {
        fetchIdsByType('top').then(result => {
            // save data to reducer
            this.props.updateArticleList(result)
            let initPartial = this.props.getPartialArticleList()
            console.log(initPartial, 'asfgds');
            this.setState({
                articleList: initPartial
            })
            
            // this.props.getPartialArticleList()
            // fetchItems(result.slice(0,30)).then(resultInner => {
            //     console.log(resultInner, 'trying get data');
            // })
        })
        
    }

    // methods:
    // storeChange () {
        // 这里观察触发的方法只是出发了重渲染
        // this.setState({useless: false})
        // this.setState(store.getState())
    // }
    nextPage () {
        console.log('NEXT!');
    }
    prePage () {
        console.log('PREV!');
    }


    render() {
        // 恐怕只有再能触发重新渲染的时候才起作用
        // todo:改成本地state获取
        // const articleList = store.getState().ARTICLE_LIST
        // console.log(this.props, 'afdcdsas');
        
        // store.getState()
        return (
            <div className={s.view}>
                <div className={s.list_nav}>
                    <a onClick={()=>this.prePage()}>
                        {'< prev'}
                    </a>
                    <span>1/25</span>
                    <a onClick={()=>this.nextPage()}>
                        {'next >'}
                    </a>
                </div>
                {/* <button onClick={this.props.tempAddList}>Add SOME</button> */}
                <div className={s.main_wrapper}>
                    <ul>
                        {this.props.articleList.map(e => {
                            return <Listitem item={e} key={e.title}/>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

// methods
// const tempAddList = () => {
//     return addArticleItem({
//         title: 'The second article',
//         comment: '900',
//     })
// }
const updateArticleListLocal = (val) => {
    return updateArticleList(val)
}
const getPartialArticleListLocal = () => {
    return getPartialArticleList()
}


const mapStateToProps = (state) => {
    console.log(state, 'mapStateToProps');
    
    return {
        articleList: state.ARTICLE_LIST,
        pageConfig: state.PAGE_CONFIG
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // tempAddList: () => dispatch(tempAddList()),
        updateArticleList: (val) => dispatch(updateArticleListLocal(val)),
        getPartialArticleList: () => dispatch(getPartialArticleListLocal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articlelist);
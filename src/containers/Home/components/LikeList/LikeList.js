/**
 * Class:
 * Author: wufei
 * Date: 2019/5/23
 * Description: 列表
 *  使用监听器 首页列表监听页面的滚动时间
 */
import React, {Component} from 'react'
import LikeItem from './LikeItem/LikeItem'
import Loading from '../../../../components/Loading/LoadingMask'
import './style.less'

export default class LikeList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.removeListener = false
    }

    componentDidMount() {
        if (this.props.pageCount < 3) {
            document.addEventListener("scroll", this.handleScroll)
            this.props.fetchData()
        }
    }


    componentDidUpdate() {
        if (this.props.pageCount >= 3 && !this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll)
            this.removeListener = true;
        }
    }

    componentWillUnmount() {
        if (!this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll)
        }
    }

    // 处理屏幕滚动事件，实现加载更多的效果
    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const screenHeight = document.documentElement.clientHeight;
        const likeListTop = this.myRef.current.offsetTop;
        const likeListHeight = this.myRef.current.offsetHeight;
        if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
            this.props.fetchData()
        }
    }


    render() {
        const {data, pageCount} = this.props
        return (
            <div ref={this.myRef} className={'likeList'}>
                <div className={'likeList__header'}>列表demo</div>
                <div className={'likeList__list'}>
                    {data.map((item) => {
                        return (
                            <LikeItem key={item.id} item={item}/>
                        )
                    })}
                </div>
                {pageCount < 3 ? (
                    <Loading/>
                ) : (
                    <a className={'likeList__viewAll'} href='/'>
                        查看更多
                    </a>
                )}
            </div>
        )
    }
}    

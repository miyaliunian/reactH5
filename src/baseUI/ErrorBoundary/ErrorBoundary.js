import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {NoMatchWrapper} from './style'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    /**
     *  当捕捉到错误时，使得在更新视图之前有机会更新 state
     * @param error  error 具体的 JavaScript 异常
     * @returns {{hasError: boolean}}
     */
    static getDerivedStateFromError(error) {
        // 当捕捉到错误的时候，返回跟新 this.state
        return {hasError: true};
    }


    /**
     *  错误被捕捉完成
     * @param error  具体的 JavaScript 异常
     * @param info  一个记录着错误信息是从哪个组件里抛出来的对象。里面包含一些关键的信息。
     */
    componentDidCatch(error, info) {
        // 可以在这里记录组件的错误信息
        console.log('**********ErrorBoundary:error')
        console.log(error)
        console.log('**********ErrorBoundary:info')
        console.log(info)
    }

    render() {
        if (this.state.hasError) {
            //当错误发生时 显示这部分内容
            return (
                <NoMatchWrapper>
                    <div className="img-wrapper">
                        <img className="bg" src="https://b-gold-cdn.xitu.io/v3/static/img/bg.1f516b3.png" alt=""/>
                        <img className="panfish" src="https://b-gold-cdn.xitu.io/v3/static/img/panfish.9be67f5.png"
                             alt=""/>
                        <img className="sea" src="https://b-gold-cdn.xitu.io/v3/static/img/sea.892cf5d.png" alt=""/>
                        <img className="spray" src="https://b-gold-cdn.xitu.io/v3/static/img/spray.bc638d2.png" alt=""/>
                    </div>
                    <div className="link-wrapper">
                        <Link to="/" className="link">回到首页</Link>
                    </div>
                </NoMatchWrapper>
            )
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }


    }
}

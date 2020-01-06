/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//没封装之前
import Bscroll from 'better-scroll'
import './style.less'
import { withRouter } from 'react-router-dom'
//图标
import icon_sj from '@assets/images/Home/三甲图标IOS.png'
import icon_bg from '@assets/images/Home/报告图标IOS.png'
import icon_zh from '@assets/images/Home/综合图标IOS.png'
import icon_yy from '@assets/images/Home/预约图标IOS.png'
import EntryLoader from '@components/entryLoader'

class HospitalsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowRefreshHeader: false
    }
  }

  componentDidMount() {
    this.bscroll = new Bscroll(this.refs.hospitalsItem, {
      mouseWheel: true,
      probeType: 3,
      click: true,
      tap: true,
      pullDownRefresh: {
        threshold: 30,
        stop: 20
      },
      pullUpLoad: {
        threshold: 80
      },
      bounce: {
        top: true,
        bottom: true
      }
    })
    this.bscroll.on('pullingDown', this.pullingDownHandler)
    this.bscroll.on('pullingUp', this.props.pullingUpHandler)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLastPage) {
      this.bscroll.finishPullUp()
    }
    setTimeout(() => {
      if (!this.props.fetchingStatus) {
        this.setState({
          isShowRefreshHeader: false
        })
        this.bscroll.finishPullDown()
      }
    }, 200)
  }

  render() {
    const { data, isLastPage } = this.props
    return (
      <ul className={'hospitalsItem'} ref={'hospitalsItem'}>
        <div>
          {data.map((item, index) => {
            return (
              <Link to={`/division/${item.id}/${item.name}`} key={index}>
                <li className="hospitalsItem__con border-bottom">
                  <div className="hospitalsItem__title">{item.name}</div>
                  <div className="hospitalsItem__middle">
                    <div className={'hospitalsItem__middle__item'}>
                      <img src={icon_sj} alt="" className={'hospitalsItem__middle__icon'} />
                      <span className={'hospitalsItem__middle__innerTxt'}>{item.hosGradeShortName}</span>
                    </div>
                    <div className={'hospitalsItem__middle__item'}>
                      <img src={icon_zh} alt="" className={'hospitalsItem__middle__icon'} />
                      <span className={'hospitalsItem__middle__innerTxt'}>{item.hosCategory}</span>
                    </div>
                    {item.regOpened ? (
                      <div className={'hospitalsItem__middle__item'}>
                        <img src={icon_yy} alt="/" className={'hospitalsItem__middle__icon'} />
                        <span className={'hospitalsItem__middle__innerTxt'}>可预约</span>
                      </div>
                    ) : null}
                    {item.reportOpened ? (
                      <div className={'hospitalsItem__middle__item'}>
                        <img src={icon_bg} className={'hospitalsItem__middle__icon'} alt="" />
                        <span className={'hospitalsItem__middle__innerTxt'}>查报告</span>
                      </div>
                    ) : null}
                  </div>
                  <div className="hospitalsItem__address">地址：{item.address}</div>
                </li>
              </Link>
            )
          })}
        </div>
      </ul>
    )
  }

  navPage(item) {
    let data = item
    let path = {
      pathname: 'clinic',
      state: data
    }
    this.props.history.push(path)
  }

  pullingDownHandler = () => {
    // this.setState({
    //   isShowRefreshHeader: true
    // })

    console.log(this.refs.hospitalsItem.offset)
    return
    this.props.pullingDownHandler()
  }
}

export default withRouter(HospitalsItem)
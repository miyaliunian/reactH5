/**
 * 医保动态列表中的信息项
 * by WF 20191217
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//没封装之前
import './style.less'
import { withRouter } from 'react-router-dom'
//图标

class InfoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowRefreshHeader: false
    }
  }

  componentDidMount() {}

  render() {
    const { data, isLastPage } = this.props
    return (
      <ul className={'infoItems'}>
        <div>
          {data.map((item, index) => {
            return (
              <a href={item.linkUrl ? `${item.linkUrl}` : ''} key={index}>
                <li className="infoItem_li border-bottom">
                  <div className="infoItem_img_con">
                    <img src={`${item.imgUrl}`} className={'infoItem_img'} />
                  </div>
                  <div className="infoItem_msg_con">
                    <div className="infoItem_msg_title">{item.title}</div>
                    <div className="infoItem_msg_content">{item.content}</div>
                    <div className="infoItem_msg_datetime">{item.modifyDate}</div>
                  </div>
                </li>
              </a>
            )
          })}
        </div>
      </ul>
    )
  }
}

export default withRouter(InfoItem)

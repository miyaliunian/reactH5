/**
 * Class: PopUpDemo
 * Author: wufei
 * Date: 2019/7/7
 * Description:
 *
 */
import React, {Component} from 'react'
import {Icon, Modal, List, Button, Checkbox} from 'antd-mobile'
import './style.less'

const timeInterval = [
    {
        "id": "2c9f82076b9b9590016ba15a031d4031",
        "scheduleId": 27841,
        "beginTime": "07:45",
        "endTime": "11:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4032",
        "scheduleId": 27841,
        "beginTime": "08:45",
        "endTime": "12:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4033",
        "scheduleId": 27841,
        "beginTime": "09:45",
        "endTime": "13:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4031",
        "scheduleId": 27841,
        "beginTime": "07:45",
        "endTime": "11:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4032",
        "scheduleId": 27841,
        "beginTime": "08:45",
        "endTime": "12:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4033",
        "scheduleId": 27841,
        "beginTime": "09:45",
        "endTime": "13:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    },
    {
        "id": "2c9f82076b9b9590016ba15a031d4034",
        "scheduleId": 27841,
        "beginTime": "10:45",
        "endTime": "14:30",
        "regLmt": 9999,
        "reged": 0,
        "createDate": 1561780117000,
        "modifyDate": 1561780117000,
        "hisId": "10002173621"
    }

]
export default class PopUpDemo extends Component {
    render() {
        return (
            <div>
                <Modal
                    popup
                    visible={true}
                    title={'预约信息'}
                    animationType="slide-up"
                    maskClosable={false}
                    wrapProps={{onTouchStart: this.onWrapTouchStart}}
                    footer={[{
                        text: '取消', onPress: () => {
                            console.log('ok')
                        }
                    }, {
                        text: '确定', onPress: () => {
                            console.log('ok')
                        }
                    }]}
                >
                    <div style={{height: 200}}>
                        <List className={'modalList'}>
                            {timeInterval.map(item => {
                                return <List.Item
                                    className={'border-bottom'}>
                                    <div className={'modalList__item'}>
                                        <Checkbox.CheckboxItem>{item.beginTime} - {item.endTime}</Checkbox.CheckboxItem>
                                    </div>
                                </List.Item>
                            })}
                        </List>
                    </div>
                </Modal>
            </div>
        )
    }
}    

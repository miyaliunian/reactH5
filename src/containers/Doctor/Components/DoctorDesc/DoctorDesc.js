 /**
  * Class: DoctorDesc
  * Author: wufei
  * Date: 2019/6/25
  * Description:
  *
  */
import React, { useRef, useCallback } from "react";
import "./style.less";

export default function DoctorDesc(props) {
  const { introduction, skills } = props;
  const arrowRef = useRef();
  const infoContainerRef = useRef();
  const infoRef = useRef();
  let infoExpand = false; //展开或隐藏全部信息

  const toggle = useCallback(() => {
    const arrowDOM = arrowRef.current;
    const infoContainerDOM = infoContainerRef.current;
    const infoDOM = infoRef.current;
    console.log(infoContainerDOM.style.height)
    if (infoExpand === false) {
      infoContainerDOM.style.height = infoDOM.offsetHeight + 70 + "px";
      arrowDOM.classList.add("arrow-rotate");
      infoExpand = true;
    } else {
      infoContainerDOM.style.height = null
      arrowDOM.classList.remove("arrow-rotate");
      infoExpand = false;
    }
  }, []);


  return (
    <div className={"doctorDesc_container border-top"} ref={infoContainerRef}>
      <div className={"doctorDesc__title"}>医生简介</div>
      <div className={"doctorDesc_info_wrapper"} ref={infoRef}>
        <span className={"doctorDesc__experience__goodAt"}>
          经历: {introduction ? introduction : "暂无"}
        </span>
        <span className={"doctorDesc__experience__goodAt"}>
          擅长: {skills ? skills : "暂无"}
        </span>
      </div>
      <span className="iconfont icon-arrow" onClick={toggle} ref={arrowRef}>
      &#xe628;
      </span>
    </div>
  );
}

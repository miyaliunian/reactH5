/**
 * Class: index
 * Author: wufei
 * Date: 2019/9/19
 * Description:
 *  高阶组件
 */
import React from "react";

export default function pureWrapper(Component) {
  return class extends React.PureComponent {
    render() {
      return <Component {...this.props} />;
    }
  };
}

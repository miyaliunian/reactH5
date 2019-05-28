/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:  详情页列表
 *
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ProductOverview from "./components/ProductOverview/ProductOverview";
import ShopInfo from "./components/ShopInfo/ShopInfo";
import Detail from "./components/Detail/Detail";
import Remark from "./components/Remark/Remark";
import BuyButton from "./components/BuyButton/BuyButton";
import Header from "../../components/Header/Header";


import {actions as detailActions, getProduct, getRelatedShop} from '../../reduxs/modules/detail'

class ProductDetailContainer extends Component {

    render() {

        const {product} = this.props
        return (
            <div>
                <Header title={'标题'} onBack={this.handleBack} grey/>
                <ProductOverview data={product}/>
                <ShopInfo/>
                <Detail/>
                <Remark/>
                <BuyButton/>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }


    componentDidMount() {
        const {product} = this.props
        if (!product) {
            const productId = this.props.match.params.id
            this.props.detailActions.loadProductDetail(productId)
        } else if (!this.props.relatedShop) {
            this.props.detailActions.loadShopById(product.nearestShop)
        }
    }


    componentDidUpdate(preProps) {
        //第一次获取到产品详情
        if (!preProps.product && this.props.product) {
            this.props.detailActions.loadShopById(this.props.product.nearestShop)
        }
    }
}


const mapStateToProps = (state, props) => {
    const productId = props.match.params.id
    return {
        product: getProduct(state, productId),
        // relatedShop: getRelatedShop(state, productId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        detailActions: bindActionCreators(detailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer)
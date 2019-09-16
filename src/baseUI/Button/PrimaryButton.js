/**
 * Class: ButtonWrapper
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, {Component} from 'react'
import PropTypes from "prop-types";
import './style.less'
import {Button} from '@material-ui/core';

// export default class PrimaryButton extends Component {
//
//     static propTypes = {
//         txt: PropTypes.string.isRequired,
//         onSubmit: PropTypes.func.isRequired
//     }
//
//     render() {
//         const {txt, onSubmit} = this.props
//         return (
//             <div className={'form__btnContainer'}>
//                 <button className={'form__btn'} onClick={onSubmit}>{txt}</button>
//             </div>
//         )
//     }
// }



import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

export default function PrimaryButton(props) {
    const classes = useStyles();
    const {txt, onSubmit} = props
    return (
        <div className={'form__btnContainer'}>
            <Button fullWidth={true} variant="contained" onClick={onSubmit} color="primary" className={classes.button}>
                {txt}
            </Button>
        </div>

    )
}
import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}><FontAwesome name="times"/></button>
        const minusOneFishButton = <button onClick={() => this.props.minusOneFish(key)}><FontAwesome name="minus"/></button>
        const addOneFishButton = <button onClick={() => this.props.addOneFish(key)}><FontAwesome name="plus"/></button>

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>
        }

        if (count > 1) {
            return(
                <li key={key}>
                    <span>
                        <CSSTransitionGroup
                            component="span"
                            className="count"
                            transitionName="count"
                            transitionEnterTimeout={250}
                            transitionLeaveTimeout={250}
                        >
                            <span key={count}>{count}</span>
                        </CSSTransitionGroup>

                        lbs {fish.name} {removeButton} {addOneFishButton} {minusOneFishButton}
                    </span>
                    <span className="price">{formatPrice(count * fish.price)}</span>
                </li>
            )
        } else {
            return(
                <li key={key}>
                    <span>
                        <CSSTransitionGroup
                            component="span"
                            className="count"
                            transitionName="count"
                            transitionEnterTimeout={250}
                            transitionLeaveTimeout={250}
                        >
                            <span key={count}>{count}</span>
                        </CSSTransitionGroup>

                        lbs {fish.name} {removeButton} {addOneFishButton}
                    </span>
                    <span className="price">{formatPrice(count * fish.price)}</span>
                </li>
            )
        }
    }
    render () {
        // mkaing an array from all the properties of order obj
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }
            return prevTotal;
        }, 0);
        //0 is for starting value of reduce
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <CSSTransitionGroup
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={5000}
                    transitionLeaveTimeout={5000}
                >
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Order;

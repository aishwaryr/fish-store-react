import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        //getInitialState
        this.state = {
            fishes: {},
            order: {}
        }
    }

    // Component Lifecycle methods for persisting state

    componentWillMount() {
        // this runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
        {
            context: this,
            state: 'fishes'
        });

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            // update our App Component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }
    // End of Component Lifecycle methods

    addFish(fish) {
        //update our state
        const fishes = {...this.state.fishes};
        //add in our new passes fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //set state
        this.setState({ fishes });
        // this.setState({ fishes: fishes }); abv line means same as this in ES6
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        // take a copy of state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update our state
        this.setState({order});
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {/* Here we're repeating the li using map
                            .keys is to turn the fishes object into an array
                            Then map returns each fish by rendering Fish which has a key to
                            make each fish unique */}
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                                // We're passing key twice;key is for react;index is
                                // for us to access in fish comp
                        }
                    </ul>
                </div>
                {/* Only passing what we need in order comp instead of whole state */}
                <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;

import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        //getInitialState
        this.state = {
            fishes: {},
            order: {}
        }
    }

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
                                .map(key => <Fish key={key} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;

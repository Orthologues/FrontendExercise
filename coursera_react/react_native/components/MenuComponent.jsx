import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu',
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    };

    render() {
        const renderMenuItem = ({item, index}) => {
            const { navigate } = this.props.navigation;
            return (
                <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => navigate('DishDetail', { dishId: item.id })}
                leftAvatar={{ source: require('./images/uthappizza.png')}}
                />
            );
        }

        return (
            <FlatList 
              data={this.state.dishes}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id.toString()}
            />
        );
    }

}

export default Menu;
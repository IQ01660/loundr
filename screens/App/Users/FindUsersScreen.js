import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, FlatList, Text } from 'react-native';

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';

//firebase imports
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

//components
import SearchInput from '../../../components/SearchInput';
import SearchButton from '../../../components/SearchButton';

class FindUsersScreen extends Component {
	state = {
		isSearching: false,
		searchValue: '',
		searchedUsers: [],
	};

	onChangeSearch = async (text) => {
		await this.setState({
            searchValue: text,
            searchedUsers: [],
        });
        
        if (!text)
        {
            return;
        }

		//taking a list of searched users from db
        //and putting them into seachedUsers array
        let usersList = [];
        return firebase
			.database()
			.ref('usersPublic')
			.orderByChild('username')
			.once('value')
			.then((users) => {
				users.forEach((user) => {
					if (user.val().username.includes(this.state.searchValue)) {
                        usersList.push({...user.val(), id: user.key});
					}
				});
            })
            .then(() => (
                this.setState({
                    searchedUsers: usersList,
                })
            ));
	};

	onCancel = () => {
		Keyboard.dismiss();
		this.setState({
			searchValue: '',
			searchedUsers: [],
		});
	};

	onSearchBlur = () => {
		this.setState({
			isSearching: false,
		});
	};

	onSearchFocus = () => {
		this.setState({
			isSearching: true,
		});
	};

	render() {
		return (
			<View style={styles.screen}>
				<View style={styles.topBar}>
					<View style={styles.searchBar}>
						<SearchInput
							value={this.state.searchValue}
							onChangeText={this.onChangeSearch}
							onBlur={this.onSearchBlur}
							onFocus={this.onSearchFocus}
						/>
					</View>
					{this.state.isSearching ? (
						<View style={styles.cancelBar}>
							<SearchButton title="Cancel" onPress={this.onCancel} />
						</View>
					) : null}
				</View>
				<FlatList
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
					data={this.state.searchedUsers}
					renderItem={({ item }) => {
						return (<Text>{item.username}</Text>);
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		//backgroundColor: 'yellow',
	},
	topBar: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchBar: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	cancelBar: {
		paddingRight: 10,
	},
});

export default FindUsersScreen;

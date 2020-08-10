import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, FlatList, Platform } from 'react-native';

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';
const AVATAR_DEFAULT_SOURCE = '../../../assets/avatar.jpg';

//firebase imports
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

//components
import SearchInput from '../../../components/SearchInput';
import SearchButton from '../../../components/SearchButton';
import UserButton from '../../../components/Users/UserButton';

class FindUsersScreen extends Component {
	state = {
		isSearching: false,
		searchValue: '',
		searchedUsers: [], // contains objects of form {displayName, email, phoneNumber, username, id (same as uid)}, photoUrl (of the profile photo)
	};

	onChangeSearch = async (text) => {
		await this.setState({
			searchValue: text,
			searchedUsers: [],
		});

		if (!text) {
			return;
		}

		//taking a list of searched users from db
		//and putting them into seachedUsers array
		let usersList = [];
		await firebase
			.database()
			.ref('usersPublic')
			.orderByChild('username')
			.once('value')
			.then((users) => {
				users.forEach((user) => {
                    if (user.val().username.includes(this.state.searchValue) && 
                        user.key !== firebase.auth().currentUser.uid) 
                    {
                        usersList.push({ ...user.val(), id: user.key });
					}
				});
			})
			.then(() =>
				this.setState({
					searchedUsers: usersList,
				})
			);
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
						return (
                            <UserButton
                                source={item.photoUrl ? { uri: item.photoUrl } : require(AVATAR_DEFAULT_SOURCE)}
                                username={item.username}
                                uid={item.id}
                                displayName={item.displayName}
                                onPress={() => {
                                    this.props.navigation.navigate('SendMoney', {
                                        displayName: item.displayName,
                                        uid: item.id,
                                    });
                                }}
                            />
						);
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

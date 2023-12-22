import { StyleSheet, ScrollView, Text, TextInput, Alert, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Checkbox } from 'react-native-paper';
import { createTable, getUserInfo, insertUserInfo, updateUserInfo } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

export default function ProfileScreen({navigation, route}) {

    const isFirst = route.params;
    const[email, onChangeEmail] = useState('');
    const[phone, onChangePhone] = useState('');
    const[firstName, onChangeFirstName] = useState('');
    const[lastName, onChangeLastName] = useState('');
    const[offer, onChangeOffer] = useState('false');
    const[notifications, onChangeNotifications] = useState('false');

    useEffect(() => {
        (async () => {
          try {
            
            let mail = await AsyncStorage.getItem('email');
            let num = await AsyncStorage.getItem('phone');
            onChangeEmail(mail);
            onChangePhone(num);
            console.log(mail);
            await createTable();
            let userInfo = await getUserInfo(mail);
            // Object.keys(userInfo[0]).forEach((prop)=> console.log(prop));
            if(userInfo.length) {
                userInfo.map((item) => {
                    console.log(`====item==== ${item.email} = ${item.phonenumber} = ${item.firstname} = ${item.offer}`);
                    onChangeEmail(item.email);
                    onChangePhone(item.phonenumber);
                    onChangeFirstName(item.firstname);
                    onChangeLastName(item.lastname);
                    onChangeOffer((item.offer == 0) ? false : true);
                    onChangeNotifications((item.notification == 0) ? false : true);
                });
            }
            else {
                console.log(`+++++EMPTY+++++ ${userInfo.length}`);
            }
            
          } catch (e) {
            // Handle error
            console.log("profileRead: ==> ", e.message);
            Alert.alert(e.message);
          }
        })();
    }, []);

    const clearAndNavigate = async () => {
        await AsyncStorage.multiSet([['isLoggedIn', String(false)], ['email', String("")], ['phone', String("")]]);
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
    }

    const saveAndNavigate = () => {
        const offerInt = offer ? 1 : 0;
        const notificationInt = notifications ? 1 : 0;
        const userInformation = {email: `${email}`, phonenumber: `${phone}`,
        firstName: `${firstName}`, lastName: `${lastName}`, offer: offerInt, notification: notificationInt};
        updateUserInfo(userInformation);
        if (isFirst)
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}]
            });
        else {
            navigation.goBack();
        }
    }

    return (
        <ScrollView style={profileStyles.container} keyboardDismissMode='on-drag'>

            <Text style={profileStyles.labelHeader}>
                Personal Information
            </Text>

            <Text style={profileStyles.inputLabel}>
                Email
            </Text>
            <TextInput 
                style={profileStyles.input}
                placeholder='Enter your Email'
                onChangeText={onChangeEmail}
                value={email}
                editable={false}
                selectTextOnFocus={false} />

            <Text style={profileStyles.inputLabel}>
                Phone 
            </Text>
            <TextInput
                style={profileStyles.input}
                placeholder='Enter your Phone Number'
                onChangeText={onChangePhone}
                value={phone} />

            <Text style={profileStyles.inputLabel}>
                First Name 
            </Text>
            <TextInput
                style={profileStyles.input}
                placeholder='First Name'
                onChangeText={onChangeFirstName}
                value={firstName} />

            <Text style={profileStyles.inputLabel}>
                Last Name
            </Text>
            <TextInput
                style={profileStyles.input}
                placeholder='Last Name'
                onChangeText={onChangeLastName}
                value={lastName} />

            <Text style={profileStyles.inputLabel}>
                Email Notifications
            </Text>
            <View style={profileStyles.checkboxContainer}>
                <Checkbox 
                    style={profileStyles.checkbox}
                    color='#495E57'
                    status={offer ? 'checked' : 'unchecked'}
                    onPress={() => {
                        onChangeOffer(!offer)
                    }} />
                <Text style={profileStyles.cbLabel}>
                    Offer Updates
                </Text>
            </View>
            <View style={profileStyles.checkboxContainer}>
                <Checkbox 
                    style={profileStyles.checkbox}
                    color='#495E57'
                    status={notifications ? 'checked' : 'unchecked'}
                    onPress={() => {
                        onChangeNotifications(!notifications)
                    }} />
                <Text style={profileStyles.cbLabel}>
                    Notifications
                </Text>
            </View>
            
            <View style={{flexDirection:'row', alignSelf: 'center'}}>
                <Button 
                    mode='contained'
                    style={profileStyles.button}
                    buttonColor='#F4CE14'
                    onPress={saveAndNavigate}>
                        Save
                </Button>
                <Button 
                    mode='contained'
                    style={profileStyles.button}
                    buttonColor='#F4CE14'
                    onPress={clearAndNavigate}>
                        Logout
                </Button>
            </View>

        </ScrollView>
    );
}

const profileStyles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    labelHeader: {
        color: '#495E57',
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    inputLabel: {
        marginTop: 16,
        marginHorizontal: 16,
        fontSize: 18,
        fontWeight: '400',
    },
    input: {
        flexDirection: 'column',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#e0e0e0',
        borderBottomColor: '#495E57',
        borderBottomWidth: 1,
        borderRadius: 8,
    },
    button: {
        margin: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginHorizontal: 8,
    },
    checkbox: {
        
    },
    cbLabel: {
        marginVertical: 8,
        fontSize: 16,
        fontWeight: '400',
    },
});
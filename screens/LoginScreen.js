import { StyleSheet, ScrollView, Text, TextInput, Pressable, Alert, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import HeroImage from '../assets/login_hero.png';
import { Button } from 'react-native-paper';
import { validateEmail, validatePhone } from '../utils/utils';
import { createTable, getUserInfo, insertUserInfo, updateUserInfo } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';

//navigation.dispatch(StackActions.replace("Home")

const LoginScreen = ({ navigation }) => {

    const[email, onChangeEmail] = useState('');
    const[phone, onChangePhone] = useState('');

    useEffect(() => {
        (async () => {
          try {
            await createTable();
            let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}]
                });
            }
          } catch (e) {
            // Handle error
            Alert.alert(e.message);
          }
        })();
    }, []);

    const isValidInput = validateEmail(email) && validatePhone(phone);

    const isFirstLogin = async() => {
        try {
            let matchedUser = await getUserInfo(email);
            await AsyncStorage.multiSet([['isLoggedIn', String(true)], ['email', String(email)], ['phone', String(phone)]]);
            const userInformation = {email: `${email}`, phonenumber: `${phone}`, 
            firstName: '', lastName: '', offer: 0, notification: 0};
            if (matchedUser.length <= 0) insertUserInfo(userInformation);
            var targetDestination = (matchedUser.length > 0) ? "Home" : "Profile";
                navigation.dispatch(
                StackActions.replace(targetDestination, {isFirst: true}))
        }
        catch(error) {
            console.log("sqlerr: ===> ", error.message);
            Alert.alert(error.message);
        }
    } 

    return (
        <ScrollView style={loginStyles.container} keyboardDismissMode='on-drag'>
            <View style={{backgroundColor: '#333333', padding: 16, marginBottom: 16}}>
                <Text style={loginStyles.labelHeader}>
                    Welcome to Little Lemon
                </Text>
                <Text style={loginStyles.labelLocation}>
                    Bangalore
                </Text>
                <View style={loginStyles.subContainer}>
                    <Text style={loginStyles.descriptionLabel}>We are serving authentic Indian food with traditional recipes.</Text>
                    <Image style={loginStyles.bannerImage} source={HeroImage} resizeMode='cover' />
                </View>
            </View>

            <Text style={loginStyles.inputLabel}>
                Email
            </Text>
            <TextInput 
                style={loginStyles.input}
                placeholder='Enter your Email'
                onChangeText={onChangeEmail}
                value={email} />

            <Text style={loginStyles.inputLabel}>
                Phone 
            </Text>
            <TextInput
                style={loginStyles.input}
                placeholder='Enter your Phone Number'
                onChangeText={onChangePhone}
                value={phone} />
            
            <View style={{alignItems: 'center'}}>
                <Button 
                    disabled={!isValidInput}
                    mode='contained'
                    style={loginStyles.button}
                    buttonColor='#F4CE14'
                    onPress={isFirstLogin}>
                        Next
                </Button>
            </View>

        </ScrollView>
    );
}

export default LoginScreen;

const loginStyles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    labelHeader: {
        color: '#F4CE14',
        textAlign:'left',
        fontSize: 32,
        fontWeight: 'bold',
    },
    labelLocation: {
        color: '#F4CE14',
        textAlign: 'left',
        fontSize: 24,
        fontWeight: '500'
    },
    subContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    descriptionLabel:{
        flex: 0.5,
        color: 'white',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '400',
        alignSelf: 'center',
    },
    bannerImage: {
        flex: 0.5,
        height: 130,
        borderRadius: 16,
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
        marginVertical: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={loginStyles.container}>
            <View style={loginStyles.buttonContainer}>
                <Pressable onPress={() => navigation.dispatch(StackActions.replace("Home"))}>
                    <Text style={loginStyles.button}>Newsletter</Text>
                </Pressable>
            </View>

        </View>
    );
}

export default LoginScreen;

const loginStyles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
      },
      buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
      },
      button: {
        backgroundColor: '#05691c',
        color: 'white',
        marginHorizontal: 20,
        marginBottom: 8,
        paddingVertical: 20,
        textAlign: 'center',
        fontSize: 20,
        borderBottomWidth: 2,
      },
});
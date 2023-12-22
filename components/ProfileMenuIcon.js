import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import profileLogo from '../assets/account.png';
import { useNavigation } from '@react-navigation/native';

 const ProfileMenuIcon =  () => {

    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("Profile", {isFirst: false})}>
                <Image style={profileLogoStyles.logoImage} source={profileLogo} resizeMode='contain' /> 
            </TouchableOpacity>
        </View>
    );
}

export default ProfileMenuIcon;

const profileLogoStyles = StyleSheet.create( {
    logoImage: {
        width: 32,
        height: 32,
        alignSelf: 'center'
      },
});
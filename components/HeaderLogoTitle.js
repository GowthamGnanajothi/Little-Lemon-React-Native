import { View, Image, StyleSheet } from 'react-native';
import titleLogo from '../assets/title-logo.png';

 const HeaderLogoTitle =  () => {
    return (
        <View>
            <Image style={titleLogoStyles.logoImage} source={titleLogo} resizeMode='contain' /> 
        </View>
    );
}

export default HeaderLogoTitle;

const titleLogoStyles = StyleSheet.create( {
    logoImage: {
        width: 120,
        height: 70,
        alignSelf: 'center',
      },
});
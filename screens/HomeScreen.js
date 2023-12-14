import { View, StyleSheet, Text, Image } from 'react-native';
import HeroImage from '../assets/hero_image.png';
import { Searchbar } from 'react-native-paper';

export default function HomeScreen() {
    return (
        <View style={homeScreenStyles.homeScreenContainer}>
            <View style={homeScreenStyles.heroSectionContainer}>
                <Text style={heroSectionStyles.labelHeader}>
                    Little Lemon
                </Text>
                <Text style={heroSectionStyles.labelLocation}>
                    Bangalore
                </Text>
                <View style={heroSectionStyles.subContainer}>
                    <Text style={heroSectionStyles.descriptionLabel}>We are serving authentic Indian food with traditional recipes.</Text>
                    <Image style={heroSectionStyles.bannerImage} source={HeroImage} resizeMode='cover' />
                </View>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor="white"
                    style={heroSectionStyles.searchBar}
                    iconColor="white"
                    inputStyle={{ color: 'white' }}
                    elevation={0}
                />
            </View>
        </View>
    );
}

const homeScreenStyles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
    },
    heroSectionContainer: {
        flex: 0.42,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#333333',
        padding: 20,
    },
});

const heroSectionStyles = StyleSheet.create( {
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
    searchBar: {
        marginTop: 12,
        backgroundColor: '#495E57',
        shadowRadius: 0,
        shadowOpacity: 0,
      },
});
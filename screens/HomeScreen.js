import { View, StyleSheet, Text, Image, SectionList, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import HeroImage from '../assets/hero_image.png';
import { Searchbar } from 'react-native-paper';
import { useEffect, useState, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
  } from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils/utils';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
const sections = ['Appetizers', 'Salads', 'Beverages'];

const Item = ({ title, price }) => (
    <View style={filterSectionStyles.item}>
      <Text style={filterSectionStyles.title}>{title}</Text>
      <Text style={filterSectionStyles.title}>${price}</Text>
    </View>
  );

export default function HomeScreen() {
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    const fetchData = async() => {
        // Implement this function
    
        // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
        // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
        // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,
    
        try {
          const response = await fetch(API_URL);
          const json = await response.json();
          const transformedData = json.menu.map((item) => {
            return {
              id: item.id,
              price: item.price,
              title: item.title,
              category: item.category.title,
            }
          });
    
          // console.log('transformed data: ',transformedData);
          return transformedData;
        } catch (e) {
          console.error(e);
        }
    
        return [];
    }

    useEffect(() => {
        (async () => {
          try {
            await createTable();
            let menuItems = await getMenuItems();
    
            // The application only fetches the menu data once from a remote URL
            // and then stores it into a SQLite database.
            // After that, every application restart loads the menu from the database
            if (!menuItems.length) {
              const menuItems = await fetchData();
              saveMenuItems(menuItems);
            }
    
            const sectionListData = getSectionListData(menuItems);
            setData(sectionListData);
          } catch (e) {
            // Handle error
            Alert.alert(e.message);
          }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
          const activeCategories = sections.filter((s, i) => {
            // If all filters are deselected, all categories are active
            if (filterSelections.every((item) => item === false)) {
              return true;
            }
            return filterSelections[i];
          });
          try {
            const menuItems = await filterByQueryAndCategories(
              query,
              activeCategories
            );
            const sectionListData = getSectionListData(menuItems);
            setData(sectionListData);
          } catch (e) {
            console.log("sqlerr: ===> ", e.message);
            Alert.alert(e.message);
          }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);
    
    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
    
    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };
    
    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    const HeaderContent = () => (
        <View>
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
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                    style={heroSectionStyles.searchBar}
                    iconColor="white"
                    inputStyle={{ color: 'white' }}
                    elevation={0}
                />
            </View>
            <View>
                <Text style={filterSectionStyles.headerLabel}>
                    ORDER FOR DELIVERY
                </Text>
                <Filters
                    selections={filterSelections}
                    onChange={handleFiltersChange}
                    sections={sections}
                />
            </View>

        </View>
    );

    return (
        <SafeAreaView style={homeScreenStyles.homeScreenContainer}>
            <SectionList
                style={filterSectionStyles.sectionList}
                sections={data}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<HeaderContent/>}
                renderItem={({ item }) => (
                <Item title={item.title} price={item.price} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                <Text style={filterSectionStyles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

const homeScreenStyles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
    },
    heroSectionContainer: {
        backgroundColor: '#333333',
        padding: 16,
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

const filterSectionStyles = StyleSheet.create( {
    headerLabel: {
        textAlign:'left',
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    sectionList: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    header: {
        fontSize: 22,
        paddingVertical: 8,
        paddingHorizontal: 16,
        color: '#FBDABB',
        backgroundColor: '#495E57',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        color: '#333333',
        fontWeight: '400',
    }
});
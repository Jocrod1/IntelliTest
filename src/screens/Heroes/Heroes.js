import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import {AuthContext} from '../../Navigation/context';
import icDrawer from '../../assets/icons/drawer.png';
import icAddress from '../../assets/icons/address.png';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView from '../../widgets/ImageView';
import ImageButton from '../../widgets/ImageButton';
import TextView from '../../widgets/Text';
import {
  CENTER,
  INPUT,
  OVAL_BUTTON_CONTAINER,
  OVAL_BUTTON_TEXT,
} from '../../assets/styles';
import icRace from '../../assets/icons/galaxy.png';
import icPower from '../../assets/icons/thunderbolt.png';
import icSpeed from '../../assets/icons/speed.png';
import icStrength from '../../assets/icons/exercise.png';
import icIntelligence from '../../assets/icons/brain.png';
import icClose from '../../assets/icons/close.png';

const ModalPopup = props => {
  const [showModal, setShowModal] = React.useState(props.visible);
  React.useEffect(() => {
    toggleModal();
  }, [props.visible]);
  const toggleModal = () => {
    if (props.visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 20,
            elevation: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: '100%',
                height: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => props.closeModal()}>
                <Image source={icClose} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#e6e6e6',
            }}>
            <Image
              source={{uri: props.item?.images.md}}
              style={{height: 225, width: 150}}
            />
          </View>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {props.item?.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
            }}>
            {'(' + (props.item?.biography.fullName || 'N/A') + ')'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <ImageView
              style={{
                height: 27,
                width: 27,
              }}
              source={icRace}
              resizeMode="contain"
            />
            <Text style={{fontSize: 14, marginLeft: 5, fontWeight: 'bold'}}>
              {props.item?.appearance.race}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageView
                style={{
                  height: 20,
                  width: 20,
                }}
                source={icIntelligence}
                resizeMode="contain"
              />
              <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                {props.item?.powerstats.intelligence}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageView
                style={{
                  height: 20,
                  width: 20,
                }}
                source={icStrength}
                resizeMode="contain"
              />
              <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                {props.item?.powerstats.strength}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageView
                style={{
                  height: 20,
                  width: 20,
                }}
                source={icSpeed}
                resizeMode="contain"
              />
              <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                {props.item?.powerstats.speed}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageView
                style={{
                  height: 20,
                  width: 20,
                }}
                source={icPower}
                resizeMode="contain"
              />
              <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                {props.item?.powerstats.power}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

class HeroesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      Loading: false,
      loadingMore: false,
      dataSource: [],
      heroes: [],
      search: '',
      visibleModal: false,
      HeroModal: null,
    };
  }

  fetchHeroes = async () => {
    this.setState({loading: true});
    try {
      const response = await api.getHeroes();

      this.setState({
        dataSource: response,
        heroes: response.slice(0, 5),
        page: 1,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
  };

  LoadMore = async () => {
    this.setState({loading: true});

    try {
      const newPage = this.state.page + 1;

      this.setState({
        heroes: this.state.heroes.concat(
          this.state.dataSource.slice(this.state.page * 5, newPage * 5),
        ),
        page: newPage,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
  };

  componentDidMount() {
    this.fetchHeroes();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EAEAEA',
          paddingTop: 20,
          paddingHorizontal: 5,
        }}>
        <ModalPopup
          closeModal={() => this.setState({visibleModal: false})}
          visible={this.state.visibleModal}
          item={this.state.HeroModal}></ModalPopup>
        <FlatList
          nestedScrollEnabled
          style={{flex: 1}}
          data={this.state.heroes}
          extraData={this.state}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => {
            return (
              <HeroCard
                item={item}
                onPress={hero =>
                  this.setState({visibleModal: true, HeroModal: hero})
                }
              />
            );
          }}
          ListFooterComponent={() => (
            <FooterButton
              loading={this.state.Loading}
              onPress={() => this.LoadMore()}
              title="BUSCAR MAS"
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  icon: {
    width: 250,
    height: 130,
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 50,
  },
});

export default HeroesScreen;

const HeroCard = props => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.item)}
      style={{
        marginVertical: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{}}>
          {props.item?.images ? (
            <ImageView
              style={{
                height: 150,
                width: 100,
              }}
              source={{uri: props.item?.images.sm}}
              resizeMode="contain"
            />
          ) : null}
        </View>
        <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {props.item.name}
          </Text>
          <Text style={{fontSize: 13}}>
            {'(' + (props.item?.biography.fullName || 'N/A') + ')'}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <ImageView
              style={{
                height: 27,
                width: 27,
              }}
              source={icRace}
              resizeMode="contain"
            />
            <Text style={{fontSize: 14, marginLeft: 5, fontWeight: 'bold'}}>
              {props.item.appearance.race}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ImageView
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={icIntelligence}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                  {props.item.powerstats.intelligence}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ImageView
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={icStrength}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                  {props.item.powerstats.strength}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ImageView
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={icSpeed}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                  {props.item.powerstats.speed}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ImageView
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={icPower}
                  resizeMode="contain"
                />
                <Text style={{fontSize: 15, marginLeft: 2, fontWeight: 'bold'}}>
                  {props.item.powerstats.power}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FooterButton = props => {
  return props.loading ? (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 13,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        height: 50,
        width: 200,
      }}>
      <ActivityIndicator
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
        color="black"
        size="small"></ActivityIndicator>
    </View>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 13,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#19305C',
        height: 50,
        width: 200,
        borderRadius: 30,
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: 17,
          color: 'white',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

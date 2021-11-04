import React from 'react';
import { Button } from 'react-native';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
import { useNavigation } from '@react-navigation/native';

import ExampleGroup from '../../components/ExampleGroup';
import { RootStackNavigationProps } from '../../Navigator';
import { usePaidState } from '../../PaidProvider';

interface State {
  adLoaded: boolean;
  interstitialAd: InterstitialAd | null;
}

class ClassComponentExample extends React.Component<{
  navigation: RootStackNavigationProps<'Examples'>;
  isPaid: boolean;
}> {
  state: State = {
    adLoaded: false,
    interstitialAd: this.props.isPaid
      ? null
      : InterstitialAd.createAd(TestIds.INTERSTITIAL_VIDEO, {
          loadOnDismissed: true,
          requestOptions: {
            requestNonPersonalizedAdsOnly: true,
          },
        }),
  };
  componentDidMount() {
    this.state.interstitialAd?.addEventListener('adLoaded', () => {
      this.setState({ adLoaded: true });
    });
    this.state.interstitialAd?.addEventListener('adDismissed', () => {
      this.props.navigation.navigate('Second');
    });
  }
  componentWillUnmount() {
    this.state.interstitialAd?.removeAllListeners();
  }
  render() {
    return (
      <ExampleGroup title="Interstitial">
        <Button
          title="Show Interstitial Ad and move to next screen"
          disabled={!this.state.adLoaded}
          onPress={() => {
            if (this.props.isPaid) {
              this.props.navigation.navigate('Second');
            } else {
              this.state.interstitialAd?.show();
            }
          }}
        />
      </ExampleGroup>
    );
  }
}

export default function () {
  const navigation = useNavigation<RootStackNavigationProps<'Examples'>>();
  const { isPaid } = usePaidState();
  return <ClassComponentExample navigation={navigation} isPaid={isPaid} />;
}

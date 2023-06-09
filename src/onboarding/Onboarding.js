import React from 'react';
import {
    Image,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {

    const handleOnDone = () => {
        navigation.navigate('AppHome');
    };


    return (
        <Onboarding
            bottomBarColor="rgba(130,0,214,.7)"
            onSkip={() => navigation.replace("AppHome")}
            onDone={handleOnDone}
            pages={[
                {
                    backgroundColor: 'rgba(130,0,214, .4)',
                    image: <Image source={require('../../asset/image/onboarding/1.png')} style={{ width: 400, height: 300 }} />,
                    title: 'WELCOME',
                    subtitle: 'WELCOME TO THE WORLD OF JOY!',
                },
                {
                    backgroundColor: 'rgba(130,0,214, .5)',
                    image: <Image source={require('../../asset/image/onboarding/2.png')} style={{ width: 470, height: 300 }} />,
                    title: 'WHATS INSIDE',
                    subtitle: 'MUSIC VIDEO AUDIO-VIDEO-CALL AND MORE ',
                },
                {
                    backgroundColor: 'rgba(130,0,214, .6)',
                    image: <Image source={require('../../asset/image/onboarding/3.png')} style={{ width: 450, height: 300 }} />,
                    title: 'EFFORT',
                    subtitle: 'LITTLE EFFORT MAKE RICH COMMUNITY.',
                },
                {
                    backgroundColor: 'rgba(130,0,214, .7)',
                    image: <Image source={require('../../asset/image/onboarding/4.png')} style={{ width: 500, height: 300 }} />,
                    title: `LET'S GO`,
                    subtitle: 'TOGETHER WE WIN FOR BETTER TOMORROW',
                },

            ]}
        />
    );
}

export default OnboardingScreen;

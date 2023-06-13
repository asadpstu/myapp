import React from 'react';
import {
    Image, StyleSheet, Text, View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const OnboardingScreen = ({ navigation }) => {

    const handleOnDone = () => {
        navigation.navigate('AppHome');
    };
    const TitleOne = ({ text }) => {
        return (
            <View>
                <Text style={style.title} >
                    {text}
                </Text>
            </View >
        )
    }

    const SubtitleOne = ({ text }) => {
        return (
            <View>
                <Text style={style.subtitleContainer}>
                    {text}
                </Text>
            </View>
        )
    }




    return (
        <Onboarding
            bottomBarColor="rgba(130,0,214,.1)"
            onSkip={() => navigation.replace("AppHome")}
            onDone={handleOnDone}
            pages={[
                {
                    backgroundColor: '#FFF',
                    image: <Image source={require('../../asset/image/onboard/snapchat-3-512.png')}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />,
                    title: <TitleOne text="welcome" />,
                    subtitle: <SubtitleOne text=" WELCOME TO THE WORLD OF JOY." />,
                },
                {
                    backgroundColor: '#FFF',
                    image: <Image source={require('../../asset/image/onboard/snapchat-3-512-2.png')}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />,
                    title: <TitleOne text="WHATS INSIDE" />,
                    subtitle: <SubtitleOne text='MOVIE DATABASE, AUDIO VIDEO CALL AND MANY MORE.' />
                },
                {
                    backgroundColor: '#FFF',
                    image: <Image source={require('../../asset/image/onboard/snapchat-3-512-3.png')}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />,
                    title: <TitleOne text='EFFORT' />,
                    subtitle: <SubtitleOne text='LITTLE EFFORT MAKE RICH COMMUNITY.' />
                },
                {
                    backgroundColor: '#FFF',
                    image: <Image source={require('../../asset/image/onboard/snapchat-3-512-4.png')}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />,
                    title: <TitleOne text="LET'S GO" />,
                    subtitle: <SubtitleOne text='TOGETHER WE WIN FOR BETTER TOMORROW.' />,
                },

            ]}
        />
    );
}

const style = StyleSheet.create({
    title: {
        textTransform: 'uppercase',
        margin: responsiveHeight(1),
        color: '#FF0000',
        textAlign: 'center',
        fontFamily: 'Courthes',
        fontSize: responsiveFontSize(5),
    },
    subtitleContainer: {
        textTransform: 'uppercase',
        margin: responsiveHeight(1),
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Courthes',
        fontSize: responsiveFontSize(2),
    }
})
export default OnboardingScreen;

import React, { Component, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG, ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-call-rn'

export default function VoiceCallPage(props) {
    const prebuiltRef = useRef();
    const { route } = props;
    const { params } = route;
    const { userID, userName } = params;
    const APPSIGN = 'e77d821c56af57410f21646840447edde1d641b4224b17c6a46de871c718e2f0';
    const APPID = 358510154
    const callID = 'testappvideocall'
    return (
        <View style={styles.container}>

            <ZegoUIKitPrebuiltCall
                appID={APPID}
                appSign={APPSIGN}
                userID={userID} // userID can be something like a phone number or the user id on your own user system. 
                userName={userName}
                callID={callID}

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    turnOnCameraWhenJoining: true,
                    //onOnlySelfInRoom: () => { props.navigation.navigate('AppHome') },
                    onHangUp: () => { props.navigation.navigate('AppHome') },
                    durationConfig: {
                        isVisible: true,
                        onDurationUpdate: (duration) => {
                            console.log('########CallPage onDurationUpdate', duration);
                            if (duration === 10 * 60) {
                                prebuiltRef.current.hangUp();
                            }
                        }
                    },
                    topMenuBarConfig: {
                        buttons: [
                            ZegoMenuBarButtonName.minimizingButton,
                        ],
                    },
                    onWindowMinimized: () => {
                        console.log('[Demo]CallPage onWindowMinimized');
                        props.navigation.navigate('HomePage');
                    },
                    onWindowMaximized: () => {
                        console.log('[Demo]CallPage onWindowMaximized');
                        props.navigation.navigate('VoiceCallScreen', {
                            userID: userID,
                            userName: userName,
                            callID: callID,
                        });
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    }
})


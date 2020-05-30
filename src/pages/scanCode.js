import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal
} from 'react-native';

import { RNCamera } from 'react-native-camera'

import Sound from 'react-native-sound';

export default class scanCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onBarCodeRead(code) {
        this.tocarBeep()
        const {params} = this.props.route        
        
        
        params.returnData(code.data);
        this.props.navigation.goBack()
        
        
    }

    tocarBeep() {
        Sound.setCategory('Playback');

        // Load the sound file 'whoosh.mp3' from the app bundle
        // See notes below about preloading sounds within initialization code below.
        var whoosh = new Sound('beep.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });

        // Reduce the volume by half
        whoosh.setVolume(0.5);

        // Position the sound to the full right in a stereo field
        whoosh.setPan(1);

        // Loop indefinitely until stop() is called
        whoosh.setNumberOfLoops(-1);

        // Get properties of the player instance
        console.log('volume: ' + whoosh.getVolume());
        console.log('pan: ' + whoosh.getPan());
        console.log('loops: ' + whoosh.getNumberOfLoops());

        // Seek to a specific point in seconds
        whoosh.setCurrentTime(2.5);

        // Get the current playback point in seconds
        whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

        // Pause the sound
        whoosh.pause();

        // Stop the sound and rewind to the beginning
        whoosh.stop(() => {
            // Note: If you want to play a sound after stopping and rewinding it,
            // it is important to call play() in a callback.
            whoosh.play();
        });

        // Release the audio player resource
        whoosh.release();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <RNCamera style={styles.cameraView}

                    onBarCodeRead={(code) => {
                        
                        this.onBarCodeRead(code)
                        
                    }}
                />

                <View style={styles.mask}>
                    <View style={styles.maskUpDown}></View>
                    <View style={styles.maskMiddle}>
                        <View style={styles.maskMSides}></View>

                        <View style={styles.maskMM}>
                            <View style={{ justifyContent: "space-between" }}>
                                <View style={[styles.square, { borderTopWidth: 3, borderLeftWidth: 3, borderColor: "#fff" }]} />
                                <View style={[styles.square, { borderLeftWidth: 3, borderBottomWidth: 3, borderColor: "#fff" }]} />
                            </View>

                            <View style={{ justifyContent: "space-between" }}>
                                <View style={[styles.square, { borderTopWidth: 3, borderRightWidth: 3, borderColor: "#fff" }]} />
                                <View style={[styles.square, { borderRightWidth: 3, borderBottomWidth: 3, borderColor: "#fff" }]} />
                            </View>

                        </View>
                        <View style={styles.maskMSides}></View>
                    </View>
                    <View style={styles.maskUpDown}></View>
                </View>

            </View>
        );
    }
}




const styles = StyleSheet.create({
    cameraView: {
        flex: 1,
    },
    mask: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    maskUpDown: {
        flex: 2,
        backgroundColor: "#000",
        opacity: 0.5,

    },
    maskMiddle: {
        flex: 1.3,
        flexDirection: "row",

    },
    maskMSides: {
        flex: 1,
        backgroundColor: "#000",
        opacity: 0.5,
    },
    maskMM: {
        flex: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    square: {
        width: 50,
        height: 50,
    }

});








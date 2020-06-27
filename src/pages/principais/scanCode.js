import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    Button,

} from 'react-native';

import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/Ionicons'

import Sound from 'react-native-sound';

export default class scanCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScanning: false,
            isModalVisible: false,
            flashMode: "off",
            Input: null
        };
    }

    componentDidMount() {
        //variavel ativada dps que um cod é escaneado
        //coloquei esta variavel para o leitor só ler uma vez o codigo de barras
        //caso contraro vai ler o msm cod varias vezes sem parar
        this.setState({ isScanning: false })
    }

    onBarCodeRead(code) {
        //funçao ativada quando ler o codigo

        this.setState({ isScanning: true })
        this.tocarBeep()

        const { params } = this.props.route

        console.warn(code.type)

        //esta função retorna o valor do cod para uma função na tela home
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

                    flashMode={this.state.flashMode == "on" ? "torch" : "off"}
                    captureAudio={false}
                    focusable={true}
                    onBarCodeRead={(code) => {
                        !this.state.isScanning ?
                            this.onBarCodeRead(code) :
                            null

                    }}
                />

                <View style={styles.mask}>
                    <View style={[styles.maskUpDown, { alignItems: "flex-end" }]}>
                        <TouchableOpacity style={styles.flash} activeOpacity={0.8} onPress={() => {
                            if (this.state.flashMode === "off") {
                                this.setState({ flashMode: "on" })
                            } else {
                                this.setState({ flashMode: "off" })
                            }
                        }} >
                            <Icon name={this.state.flashMode === "off" ? "ios-flash-off" : "ios-flash"} size={35} />
                        </TouchableOpacity>
                    </View>
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
                    <View style={[styles.maskUpDown, { justifyContent: "flex-end" }]}>
                        <TouchableOpacity style={styles.input} activeOpacity={0.8} onPress={() => this.setState({ isModalVisible: true })} >
                            <Icon name="ios-barcode" size={35} color="#fff" />
                            <Text style={{ color: "#fff" }}>Clique para digitar o código manualmente</Text>

                        </TouchableOpacity>
                    </View>
                </View>


                <Modal transparent visible={this.state.isModalVisible} animated={true} animationType="fade" onRequestClose={() => this.setState({ isModalVisible: false })} >
                    <TouchableOpacity style={styles.Modal} activeOpacity={1} onPress={() => this.setState({ isModalVisible: false })} >
                        <View style={{ flex: 1 }} />
                        <View style={styles.container}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}>Digite o código do produto, localizado abaico do código de barras</Text>

                            <TextInput
                                placeholder="Digite o código do produto"
                                underlineColorAndroid="#aaa"
                                keyboardType="numeric"
                                style={{ width: "90%" }}
                                onChangeText={(t) => this.setState({ Input: t })}
                                onSubmitEditing={() => {

                                    if (this.state.Input !== null) {
                                        this.onBarCodeRead(this.state.Input)
                                        this.setState({ isModalVisible: false })
                                    } else {
                                        false
                                    }
                                    
                                        
                                }}
                            />

                            <Button title="Pronto" color="#0088a9" onPress={() => {
                                if (this.state.Input !== null) {
                                    this.onBarCodeRead(this.state.Input)
                                    this.setState({ isModalVisible: false })
                                } else {
                                    false
                                }
                                
                            }} />
                        </View>
                        <View style={{ flex: 1 }} />
                    </TouchableOpacity>

                </Modal>

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
        backgroundColor: "rgba(000,000,000, 0.5)",

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
    },
    input: {
        alignSelf: "center",
        width: "90%",
        height: 50,
        backgroundColor: "#0088a9",
        borderRadius: 5,
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 5,
        margin: 10,
        flexDirection: "row",

    },
    Modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(000,000,000, 0.5)",

    },
    container: {
        backgroundColor: "#fff",
        width: "85%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 20

    },
    flash: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    }

});








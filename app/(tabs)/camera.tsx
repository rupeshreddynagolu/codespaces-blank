import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
    const navigation = useNavigation();
    const device = useCameraDevice('back')
    const { requestPermission, hasPermission } = useCameraPermission();


    if (!hasPermission) {
        return (
            <View style={styles.loader}>
                <Text>Camera permission not granted</Text>
            </View>
        );
    }

    if (device === null) {
        return (
            <View style={styles.loader}>
                <Text>Camera not available</Text>
            </View>
        );
    }

    useEffect(() => {
        requestPermission();
    }, [requestPermission]);

    if (!device || !hasPermission)
        return (
            <View style={styles.loader}>
                <Text>Loading...</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

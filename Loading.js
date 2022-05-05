import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.view}>
        <ActivityIndicator size="large" color="silver"  />
    </View>
)};

const styles = StyleSheet.create({
    view:{
        flex: 1,
        backgroundColor: '#1DACD6',
        justifyContent: 'center',
    },
});
  
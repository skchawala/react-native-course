import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const GoalItem = props => {
    return <TouchableOpacity onPress={()=>props.onDelete(props.itemData.item.key)}><View
        style={styles.root}><Text>{props.itemData.item.value}</Text></View></TouchableOpacity>

}

const styles = StyleSheet.create({
    root: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#c1c1c1'
    }
});


export default GoalItem




import React, {useState} from 'react'
import {Button, StyleSheet, TextInput, View, Modal} from 'react-native'

const GoalInput = props => {

    const [goal, setGoal] = useState('')
    const onGoalChangeText = (enteredGoal) => {
        setGoal(enteredGoal)
    }
    const onAddGoal = () => {
        props.onAddGoal(goal)
    }

    return <Modal style={styles.modal} visible={props.isOpen} animationType='slide'>
        <View style={styles.root}>
            <TextInput style={styles.textInput} placeholder='Enter course goal' onChangeText={onGoalChangeText}/>
            <View style={{flexDirection: 'row', justifyContent:'space-between',width:'50%'}}>
                <View style={styles.button}>
                    <Button title={'Close'} color='red' onPress={props.onClose}/>
                </View>
                <View style={styles.button}>
                    <Button title={'Add'} onPress={onAddGoal}/>
                </View>
            </View>
        </View>
    </Modal>

}


const styles = StyleSheet.create({
    modal: {},
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textInput: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        marginBottom: 5,
        width: '90%'
    },
    button:{
        width:'45%'
    }

});

export default GoalInput




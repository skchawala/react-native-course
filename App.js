import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, View, FlatList,Button} from 'react-native';
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {


    const [courseGoals, setCourseGoals] = useState([])
    const [isModalOpen,setIsModalOpen] = useState(false)
    const onAddGoal = (goal) => {

        if(!goal||goal.length===0){
            return
        }

        setCourseGoals((courseGoals) => {
            return [...courseGoals, {key: Math.random().toString(), value: goal}]
        })
        toggleOpenModal()
    }

    const onDelete = (goalId) => {
        setCourseGoals((courseGoals) => courseGoals.filter((item) => item.key !== goalId))
    }

    const toggleOpenModal = ()=>{
        setIsModalOpen(!isModalOpen)
    }



    return (
        <View style={styles.root}>
            <Button  title={'Add new goal'} onPress={toggleOpenModal}/>
            <GoalInput onClose={toggleOpenModal} isOpen={isModalOpen} onAddGoal={onAddGoal}/>
            <FlatList style={{marginTop:10}} data={courseGoals} renderItem={(itemData, index) => {
                return <GoalItem onDelete={onDelete} itemData={itemData}/>
            }}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 30,
        paddingVertical: 60,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    textInput: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        marginRight: 5,
        flexGrow: 1,
    },
    itemsContainer: {},

    item: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#c1c1c1'
    }
});

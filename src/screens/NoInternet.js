import React from 'react'
import {ScrollView,Image,Text} from 'react-native'
import {Screen} from "../theme/styledComponent";

export default class NoInternet extends React.Component{
    render(){
        return <ScrollView showsVerticalScrollIndicator={false}
                           contentContainerStyle={{ flexGrow: 1 }}><Screen ><Text>Maa chuda</Text></Screen></ScrollView>
    }
}

import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, useColorScheme, Image, TouchableOpacity, Modal, Button} from 'react-native';
import {AntDesign } from "@expo/vector-icons";
const BACKEND_URL = "http://192.168.3.29:5000";
import { For } from 'react-loops'

export default function FeedScreen()
{
    const colorScheme = useColorScheme();
    const [textColor, setTextColor] = useState('#000');
    const [reports, setReports] = useState([]);
    useEffect(() => {
        setTextColor(colorScheme === 'dark' ? '#FFF' : '#000');
    }, [colorScheme]);

    function getReports() {
        fetch(BACKEND_URL + "/reports/")
            .then((res) => res.json())
            .then((json) => setReports(json));
    }

    // function likeOrDislikeReport(report_id, like) {
    //     let route = "";
    //     if (like)
    //         route = "/like_report/";
    //     else
    //         route = "/dislike_report/";
    //
    //     fetch(BACKEND_URL + route, {
    //         method: 'POST', headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({report_id: report_id})
    //     })
    //         .then(getReports());
    // }

    const Report = (props) => {
        const colorScheme = useColorScheme();
        const [textColor, setTextColor] = useState('#000');
        const [value, setValue] = useState('Unselected');
        const [selectedIndex, setSelectedIndex] = useState(undefined);
        const [modalVisible, setModalVisible] = useState(false);
        const [likes, setLikes] = useState(props.likes)

        function likeOrDislikeReport(report_id, like) {
            let route = "";
            if (like)
                route = "/like_report/";
            else
                route = "/dislike_report/";

            fetch(BACKEND_URL + route, {
                method: 'POST', headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({report_id: report_id})
            })
                .then((res) => res.json())
                .then((json) => {
                    setLikes(json["likes"])});
                // .then(getReports());
        }

        useEffect(() => {
            setTextColor(colorScheme === 'dark' ? '#FFF' : '#000');
        }, [colorScheme]);

        const _onChange = (event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        };

        const _onValueChange = (val) => {
            setValue(val);
        };

        const [liked, setLiked] = useState(false);

        const handleLikePress = () => {
            likeOrDislikeReport(props.report_id, !liked);
            setLiked(!liked);
        };

        function statusToText()
        {
            if (props.status)
                return "Устранено"
            else
                return "Актуально"
        }

        function getPhotoUri()
        {
            if (props.photo.includes("https://"))
                return props.photo
            else
                return BACKEND_URL + props.photo
        }

        function getNormalDate()
        {
            const date = new Date(props.dt);
            const dateFormat = date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear();
            return dateFormat;
        }

        return (

            <><TouchableOpacity style={styles.shadow} onPress={() => setModalVisible(true)}>
                <View style={styles.report}>
                    <Image style={styles.image}
                           source={{
                               uri: getPhotoUri(),
                           }}/>
                    <Text style={styles.typeIssue}>{props.title}</Text>
                    <Text style={styles.date}>{getNormalDate()}</Text>
                    <Text style={styles.street}>{props.address}</Text>
                    <Text style={styles.status}>{statusToText()}</Text>

                    <TouchableOpacity onPress={handleLikePress}>
                        {/*return <Ionicons name={liked} />;*/}

                        <Text style={styles.textLike}>{likes} {liked ? <AntDesign style={styles.likes} name='like1'/> :
                            <AntDesign style={styles.dislike} name='like2'/>} </Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity><View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.сenteredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <AntDesign style={styles.closeButton} name='close'></AntDesign>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{props.title}</Text>
                            <Image style={styles.imageModal}
                                   source={{
                                       uri: getPhotoUri(),
                                   }}/>
                            <Text style={styles.modalAddress}>Адрес</Text>
                            <Text style={styles.modalStreet}>{props.address}</Text>
                            <Text style={styles.modalDate}>{getNormalDate()}</Text>
                            <Text style={styles.modalDescTitle}>Описание</Text>
                            <Text style={styles.modalDesc}>{props.description}</Text>
                            <View style={styles.modalStatus}>
                                <Text style={{textAlign: 'center', paddingTop: 5}}>{statusToText()}</Text>

                            </View>
                            <TouchableOpacity onPress={handleLikePress}>
                                {/*return <Ionicons name={liked} />;*/}
                                <Text style={styles.textLikeModal}>{likes} {liked ?
                                    <AntDesign style={styles.likesModal} name='like1'/> :
                                    <AntDesign style={styles.dislike} name='like2'/>} </Text>
                            </TouchableOpacity>
                            {/*Собрали снег в большую кучу, но не вывозят уже 5й день!   */}
                        </View>
                    </View>
                </Modal>
            </View></>

        );
    };

    // const ReportsFromServer = () => {
    //     const [reports, setReports] = useState([]);
    //     // let reports;
    //     // const res = await fetch(BACKEND_URL + "/reports/");
    //     // if (res.ok) { // если HTTP-статус в диапазоне 200-299
    //     //                    // получаем тело ответа (см. про этот метод ниже)
    //     //     let json = await res.json();
    //     // } else {
    //     //     alert("Ошибка HTTP: " + res.status);
    //     // }
    //     function getReports() {
    //         fetch(BACKEND_URL + "/reports/")
    //             .then((res) => res.json())
    //             .then((json) => setReports(json));
    //     }
    //     getReports();
    //     return (
    //         <For of={reports} as={item =>
    //             <Report title={item["title"]} description={item["description"]} photo={item["photo"]}
    //                     address={item["address"]} dt={item["dt"]} status={item["status"]}/>
    //         }/>
    //     )
    // };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                {backgroundColor: colorScheme === 'dark' ? '#000' : '#FFF'},
            ]} nestedScrollEnabled = {true}>
            <Button title={"Обновить"} onPress={() => {
                getReports();
            }}/>
            <View style={styles.segmentSection}>
                <SegmentedControl values={['Акутальные', 'Все']} selectedIndex={0}/>
            </View>
            {/*<ReportsFromServer />*/}
            <For of={reports}
                 as={item => <Report report_id={item["id"]} likes={item["likes"]} title={item["title"]} description={item["description"]} photo={item["photo"]}
                                     address={item["address"]} dt={item["dt"]} status={item["status"]}/>}/>


        </ScrollView>
    );
};

const styles = StyleSheet.create(
    {
        container: {
            // alignItems:"center",
            flexGrow: 1,

        },
    segmentSection: {
        margin: 25,
    },

    report:{
            marginTop:10,
        marginHorizontal:22,
        borderWidth:1,
        borderRadius:20,
        borderColor:'rgba(84,74,74,0.39)',
        width:370,
        height:200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },



        },
        shadow:{

            // shadowOpacity:1,
            // shadowRadius:5,
            // shadowOffset:{width:0,height:50}

        },
        image:{
            width:350,
            height:130,
            marginHorizontal:9,
            marginTop:5,
            borderRadius:20

        },
        typeIssue: {
            marginHorizontal: 9,
        },
        date:{
            // marginHorizontal:130,
            position:'absolute',
            marginTop:135,
            marginLeft:180,
            color:'rgba(58,53,53,0.71)'
        },
        street: {
            marginHorizontal: 9,
        },
        status:{
            marginHorizontal: 9,
            color:'rgba(48,154,48,0.71)'
        },

        textLike:{
            paddingLeft: 290,
            marginTop:-35
        },
        dislike: {
            position:'absolute',
            marginHorizontal: 9,
            paddingLeft:128,
            fontSize:35,
            color:'rgba(53,145,53,0.71)'
        },
        likes:{
            position:'absolute',
            marginHorizontal: 9,
            paddingLeft:128,
            fontSize:35,
            color:'rgba(53,145,53,0.71)'
            // width:200,
        },
        сenteredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            // alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width:370,
            height:450
        },

        closeButton:{
            fontSize:30,
            position:'absolute',
            width:30,
            marginLeft:295,
            marginTop:-20
        },
        modalTitle: {
            position:'absolute',
            fontSize:24,
            paddingTop:13,
            marginLeft:12,
            width:230,
            fontWeight:'bold',
        },
        imageModal:{
            position:'absolute',
            width:350,
            height:180,
            marginTop:60,
            marginLeft:10,
            borderRadius:20
        },
        modalAddress: {
            position:'absolute',
            fontSize:16,
            paddingTop:250,
            // fontWeight:'500',
            paddingLeft:12,
            fontWeight:'bold',
            // marginRight:0,
            // marginHorizontal:9


        },
        modalStreet: {
            position:'absolute',
            fontSize:16,
            paddingTop:270,
            fontWeight:'500',
            paddingLeft:12,
            // fontWeight:'bold',
        },
        modalDate: {
            position:'absolute',
            fontSize:16,
            fontWeight:'500',
            paddingTop:290,
            paddingLeft:12,
            color:'rgba(33,28,28,0.55)'
        },
        modalDescTitle: {
            position:'absolute',
            fontSize:16,
            paddingTop:310,
            paddingLeft:12,
            fontWeight:'bold',
            color:'rgb(0,0,0)'
        },
        modalDesc: {
            position:'absolute',
            fontSize:16,
            paddingTop:330,
            paddingLeft:12,
            fontWeight:'500',
            color:'rgb(0,0,0)'
        },
        modalStatus:{
            backgroundColor:'#D9D9D9',
            borderRadius:20,
            height:30,
            width:90,
            position:'absolute',
            fontSize:16,
            marginTop:380,
            marginLeft:13,
            fontWeight:'500',
            color:'rgb(0,0,0)'
        },
        textLikeModal: {
            position:'absolute',
            marginHorizontal: 9,
            paddingTop:339,
            paddingLeft:80,
            fontSize:35,
            color:'rgba(53,145,53,0.71)'
        },
        likesModal: {
            position:'absolute',
            marginHorizontal: 9,
            paddingLeft:80,
            paddingTop:100,
            fontSize:35,
            color:'rgba(53,145,53,0.71)'}


    });




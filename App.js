import React, {Component} from 'react';
import { 
  Header,
  ListItem,
  Container,
  Left,
  Body,
  Right,
  Title,
  Content,
  Row,
  Col
 } from "native-base";
import {
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import axios from 'axios';

export default class App extends Component {

  state = {
    text: '',
    listan: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((res) => {
      this.setState({
        listan: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
   
  //nambah pake axios post
  handleClick = () => {
    this.setState({listan: [...this.state.listan, this.state.text]});
    console.log(this.state.listan[this.state.listan.length - 1] + ' berhasil dimasukkan');
  }
  
  deleteItem = (tulisan) => {
    var listNumpang = [...this.state.listan]
    let index = listNumpang.indexOf(tulisan);
    listNumpang.splice(index, 1);
    this.setState({listan: listNumpang});
    console.log('deleted');
  }

  render() {
    return (
      <Container>
      <Header style={{backgroundColor: 'black'}} androidStatusBarColor='#333'>
        <Body>
          <Title>TO-DO</Title>
        </Body>
        <Right/>
      </Header>

      <Content>
         <Row  style={style.inputan}>
          <Col size={3}>
          <TextInput
            style={{borderBottomColor: '#AAA', borderBottomWidth: 0.5, marginRight: 8}}
            placeholder='type here...'
            onChangeText={(text) => this.setState({text})}
            ></TextInput>
            </Col>
            <Col size={1}>
          <Button
              title="Submit"
              color="black"
              onPress={this.handleClick}
              ></Button>
              </Col>
        </Row>

        <Row>
          <FlatList
            data={this.state.listan}
            renderItem={({item}) => 
            <ListItem>
            <TouchableOpacity onLongPress={() => this.deleteItem(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
            </ListItem>}
          />
        </Row>
      </Content>
  </Container>
    );
  }
}

const style = StyleSheet.create({
  container: {
    margin: 16,
    display: 'flex'
  },
  inputan: {
    padding: 16
  },
  listItem: {
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#AAA',
    borderBottomWidth: 0.5,
    borderBottomColor: '#AAA',
  }
})
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
   
  handleClick = () => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: this.state.text
    })
    .then((res) => {
      console.log(res);
      this.setState({listan: [...this.state.listan, {title: this.state.text}]});
      console.log(this.state.listan[this.state.listan.length - 1].title + ' berhasil dimasukkan');
      this.textInputan.clear();
    })
    .catch((err) => {
      console.log(err);
    });
    
  }

  deleteItem = (tulisan) => {
    
    var listNumpang = [...this.state.listan]
    let index = listNumpang.indexOf(tulisan);

    axios.delete('https://jsonplaceholder.typicode.com/todos/' + (index+1).toString())
    .then((res) => {
      //===========Log
      console.log('Data di JSONPlaceholder :'); 
      console.log(res); 

      console.log('Data di Device :'); 
      console.log(this.state.listan); 
    })
    .catch((err) => {
      console.log(err);
    }) ;

    listNumpang.splice(index, 1);
    this.setState({listan: listNumpang});
    console.log('deleted');
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'black'}} androidStatusBarColor='#222' >
          <Left/>
          <Body>
            <Title>TO-DO</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Row  style={style.inputan}>
            <Col size={3}>
              <TextInput
                ref={input => {this.textInputan = input}}
                style={style.textInput}
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
              inverted
              data={this.state.listan}
              renderItem={({item}) => 
                <ListItem>
                  <TouchableOpacity onLongPress={() => this.deleteItem(item)}>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                </ListItem>
            }/>
          </Row>
        </Content>

  </Container>
    );
  }
}

const style = StyleSheet.create({
  inputan: {
    padding: 16
  },
  textInput: {
    borderBottomColor: '#AAA',
    borderBottomWidth: 0.5,
    marginRight: 8
  }
})
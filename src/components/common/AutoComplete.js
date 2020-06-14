import React, {Component} from 'react';
import styled from 'styled-components';
import {Text, View, Picker} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {isEmpty} from '../../helper/string';

const Area = styled.View``;

const RequiredText = styled.Text`
  color: ${props => props.theme.danger};
`;

const PlaceholderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StylePicker = styled.Picker`
  width: 100%;
  height: 50px;
`;

const StyleTextInput = styled.TextInput`
  padding: 10px;
  border-radius: 4px;
`;

const TouchableOpacity = styled.TouchableOpacity`
  padding: 16px;
`;

const ButtonLabel = styled.Text`
  color: ${props => props.theme.secondary};
  font-weight: bold;
  font-size: 16px;
`;

const iconColor = '#aaa';

export default class AutoComplete extends React.PureComponent {
  state = {
    searchText: '',
    data: [],
  };

  _updateSearchData = async data => {
    await this.setState({data});
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({data: nextProps.data/*, searchText: nextProps.searchText*/});
  }

  componentDidMount() {
    this.setState({searchText: this.props.defaultValue});
  }

  _onChangeText = async searchText => {
    await this.setState({searchText, dropdownVisible: true});
    const res = await this.props.onChange(this.state.searchText);
    await this.setState({data: res.data ? res.data : []});
  };

  _onSelect = async item => {
    this.setState({searchText: item.description});
    this.props.onSelect(item);

    console.log('on select click', item, this.state);
  };

  /*	_isInValid = (formikprops, input) => {
		let path = input.split(/(\.)/g);
		let currentValue = formikprops.values;
		let currentValuePath = "formikprops.values";
		let currentErrorPath = "formikprops.errors";
		let currentError = formikprops.errors;
		path.map((loc, index) => {
			if (
				loc !== "." && index === path.length - 1
					? true
					: currentValue[loc]
			) {
				currentValue = currentValue[loc];
				currentValuePath = `${currentValuePath}.${loc}`;
			}
		});
		path.map(loc => {
			if (loc !== "." && currentError[loc]) {
				currentError = currentError[loc];
				currentErrorPath = `${currentErrorPath}.${loc}`;
			}
		});

		if (
			currentValuePath === `formikprops.values.${input}` &&
			currentErrorPath === `formikprops.errors.${input}`
		)
			return { isInvalid: true, error: currentError };
		return { isInvalid: false, error: currentError };
	};*/

  render() {
    const {
      placeholder,
      isRequired,
      iconLeft,
      input,
      formikprops,
      selectedKey,
      disabled,
      selectedValue,
      options,
      onChange,
      hint,
      defaultValue,
    } = this.props;

    //const isValid = this._isInValid(formikprops, input);

    return (
      <Area
        style={{
          opacity: disabled ? 0.6 : 1.0,
          marginTop: !!placeholder ? 10 : 0,
          marginBottom: !placeholder ? 10 : 0,
        }}>
        {!!placeholder && (
          <PlaceholderContainer>
            <Text
              style={{
                color: /*isValid.isInvalid ? "red" : */ '#777',
                marginBottom: 2,
              }}>
              {placeholder}
              {isRequired && <RequiredText>*</RequiredText>}
            </Text>
          </PlaceholderContainer>
        )}
        <RowContainer
          style={{
            /*borderWidth: /!*isValid.isInvalid ?*!/ 1/!* : 0*!/,
						borderColor:/!* isValid.isInvalid ? "red" : *!/"black",*/
            backgroundColor: 'white',
          }}>
          {!!iconLeft && (
            <FontAwesome5
              name={iconLeft}
              size={18}
              color={iconColor}
              style={{marginRight: 5, marginLeft: 10}}
            />
          )}
          <StyleTextInput
            placeholder={hint ? hint : placeholder}
            value={this.state.searchText}
            defaultValue={defaultValue}
            editable={!disabled}
            //onBlur={() => this.setState({ searchText: defaultValue })}
            {...this.props}
            onChangeText={searchText => {
              this.setState({searchText: searchText});
              this.props.onChangeText(searchText);
            }}
          />
        </RowContainer>
        {this.props.isDropdownVisible && (
          <View
            elevation={7}
            style={{
              position: 'relative',
              bottom: 0,
              zIndex: 8,
              shadowColor: '#000000',
              shadowOffset: {
                width: 7,
                height: 5,
              },
              shadowRadius: 7,
              shadowOpacity: 1.0,
              backgroundColor: '#fff',
              width: '100%',
            }}>
            {this.state.data.map(item => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    searchText: item.description,
                    query: item.description,
                  });
                  this._onSelect(item);
                }}>
                <Text style={{fontSize: 15}}>
                  {JSON.stringify(item.description)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Area>
    );
  }
}

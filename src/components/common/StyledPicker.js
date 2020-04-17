import React, { Component } from "react";
import styled from "styled-components";
import { Text, View, Picker } from "react-native";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";

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
  height: 50px;
`;

const iconColor = "#aaa";

/*
*   placeholder : its work as marker on front of the component
      isRequired: not Mandatory but yes if you provide then good
      iconLeft: if you want to add icon in the left corner in the component
      input,
      disabled,
      selectedValue : required string to show current value
      selectedKey: if you have object then it's require property name
      options: array of options available
      onChange: if something change
* */

export default class StyledPicker extends React.PureComponent {
  render() {
    const {
      placeholder,
      isRequired,
      iconLeft,
      input,
      disabled,
      selectedValue,
      selectedKey,
      options,
      onChange,
      width
    } = this.props;

    return (
      <Area
        style={{
          opacity: this.props.disabled ? 0.6 : 1.0,
          marginTop: !!placeholder ? 10 : 0,
          marginBottom: !placeholder ? 10 : 0,
          width: width ? width : "100%"
        }}
      >
        {!!placeholder && (
          <PlaceholderContainer>
            <Text style={{ color: "#777", marginBottom: 2 }}>
              {placeholder}
              {isRequired && <RequiredText>*</RequiredText>}
            </Text>
          </PlaceholderContainer>
        )}

        <RowContainer>
          {!!iconLeft && (
            <FontAwesome5
              name={iconLeft}
              size={18}
              color={iconColor}
              style={{ marginRight: 5, marginLeft: 10 }}
            />
          )}
          <StylePicker
            style={{ width: "100%" }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              onChange(options[itemIndex], itemIndex, input);
            }}
          >
            {options.map((item, index) => (
              <StylePicker.Item
                key={index}
                label={item[selectedKey]}
                value={item[selectedKey]}
              />
            ))}
          </StylePicker>
        </RowContainer>
      </Area>
    );
  }
}

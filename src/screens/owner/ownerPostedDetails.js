import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Card, HorizontalLine, StyledTitle } from "../../theme/styledComponent";
import styles from "../../theme/styles";
import theme from "../../theme/lightTheme";
import styled from "styled-components";
import {
    login,
    setHomeScreenVisibility,
    setLoginSuccessFul
} from "../../actions";
import { connect } from "react-redux";
import { NavigationBar, Screen } from "../../theme/styledComponent";
import RBSheet from "react-native-raw-bottom-sheet";
import ImageView from "react-native-image-viewing";
import FullScreenImage from "./fullScreenImage";
import Button from "../../components/common/Buttons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StyledPropText = styled.Text`
	color: ${props => props.theme.themeText};
	margin: 5px 0px;
`;

const StyledValueText = styled.Text`
	color: ${props => props.theme.themeText};
	margin: 5px 0px;
	line-height: 30px;
`;

const DataContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px 16px 5px 16px;
	justify-content: space-between;
`;

class OwnerPostedDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Leasing Details'
        };
    };

    render() {
        const item = this.props.navigation.getParam("item");
        {console.log('data', item)}
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        position: "absolute",
                        top: 0
                    }}
                >
                    <View
                        style={{
                            paddingTop: 200,
                            borderStyle: "solid",
                            borderRightWidth: windowWidth,
                            borderTopWidth: 100,
                            borderRightColor: "transparent",
                            borderTopColor: theme.secondThemeColor
                        }}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Screen style={{ backgroundColor: "transparent" }}>
                        <StatusBar barStyle="light-content" />

                        <View style={{ marginLeft: 5, marginRight: 5 }}>
                            <Card
                                style={{
                                    paddingTop: 10,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                    paddingBottom: 10,
                                    borderRadius: 20,
                                    marginBottom: 15
                                }}
                            >
                                <View
                                    style={[
                                        styles.flex_row,
                                        {
                                            paddingTop: 10,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            paddingBottom: 5,
                                            justifyContent: "space-between"
                                        }
                                    ]}
                                >
                                    <View>
                                        {item.vehicleCompany&&<StyledPropText>
                                           Vehicle Company
                                        </StyledPropText>}
                                      <StyledPropText>
                                            Contact Person Name
                                        </StyledPropText>
                                       <StyledPropText>
                                            Contact Person Number
                                        </StyledPropText>
                                    </View>
                                    {console.log(
                                        "this isdaf",
                                        this.state,
                                        item
                                    )}
                                    <View style={{ alignItems: "flex-end" }}>
                                        {item.vehicleCompany&&<StyledPropText>
                                            {item.vehicleCompany}
                                        </StyledPropText>}
                                       <StyledPropText>
                                           {this.props.personalDetails.FirstName} {this.props.personalDetails.LastName}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {this.props.personalDetails.Mobile}
                                        </StyledPropText>
                                    </View>
                                </View>
                            </Card>
                            <Card
                                style={{
                                    paddingTop: 0,
                                    paddingRight: 0,
                                    paddingLeft: 0,
                                    paddingBottom: 0,
                                    borderRadius: 20,
                                    elevation: 0,
                                    backgroundColor: "#F1F3F6"
                                }}
                            >
                                <View
                                    style={[
                                        styles.flex_row,
                                        {
                                            justifyContent: "space-between",
                                            padding: 14,
                                            backgroundColor: "#E7F3FD",
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10
                                        }
                                    ]}
                                >
                                    <StyledTitle>
                                        {"Vehicle Details"}
                                    </StyledTitle>
                                </View>
                                {/*<HorizontalLine />*/}
                                <View
                                    style={[
                                        styles.flex_row,
                                        {
                                            paddingTop: 10,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            paddingBottom: 5,
                                            justifyContent: "space-between"
                                        }
                                    ]}
                                >
                                    <View>
                                        <StyledPropText>
                                            Vehicle Category
                                        </StyledPropText>
                                        <StyledPropText>
                                            Company
                                        </StyledPropText>
                                        <StyledPropText>
                                            Model
                                        </StyledPropText>
                                        <StyledPropText>
                                            From
                                        </StyledPropText>
                                        <StyledPropText>
                                            To
                                        </StyledPropText>
                                        <StyledPropText>
                                            Status
                                        </StyledPropText>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <StyledPropText>
                                            {item.vehicleCategory?item.vehicleCategory:'-'}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {item.vehicleCompany?item.vehicleCompany:'-'}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {item.Model?item.Model:'-'}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {item.FromDate?item.FromDate.split(" ")[0]:'-'}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {item.Todate?item.Todate.split(" ")[0]:'-'}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {item.Status!=null?item.Status?'Available':'Unavailable':'-'}
                                        </StyledPropText>

                                    </View>
                                </View>
                            </Card>
                            <Card
                                style={{
                                    paddingTop: 0,
                                    paddingRight: 0,
                                    paddingLeft: 0,
                                    paddingBottom: 0,
                                    borderRadius: 20,
                                    elevation: 0,
                                    backgroundColor: "#F1F3F6"
                                }}
                            >
                                <View
                                    style={[
                                        styles.flex_row,
                                        {
                                            justifyContent: "space-between",
                                            padding: 14,
                                            backgroundColor: "#E7F3FD",
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10
                                        }
                                    ]}
                                >
                                    <StyledTitle>
                                        {"Pay Scale"}
                                    </StyledTitle>
                                </View>
                                {/*<HorizontalLine />*/}
                                <View
                                    style={[
                                        styles.flex_row,
                                        {
                                            paddingTop: 10,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            paddingBottom: 5,
                                            justifyContent: "space-between"
                                        }
                                    ]}
                                >
                                    <View>
                                        <StyledPropText>
                                            Car Type
                                        </StyledPropText>
                                        <StyledPropText>
                                            Monthly Pricing
                                        </StyledPropText>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <StyledPropText>
                                            {item.vehicleCategory?item.vehicleCategory:'-'}
                                        </StyledPropText>
                                        <StyledPropText>
                                            {item.Pricing?item.Pricing.price:'-'}
                                        </StyledPropText>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </Screen>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    home: state.home,
    earning: state.driver.earning,
    ClientTypeId: state.auth.ClientTypeId,
    data: state.home.work.data,
    personalDetails:state.main.personalDetails
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnerPostedDetails);

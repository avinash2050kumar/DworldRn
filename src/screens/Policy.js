import React from "react";
import {
	Text,
	View,
	ScrollView,
	FlatList,
	TouchableOpacity
} from "react-native";
import { Screen } from "../theme/styledComponent";
import i18n from "i18n-js";

export default class Policy extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: i18n.t("profileScreenDriverOption2")
		};
	};

	render() {
		return (
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flex: 1 }}
			>
				<Screen>
					<View style={{ width: "100%", alignItems: "center" }}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								marginBottom: 10
							}}
						>
							Disclaimers
						</Text>
					</View>
					{/*<TouchableOpacity
						onPress={() => console.log("log")}
						style={{ padding: 16 }}
					>
						<Text>Submit</Text>
					</TouchableOpacity>*/}
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							a)
						</Text>{" "}
						No refund of any kind would be entertained, if the
						vehicle in question has been withdrawn by the owners.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							b)
						</Text>{" "}
						We make no warranties about the safety claims or
						background checks of any drivers or other involved
						parties whatsoever.
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							c)
						</Text>{" "}
						We shall not provide compensation incase the driver
						commits any kind of criminal act, however, you are free
						to pursue any legal action on your own.
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							d)
						</Text>{" "}
						We in no way, shape or form take guarantee of
						safeguarding your original document when given to our
						platform for any purpose. However, all due care shall be
						taken by us.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							e)
						</Text>{" "}
						We are merely middlemen, and hence, we make no guarantee
						about any persons using our platform.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							f)
						</Text>{" "}
						We will make no le We won’t take any legal action
						against anything happened to you on your behalf, it is
						entirely yours and we don’t pay anything for such legal
						cases.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							g)
						</Text>{" "}
						Legal representations on your behalf, however, you are
						free to do the same.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							h)
						</Text>{" "}
						Incase there is a violation of our terms and condition,
						we will take all necessary steps internally to reprimand
						the same.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							i)
						</Text>{" "}
						We have the right to block the account and forfeit any
						deposit incase any illegal act has been committed.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							j)
						</Text>{" "}
						We do not make guarantees about the payment to the
						drivers from the firm or the owners.{" "}
					</Text>
					<Text>
						<Text
							style={{
								fontWeight: "bold",
								marginBottom: 10
							}}
						>
							k)
						</Text>{" "}
						Our decision regarding the services on the platform will
						be final and binding.
					</Text>
				</Screen>
			</ScrollView>
		);
	}
}

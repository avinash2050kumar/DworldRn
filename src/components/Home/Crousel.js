import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	FlatList,
	SafeAreaView,
	TextInput,
	ImageBackground,
	Dimensions
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";

var { height, width } = Dimensions.get("window");

function wp(percentage) {
	const value = (percentage * width) / 100;
	return Math.round(value);
}

export const itemWidth = wp(75) + wp(2) * 2;

class HomeCarousel extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			slider1ActiveSlide: 1,
			activeSlide: 0,
			data: [
				{
					imgSrc: require("../../assets/images/carousel1.png")
				},
				{
					imgSrc: require("../../assets/images/carousel2.png")
				}
			]
		};
	}

	/*  _renderItem({ item, index }) {
		  return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
	  }*/

	_renderItem({ item, index }) {
		return (
			<Image
				source={item.imgSrc}
				style={{
					height: 200,
					aspectRatio: 1.7,
					borderRadius: 15
				}}
				resizeMode="cover"
			/>
		);
	}

	/*_renderItem({ item, index }) {
		return <MySlideComponent data={item} />;
	}*/

	get pagination() {
		const { entries, activeSlide } = this.state;
		return (
			<Pagination
				dotsLength={this.state.data.length}
				activeDotIndex={activeSlide}
				containerStyle={{ marginTop: -15 }}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					marginHorizontal: 8,
					backgroundColor: "rgba(88, 88, 88, 0.92)"
				}}
				inactiveDotStyle={
					{
						// Define styles for inactive dots here
					}
				}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		);
	}

	render() {
		return (
			<View>
				<Carousel
					ref={c => {
						this._carousel = c;
					}}
					autoplay={true}
					autoplayDelay={3000}
					loop={true}
					data={this.state.data}
					renderItem={this._renderItem}
					sliderWidth={width}
					itemWidth={itemWidth}
					style={{ marginTop: 10 }}
					onSnapToItem={index =>
						this.setState({ activeSlide: index })
					}
				/>
				{/*{this.pagination}*/}
			</View>
		);
	}
}

export default HomeCarousel;

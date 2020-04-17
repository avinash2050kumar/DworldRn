import React from "react";
import { View, Dimensions, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeImage: 0 };
  }
  _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: viewportHeight / 2 }}>
        <Image
          style={{
            width: "100%",
            aspectRatio: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20
          }}
          source={{ uri: item }}
        />
      </View>
    );
  };

  pagination = () => {
    const { images } = this.props;
    const { activeImage } = this.state;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeImage}
        containerStyle={{ alignSelf: "center", marginTop: -60 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "white",
          opacity: 0.7
        }}
        inactiveDotStyle={{
          opacity: 1
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  render() {
    return (
      <View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.images}
          renderItem={this._renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          // blurredOpacity={0.4}
          // blurredZoom={0.6}
          onSnapToItem={index => this.setState({ activeImage: index })}
        />
        {this.pagination()}
      </View>
    );
  }
}

export default ImageCarousel;

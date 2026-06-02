import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Ride Anywhere, Anytime',
    description:
      'Book a ride in seconds and connect with nearby drivers for safe and convenient transportation.',
  },
  {
    id: '2',
    title: 'Track Your Ride Live',
    description:
      'Monitor your driver in real time, receive updates, and enjoy a seamless pickup experience.',
  },
  {
    id: '3',
    title: 'Safe, Fast & Affordable',
    description:
      'Travel confidently with trusted drivers, transparent pricing, and secure payments.',
  },
];

export default function WalkThrough({ navigation }: any) {
    // console.log(navigation)
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      navigation.replace('LoginScreen');
    }
  };

  const skip = () => {
      console.log('navigation: ',navigation.getState())
    // navigation.getState.replace('LoginScreen');
      navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageEmoji}>🚖</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={nextSlide}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 60,
    marginRight: 20,
  },

  skipText: {
    fontSize: 16,
    color: '#16A34A',
    fontWeight: '600',
  },

  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  imagePlaceholder: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  imageEmoji: {
    fontSize: 80,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 25,
    backgroundColor: '#16A34A',
  },

  button: {
    backgroundColor: '#16A34A',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
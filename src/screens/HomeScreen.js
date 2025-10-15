import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = () => {
    // Simulate image selection - replace with actual image picker
    Alert.alert(
      'Select Images',
      'Choose up to 5 plant images for identification',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Select Images',
          onPress: () => {
            // Simulate adding images
            const mockImages = [
              {id: 1, uri: 'https://via.placeholder.com/150x150/4a7c59/ffffff?text=Plant+1'},
              {id: 2, uri: 'https://via.placeholder.com/150x150/4a7c59/ffffff?text=Plant+2'},
            ];
            setSelectedImages(mockImages);
          },
        },
      ]
    );
  };

  const handleIdentify = () => {
    if (selectedImages.length === 0) {
      Alert.alert('No Images', 'Please select at least one image first');
      return;
    }

    setIsLoading(true);
    
    // Simulate PlantNet API call
    setTimeout(() => {
      setIsLoading(false);
      const mockResults = {
        suggestions: [
          {
            id: 1,
            scientificName: 'Rosa canina',
            commonName: 'Dog Rose',
            confidence: 0.89,
            image: 'https://via.placeholder.com/100x100/4a7c59/ffffff?text=Rose',
          },
          {
            id: 2,
            scientificName: 'Rosa rubiginosa',
            commonName: 'Sweet Briar',
            confidence: 0.76,
            image: 'https://via.placeholder.com/100x100/4a7c59/ffffff?text=Rose+2',
          },
          {
            id: 3,
            scientificName: 'Rosa gallica',
            commonName: 'French Rose',
            confidence: 0.65,
            image: 'https://via.placeholder.com/100x100/4a7c59/ffffff?text=Rose+3',
          },
        ],
      };
      setResults(mockResults);
      setShowResults(true);
    }, 2000);
  };

  const handleCorrect = () => {
    Alert.alert('Confirmed!', 'Thank you for confirming the identification. This helps improve our AI!');
    resetResults();
  };

  const handleWrong = () => {
    Alert.alert('Flagged', 'The image has been sent to our experts for review. Thank you for your feedback!');
    resetResults();
  };

  const resetResults = () => {
    setResults(null);
    setShowResults(false);
    setSelectedImages([]);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => navigation.navigate('Login')},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>🌿 SmartPlant</Text>
            <Text style={styles.subtitle}>Plant Identification Made Easy</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>📸 Upload Plant Images</Text>
          <Text style={styles.sectionDescription}>
            Take photos of leaves, flowers, or fruits for accurate identification
          </Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
            <Text style={styles.uploadButtonText}>
              {selectedImages.length > 0 
                ? `Selected ${selectedImages.length} image(s)` 
                : 'Select Images (Max 5)'
              }
            </Text>
          </TouchableOpacity>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <ScrollView 
              horizontal 
              style={styles.imagePreview}
              showsHorizontalScrollIndicator={false}
            >
              {selectedImages.map((image) => (
                <View key={image.id} style={styles.imageContainer}>
                  <Image source={{uri: image.uri}} style={styles.previewImage} />
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Identify Button */}
        {selectedImages.length > 0 && (
          <TouchableOpacity
            style={[styles.identifyButton, isLoading && styles.buttonDisabled]}
            onPress={handleIdentify}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.identifyButtonText}>🔍 Identify Plant</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Results Section */}
        {showResults && results && (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>🌿 Identification Results</Text>
            
            {results.suggestions.map((suggestion, index) => (
              <View key={suggestion.id} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultRank}>#{index + 1}</Text>
                  <Text style={styles.confidence}>
                    {Math.round(suggestion.confidence * 100)}% match
                  </Text>
                </View>
                
                <View style={styles.resultContent}>
                  <Image source={{uri: suggestion.image}} style={styles.resultImage} />
                  <View style={styles.resultInfo}>
                    <Text style={styles.scientificName}>{suggestion.scientificName}</Text>
                    <Text style={styles.commonName}>{suggestion.commonName}</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.correctButton} onPress={handleCorrect}>
                <Text style={styles.actionButtonText}>✅ Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wrongButton} onPress={handleWrong}>
                <Text style={styles.actionButtonText}>❌ Wrong</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Features Section */}
        {!showResults && (
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>🌟 Features</Text>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🤖</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI-Powered Identification</Text>
                <Text style={styles.featureDescription}>
                  Advanced machine learning algorithms identify plants with high accuracy
                </Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🌍</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Global Database</Text>
                <Text style={styles.featureDescription}>
                  Access to thousands of plant species from around the world
                </Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📊</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Detailed Information</Text>
                <Text style={styles.featureDescription}>
                  Get scientific names, common names, and confidence scores
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5a27',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  uploadSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  uploadButton: {
    backgroundColor: '#4a7c59',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4a7c59',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    marginTop: 16,
  },
  imageContainer: {
    marginRight: 12,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  identifyButton: {
    backgroundColor: '#2d5a27',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2d5a27',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  identifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultCard: {
    backgroundColor: '#f8fffe',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a7c59',
  },
  confidence: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5a27',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
  },
  scientificName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 4,
  },
  commonName: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  correctButton: {
    backgroundColor: '#4a7c59',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.4,
    alignItems: 'center',
  },
  wrongButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  featuresSection: {
    margin: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;

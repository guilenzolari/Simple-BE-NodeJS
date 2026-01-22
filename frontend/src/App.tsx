import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store/index';
import { useGetCurrentUserQuery } from './store/apiSlice';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ErrorRetryView from './screens/ErrorRetryView';

const AppContent = () => {
  const { error, isLoading, refetch } = useGetCurrentUserQuery();

  console.log('Current User Data:');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorRetryView
        errorMessage={`Failed to load user data. ${error}`}
        onRetry={refetch}
      />
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store/index';
import { useGetCurrentUserQuery } from './store/apiSlice';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ErrorRetryView from './screens/ErrorRetryView';
import { useTranslation } from 'react-i18next';
import './i18n'; // Garante a inicialização das traduções

const AppContent = () => {
  const { t } = useTranslation();
  const { error, isLoading, refetch } = useGetCurrentUserQuery();

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
        errorMessage={`${t('errors.fetchUser')} ${error}`}
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

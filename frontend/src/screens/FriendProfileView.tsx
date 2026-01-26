import React, { memo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import InfoList from '../components/InfoList';
import { phoneFormatter } from '../utils/dataUtils';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useGetUserQuery } from '../store/apiSlice';
import ErrorRetryView from './ErrorRetryView';
import { useTranslation } from 'react-i18next';

const FriendProfileView: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { friendID: string } }>>();
  const { friendID } = route.params;
  const { t } = useTranslation();

  const {
    data: friendData,
    isLoading,
    error,
    refetch,
  } = useGetUserQuery(friendID);

  if (isLoading || !friendData) {
    return <ActivityIndicator size="large" style={styles.loadingContainer} />;
  }

  if (error) {
    return (
      <ErrorRetryView
        errorMessage={`${t('errors.fetchFriends')} ${error}`}
        onRetry={refetch}
      />
    );
  }

  const userUsername = [
    {
      info: t('friendsProfileView.username'),
      data: friendData?.username || '',
    },
  ];

  const userBasicInfo = [
    {
      info: t('friendsProfileView.name'),
      data: `${friendData.firstName} ${friendData.lastName}`,
    },
    { info: t('friendsProfileView.email'), data: friendData.email },
  ];

  const userContactInfo = [
    {
      info: t('friendsProfileView.phone'),
      data: phoneFormatter(friendData.phone) || '',
    },
    { info: t('friendsProfileView.location'), data: friendData.UF || '' },
  ];

  const userFriendshipInfo = [
    {
      info: t('friendsProfileView.numberOfFriends'),
      data: friendData.friends.length.toString() || '0',
    },
  ];

  return (
    <View style={styles.container}>
      <InfoList items={userUsername} />
      <InfoList items={userBasicInfo} />
      <InfoList items={userContactInfo} />
      <InfoList items={userFriendshipInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 16,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#ffffffff',
  },
  buttonText: {
    color: '#ff0000ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default memo(FriendProfileView);

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>BitProgress</Text>
      <Text style={styles.subtitle}>Aprende redes paso a paso</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});